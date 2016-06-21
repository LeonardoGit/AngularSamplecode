'use strict';

/**
 * controller for Client Create Grab
 */
angular.module('grabApp').controller('CreateGrabCtrl', ['$scope', '$state', '$http', '$q', '$auth', 'uiGmapGoogleMapApi', 'GrabData', 'HumanizeTime', 'Upload', '$timeout',
    function ($scope, $state, $http, $q, $auth, GoogleMapApi, GrabData, HumanizeTime, Upload, $timeout) {
        $scope.$emit('GrabSetStep', 1);

        $scope.GrabData = GrabData;
        $scope.AddressSameAsProfile = true;
        $scope.imageFile = null;

        $scope.Grab = {
            type: '',
            grabtype: '',
            category: '',
            subCategory: '',
            title: '',
            description: '',
            size: '',
            weight: '',
            condition: '',
            addressID: '',
            placement: '',
            container: 0,
            floor: '',
            elevator: 0,
            bins: '',
            status: 'draft'
        };

        switch ($state.current.name) {
            case 'app.grab.create_grab':
                _.assign($scope.Grab, {
                    type: GrabData.grab.types[0].value,
                    grabtype: GrabData.grab.grabtypes[0].value,
                    placement: 'inside',
                    size: 'small',
                    weight: 'light',
                    condition: 'reusable'
                });
                break;
            case 'app.grab.create_container':
                _.assign($scope.Grab, {
                    type: GrabData.grab.types[1].value,
                    placement: 'driveway'
                });
                break;
            case 'app.grab.create_pickup':
                _.assign($scope.Grab, {
                    type: GrabData.grab.types[2].value,
                    grabtype: 'garbage',
                    bins: '1'
                });
                break;
        }

        $scope.GrabCategoriesAll = [];
        $scope.GrabCategories = [];
        $scope.GrabSubCategories = [];

        getGrabCategories();
        function getGrabCategories() {
            return $http.get('/api/v1/grab-category').then(function (response) {
                $scope.GrabCategoriesAll = _.map(response.data.data.grabCategory, function (grabCategory) {
                    grabCategory.value = grabCategory.name;
                    return grabCategory;
                });

                $scope.GrabCategories = _.filter($scope.GrabCategoriesAll, function (grabCategory) {
                    return grabCategory.sub_category == 0;
                });

                if ($state.current.name == 'app.grab.create_container') {
                    _.assign($scope.Grab, {
                        category: _.find($scope.GrabCategories, function (grabCategory) {
                            return grabCategory.name == 'Materials';
                        })
                    });
                }
            });
        }

        $scope.$watch('Grab.category', function (newValue, oldValue) {
            if (_.isEqual(newValue, oldValue)) {
                return;
            }

            if (newValue) {
                $scope.Grab.subCategory = '';

                $scope.GrabSubCategories = _.filter($scope.GrabCategoriesAll, function (grabCategory) {
                    return grabCategory.parentID == newValue.ID;
                });
            }
        });

        $scope.UserAddresses = [];
        getUserAddresses();
        function getUserAddresses() {
            $http.get('/api/v1/addresses/view').then(function (response) {
                $scope.UserAddresses = _.map(response.data.data.address, function (address) {
                    address.value = address.ID;
                    return address;
                });
            });
        }

        $scope.newUserAddressSubmitting = false;
        $scope.submitNewUserAddressForm = function ($event) {
            $scope.newUserAddressSubmitting = true;
            if ($scope.createGrabForm.newUserAddressForm.$invalid) {
                $event.preventDefault();
                angular.forEach($scope.createGrabForm.newUserAddressForm.$error.required, function (field) {
                    field.$setDirty();
                });
                $scope.newUserAddressSubmitting = false;
                return;
            }

            $http.post('/api/v1/addresses/create', $scope.NewUserAddress).then(function (response) {
                var UserAddress = response.data.data.address;
                UserAddress.value = UserAddress.ID;
                $scope.UserAddresses.push(UserAddress);
                $scope.Grab.addressID = UserAddress;

                setDefaultNewAddress();
                $scope.createGrabForm.newUserAddressForm.$setPristine();
                $scope.newUserAddressSubmitting = false;
            });
        };

        function setDefaultNewAddress() {
            $scope.NewUserAddress = {
                name: '',
                address: '',
                zipcode: '',
                city: '',
                region: '',
                country: '',
                latitude: null,
                longitude: null
            };
            _.assign($scope, {
                map: {
                    center: {
                        latitude: 45.248289, //Ottawa, ON, Canada
                        longitude: -76.0804408
                    },
                    zoom: 8,
                    control: {},
                    options: {
                        draggable: false,
                        scrollwheel: false
                    }
                },
                marker: {
                    id: 0,
                    coords: {
                        latitude: null,
                        longitude: null
                    }
                },
                searchBox: {
                    template: 'searchbox.tpl.html',
                    events: {
                        place_changed: function (autocomplete) {
                            var place = autocomplete.getPlace();

                            // If the place has a geometry location, then present it on a map.
                            if (place.geometry && place.geometry.location) {
                                var location = place.geometry.location;
                                var geolocation = {
                                    latitude: location.lat(),
                                    longitude: location.lng()
                                };

                                _.assign($scope.marker.coords, geolocation);
                                _.assign($scope.NewUserAddress, geolocation);

                                // $scope.map.control.getGMap().setZoom(17);
                                _.assign($scope.map, {zoom: 17});
                                $scope.map.control.refresh(geolocation);
                            }

                            // Get each component of the address from the place details
                            // and fill the corresponding field on the form.
                            if (place.address_components) {
                                for (var i = 0; i < place.address_components.length; i++) {
                                    var addressType = place.address_components[i].types[0];
                                    if (addressComponentTypes[addressType]) {
                                        var val = place.address_components[i][addressComponentTypes[addressType]];
                                        addressComponentValues[addressType] = val;
                                    }
                                }

                                _.assign($scope.NewUserAddress, {
                                    address: [addressComponentValues.street_number, addressComponentValues.route].join(' '),
                                    zipcode: addressComponentValues.postal_code,
                                    city: addressComponentValues.locality,
                                    region: addressComponentValues.administrative_area_level_1,
                                    country: addressComponentValues.country
                                });
                            }
                        }
                    },
                    options: {
                        autocomplete: true,
                        types: ['address'],
                        componentRestrictions: {country: ['ca']}
                    }
                }
            });
        }

        $scope.$watch('AddressSameAsProfile', function (newValue, oldValue) {
            if (_.isUndefined(oldValue)) return;
            if (!newValue) {
                setDefaultNewAddress();
            }
        });

        var addressComponentValues = {};

        var addressComponentTypes = {
            street_number: 'short_name',
            route: 'long_name',
            locality: 'long_name',
            administrative_area_level_1: 'short_name',
            country: 'long_name',
            postal_code: 'short_name'
        };

        GoogleMapApi.then(function (maps) {
            maps.visualRefresh = true;
        });

        function getRightAwaySchedule() {
            var now = moment();
            return [{date: now.toDate(), time: HumanizeTime(now)}];
        }

        $scope.rightAway = true;
        $scope.$watch('rightAway', function (newValue) {
            $scope.GrabSchedules = newValue ? getRightAwaySchedule() : [];
        });

        var grabScheduleTemplate = {date: moment().toDate(), time: 'morning'};
        $scope.NewGrabSchedule = angular.copy(grabScheduleTemplate);

        $scope.addGrabSchedule = function () {
            $scope.GrabSchedules.push($scope.NewGrabSchedule);
            $scope.NewGrabSchedule = angular.copy(grabScheduleTemplate);
        };

        $scope.deleteGrabSchedule = function (GrabSchedule) {
            _.remove($scope.GrabSchedules, function (el) {
                return el === GrabSchedule;
            });
        };

        $scope.setGrabtype = function (grabtype) {
            $scope.Grab.grabtype = grabtype;
        };

        $scope.uploadImageFile = function (file, grabID) {
            file.upload = Upload.upload({
                url: '/api/v1/media/create',
                headers: $auth.retrieveData('auth_headers'),
                data: {grabID: grabID, image: file}
            });

            return file.upload.then(function (response) {
                $timeout(function () {
                    file.result = response.data;
                });
            }, function (response) {
                if (response.status > 0)
                    $scope.imageUploadError = response.status + ': ' + response.data;
            }, function (evt) {
                file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
            });
        };

        $scope.publishGrub = function () {
            $scope.Grab.status = 'published';
        };

        $scope.grabSubmitting = false;
        $scope.submitCreateGrabForm = function ($event) {
            $scope.grabSubmitting = true;

            if ($scope.createGrabForm.$invalid) {
                $event.preventDefault();
                angular.forEach($scope.createGrabForm.$error.required, function (field) {
                    field.$setDirty();
                });
                $scope.grabSubmitting = false;
                $scope.Grab.status = 'draft';
                return;
            }

            _.assign($scope.Grab, {
                category: $scope.Grab.category.value,
                subCategory: $scope.Grab.subCategory.value,
                addressID: $scope.Grab.addressID.ID
            });

            if (_.isObject($scope.Grab.size)) {
                _.assign($scope.Grab, {
                    size: $scope.Grab.size.value
                });
            }

            return $http.post('/api/v1/grabs/create', $scope.Grab).then(function (response) {
                var Grab = response.data.data.grab;
                var grabSchedulesPromises = _.map($scope.GrabSchedules, function (grabSchedule) {
                    return $http.post('/api/v1/schedules/create', _.assign(grabSchedule, {
                        type: 'grab',
                        parentID: Grab.ID,
                        date: moment(grabSchedule.date).format('YYYY-MM-DD')
                    }));
                });
                var uploadImageFilePromise = $scope.imageFile ? $scope.uploadImageFile($scope.imageFile, Grab.ID) : $q.resolve();
                grabSchedulesPromises.push(uploadImageFilePromise);
                return $q.all(grabSchedulesPromises).then(function () {
                    $state.go('app.grab.published', {grabId: Grab.ID});
                })
            }).catch(function (error) {

            });
        };

        $scope.cancelCreateGrab = function () {
            $state.go('app.grabee.dashboard');
        };
    }]);
