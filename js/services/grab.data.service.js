'use strict';

/**
 * service for GrabData
 */
angular.module('grabApp').factory('GrabData', function () {
    return {
        categories: [
            {
                value: "all",
                label_fr: "Type de matières",
                label_en: "Type of waste"
            }, {
                value: "appareils-menagers-et-encombrants",
                label_fr: "Appareils ménagers et encombrants",
                label_en: "Appliances and electronics"
            }, {
                value: "materiaux-de-construction-renovation-et-demolition",
                label_fr: "Matériaux de construction, rénovation et démolition",
                label_en: "Construction, renovation and demolition materials"
            }, {
                value: "matieres-organiques",
                label_fr: "Matières organiques",
                label_en: "Yard waste and organic"
            }, {
                value: "metaux",
                label_fr: "Métaux",
                label_en: "Metals"
            }, {
                value: "papier-et-carton",
                label_fr: "Papier et carton",
                label_en: "Paper, cardboard"
            }, {
                value: "plastiques",
                label_fr: "Plastiques",
                label_en: "Plastics"
            }, {
                value: "residus-domestiques-dangereux",
                label_fr: "Résidus domestiques dangereux",
                label_en: "Domestic and hazardous waste"
            }, {
                value: "textiles",
                label_fr: "Textiles",
                label_en: "Clothing and textiles"
            }, {
                value: "vehicules",
                label_fr: "Véhicules",
                label_en: "Vehicles and tires"
            }, {
                value: "verre",
                label_fr: "Verre",
                label_en: "Glass"
            }
        ],
        subCategories: [
            // appareils-menagers-et-encombrants
            {
                parent: "appareils-menagers-et-encombrants",
                value: "appareils-electriques",
                label_fr: "Appareils électriques",
                label_en: "empty"
            }, {
                parent: "appareils-menagers-et-encombrants",
                value: "electromenagers",
                label_fr: "Électroménagers",
                label_en: "empty"
            }, {
                parent: "appareils-menagers-et-encombrants",
                value: "matelas",
                label_fr: "Matelas",
                label_en: "empty"
            }, {
                parent: "appareils-menagers-et-encombrants",
                value: "meubles",
                label_fr: "Meubles ",
                label_en: "empty"
            }, {
                parent: "appareils-menagers-et-encombrants",
                value: "petits-moteurs-et-autres-objets-motorises",
                label_fr: "Petits moteurs et autres objets motorisés",
                label_en: "empty"
            },

            // materiaux-de-construction-renovation-et-demolition
            {
                parent: "materiaux-de-construction-renovation-et-demolition",
                value: "asphalte",
                label_fr: "Asphalte",
                label_en: "empty"
            }, {
                parent: "materiaux-de-construction-renovation-et-demolition",
                value: "autres-residus-crd-fibre-de-verre-baignoire-etc",
                label_fr: "Autres résidus CRD (fibre de verre, baignoire, etc.)",
                label_en: "empty"
            }, {
                parent: "materiaux-de-construction-renovation-et-demolition",
                value: "beton",
                label_fr: "Béton",
                label_en: "empty"
            }, {
                parent: "materiaux-de-construction-renovation-et-demolition",
                value: "bois",
                label_fr: "Bois",
                label_en: "empty"
            }, {
                parent: "materiaux-de-construction-renovation-et-demolition",
                value: "bois-traite",
                label_fr: "Bois traité",
                label_en: "empty"
            }, {
                parent: "materiaux-de-construction-renovation-et-demolition",
                value: "brique-et-pierre",
                label_fr: "Brique et pierre",
                label_en: "empty"
            }, {
                parent: "materiaux-de-construction-renovation-et-demolition",
                value: "deblais-d-excavation-sable-terre-gravier-et-tourbe",
                label_fr: "Déblais d’excavation (sable, terre, gravier et tourbe)",
                label_en: "empty"
            }, {
                parent: "materiaux-de-construction-renovation-et-demolition",
                value: "gypse",
                label_fr: "Gypse",
                label_en: "empty"
            }, {
                parent: "materiaux-de-construction-renovation-et-demolition",
                value: "palettes-de-bois",
                label_fr: "Palettes de bois",
                label_en: "empty"
            }, {
                parent: "materiaux-de-construction-renovation-et-demolition",
                value: "sciures-et-copeaux-de-bois",
                label_fr: "Sciures et copeaux de bois",
                label_en: "empty"
            },

            // matieres-organiques
            {
                parent: "matieres-organiques",
                value: "autres-residus-residentiels",
                label_fr: "Autres résidus résidentiels",
                label_en: "empty"
            }, {
                parent: "matieres-organiques",
                value: "boues-municipales-stations-depuration-et-fosses-septiques",
                label_fr: "Boues municipales (stations d'épuration et fosses septiques)",
                label_en: "empty"
            }, {
                parent: "matieres-organiques",
                value: "residus-agricoles-incluant-fumiers",
                label_fr: "Résidus agricoles (incluant fumiers)",
                label_en: "empty"
            }, {
                parent: "matieres-organiques",
                value: "residus-agroalimentaires",
                label_fr: "Résidus agroalimentaires",
                label_en: "empty"
            }, {
                parent: "matieres-organiques",
                value: "residus-alimentaires-municipaux-3e-voie-bac-brun",
                label_fr: "Résidus alimentaires municipaux (3e voie/bac brun)",
                label_en: "empty"
            }, {
                parent: "matieres-organiques",
                value: "residus-de-bois",
                label_fr: "Résidus de bois",
                label_en: "empty"
            }, {
                parent: "matieres-organiques",
                value: "residus-marins",
                label_fr: "Résidus marins",
                label_en: "empty"
            }, {
                parent: "matieres-organiques",
                value: "residus-verts-et-alimentaires-des-commerces-et-institutions",
                label_fr: "Résidus verts et alimentaires des commerces et institutions",
                label_en: "empty"
            }, {
                parent: "matieres-organiques",
                value: "residus-verts-herbe-feuilles-residus-de-jardins",
                label_fr: "Résidus verts (herbe, feuilles, résidus de jardins)",
                label_en: "empty"
            }, {
                parent: "matieres-organiques",
                value: "sapins",
                label_fr: "Sapins",
                label_en: "empty"
            },

            // metaux
            {
                parent: "metaux",
                value: "ferreux",
                label_fr: "Ferreux",
                label_en: "empty"
            }, {
                parent: "metaux",
                value: "non-ferreux",
                label_fr: "Non ferreux",
                label_en: "empty"
            },

            // papier-et-carton
            {
                parent: "papier-et-carton",
                value: "carton-plat-ou-ondule",
                label_fr: "Carton (plat ou ondulé)",
                label_en: "empty"
            }, {
                parent: "papier-et-carton",
                value: "contenants-de-lait-et-de-jus",
                label_fr: "Contenants de lait et de jus",
                label_en: "empty"
            }, {
                parent: "papier-et-carton",
                value: "documents-confidentiels-pour-dechiquetage",
                label_fr: "Documents confidentiels (pour déchiquetage)",
                label_en: "empty"
            }, {
                parent: "papier-et-carton",
                value: "livres",
                label_fr: "Livres",
                label_en: "empty"
            }, {
                parent: "papier-et-carton",
                value: "papier-de-bureau-ou-journal",
                label_fr: "Papier (de bureau ou journal)",
                label_en: "empty"
            },

            // plastiques
            {
                parent: "plastiques",
                value: "autres-plastiques-ex-tuyau-pvc-chaudiere",
                label_fr: "Autres plastiques (ex.: tuyau PVC, chaudière) ",
                label_en: "empty"
            }, {
                parent: "plastiques",
                value: "contenants-et-emballages-de-plastique-1-2-3-4-5-7",
                label_fr: "Contenants et emballages de plastique (# 1-2-3-4-5-7)",
                label_en: "empty"
            }, {
                parent: "plastiques",
                value: "plastiques-agricoles",
                label_fr: "Plastiques agricoles",
                label_en: "empty"
            }, {
                parent: "plastiques",
                value: "polystyrene-6",
                label_fr: "Polystyrène (#6)",
                label_en: "empty"
            }, {
                parent: "plastiques",
                value: "sacs-et-pellicules-de-plastiques",
                label_fr: "Sacs et pellicules de plastiques",
                label_en: "empty"
            },

            // residus-domestiques-dangereux
            {
                parent: "residus-domestiques-dangereux",
                value: "autres-rdd-aerosols-bonbonnes-de-propane-etc",
                label_fr: "Autres RDD (aérosols, bonbonnes de propane etc.)",
                label_en: "empty"
            }, {
                parent: "residus-domestiques-dangereux",
                value: "huiles-antigels-et-liquides-de-refroidissement",
                label_fr: "Huiles, antigels et liquides de refroidissement",
                label_en: "empty"
            }, {
                parent: "residus-domestiques-dangereux",
                value: "lampes-au-mercure",
                label_fr: "Lampes au mercure",
                label_en: "empty"
            }, {
                parent: "residus-domestiques-dangereux",
                value: "peinture",
                label_fr: "Peinture",
                label_en: "empty"
            }, {
                parent: "residus-domestiques-dangereux",
                value: "piles",
                label_fr: "Piles ",
                label_en: "empty"
            }, {
                parent: "residus-domestiques-dangereux",
                value: "produits-electroniques",
                label_fr: "Produits électroniques",
                label_en: "empty"
            },

            // textiles
            {
                parent: "textiles",
                value: "accessoires-cuir-et-fourrure-ex-chaussures",
                label_fr: "Accessoires, cuir et fourrure (ex.: chaussures)",
                label_en: "empty"
            }, {
                parent: "textiles",
                value: "articles-de-textile-draps-couvertures-etc",
                label_fr: "Articles de textile (draps, couvertures, etc.)",
                label_en: "empty"
            }, {
                parent: "textiles",
                value: "vetements",
                label_fr: "Vêtements",
                label_en: "empty"
            },

            // vehicules
            {
                parent: "vehicules",
                value: "carcasses-dautomobiles",
                label_fr: "Carcasses d'automobiles",
                label_en: "empty"
            }, {
                parent: "vehicules",
                value: "pneus",
                label_fr: "Pneus",
                label_en: "empty"
            },

            // verre
            {
                parent: "verre",
                value: "contenants-de-verre",
                label_fr: "Contenants de verre",
                label_en: "empty"
            }, {
                parent: "verre",
                value: "verre-plat-ex-miroir-fenetre",
                label_fr: "Verre plat (ex.: miroir, fenêtre)",
                label_en: "empty"
            }
        ],
        grab: {
            types: [
                {
                    value: 'grab',
                    sref: 'app.grab.create_grab',
                    icon: 'fa-truck',
                    label_en: 'Grab',
                    label_fr: 'Grab'
                }, {
                    value: 'container',
                    sref: 'app.grab.create_container',
                    icon: 'fa-inbox',
                    label_en: 'Container',
                    label_fr: 'Conteneur'
                }, {
                    value: 'pickup',
                    sref: 'app.grab.create_pickup',
                    icon: 'fa-trash',
                    label_en: 'Missed Pickup',
                    label_fr: 'Collecte Manquée'
                }
            ],
            grabtypes: [
                {
                    value: 'oversized',
                    label_en: 'Oversized',
                    label_fr: 'Grand format'
                }, {
                    value: 'construction',
                    label_en: 'Construction',
                    label_fr: 'Construction'
                }, {
                    value: 'special',
                    label_en: 'Special',
                    label_fr: 'Spécial'
                }
            ],
            dropoffs: [
                {
                    value: 'landfill',
                    label_en: 'Landfill',
                    label_fr: 'Lieu d’enfouissement'
                }, {
                    value: 'sorting',
                    label_en: 'Sorting center',
                    label_fr: 'Centre de tri'
                }, {
                    value: 'recycler',
                    label_en: 'Recycler',
                    label_fr: 'Recycleur'
                }, {
                    value: 'reseller',
                    label_en: 'Reseller',
                    label_fr: 'Revendeur'
                }, {
                    value: 'recycledepot',
                    label_en: 'Recycling depot',
                    label_fr: 'Écocentre'
                }, {
                    value: 'reusedepot',
                    label_en: 'Re-use depot',
                    label_fr: 'Ressourcerie'
                }
            ]
        },
        floors: [
            {
                label: 'basement',
                value: 'basement'
            }, {
                label: 'floor_side',
                value: '1'
            }, {
                label: 'floor_main',
                value: '1'
            }, {
                label: 'floor 1',
                value: '1'
            }, {
                label: 'floor 2',
                value: '2'
            }, {
                label: 'floor 3',
                value: '3'
            }, {
                label: 'floor 4',
                value: '4'
            }, {
                label: 'floor 5',
                value: '5'
            }, {
                label: 'floor 6',
                value: '6'
            }
        ],
        sizes: [
            {
                label: '10 verges (8 large X 10 long X 4 height)',
                value: '10'
            }
        ],
        serviceareas: ['Westmount', 'Ville-Marie', 'Notre Dame De Grace', 'Mount Royal', 'Outremont'],
        chart: {
            data1: {
                labels: ['Jan 1', 'Jan 2', 'Jan 3', 'Jan 4', 'Jan 5', 'Jan 6', 'Jan 7', 'Jan 8', 'Jan 9', 'Jan 10', 'Jan 11', 'Jan 12'],
                datasets: [
                    {
                        label: 'Number of Bids',
                        fillColor: 'rgba(220,220,220,0.2)',
                        strokeColor: 'rgba(220,220,220,1)',
                        pointColor: 'rgba(220,220,220,1)',
                        pointStrokeColor: '#fff',
                        pointHighlightFill: '#fff',
                        pointHighlightStroke: 'rgba(220,220,220,1)',
                        data: [6, 5, 8, 8, 14, 7, 9, 8, 6, 12, 13, 16]
                    },
                    {
                        label: 'Number of GRABS',
                        fillColor: 'rgba(151,187,205,0.2)',
                        strokeColor: 'rgba(151,187,205,1)',
                        pointColor: 'rgba(151,187,205,1)',
                        pointStrokeColor: '#fff',
                        pointHighlightFill: '#fff',
                        pointHighlightStroke: 'rgba(151,187,205,1)',
                        data: [2, 4, 4, 1, 8, 2, 6, 6, 2, 8, 6, 6]
                    }
                ]
            },
            data2: {
                labels: ['Jan 1', 'Jan 2', 'Jan 3', 'Jan 4', 'Jan 5', 'Jan 6', 'Jan 7', 'Jan 8', 'Jan 9', 'Jan 10', 'Jan 11', 'Jan 12'],
                datasets: [
                    {
                        label: 'Number of $ earned',
                        fillColor: 'rgba(151,187,205,0.2)',
                        strokeColor: 'rgba(151,187,205,1)',
                        pointColor: 'rgba(151,187,205,1)',
                        pointStrokeColor: '#fff',
                        pointHighlightFill: '#fff',
                        pointHighlightStroke: 'rgba(151,187,205,1)',
                        data: [65, 58, 88, 81, 147, 79, 98, 86, 61, 121, 131, 161]
                    }
                ]
            },
            options: {
                maintainAspectRatio: false,

                // Sets the chart to be responsive
                responsive: true,

                ///Boolean - Whether grid lines are shown across the chart
                scaleShowGridLines: true,

                //String - Colour of the grid lines
                scaleGridLineColor: 'rgba(0,0,0,.05)',

                //Number - Width of the grid lines
                scaleGridLineWidth: 1,

                //Boolean - Whether the line is curved between points
                bezierCurve: false,

                //Number - Tension of the bezier curve between points
                bezierCurveTension: 0.4,

                //Boolean - Whether to show a dot for each point
                pointDot: true,

                //Number - Radius of each point dot in pixels
                pointDotRadius: 4,

                //Number - Pixel width of point dot stroke
                pointDotStrokeWidth: 1,

                //Number - amount extra to add to the radius to cater for hit detection outside the drawn point
                pointHitDetectionRadius: 20,

                //Boolean - Whether to show a stroke for datasets
                datasetStroke: true,

                //Number - Pixel width of dataset stroke
                datasetStrokeWidth: 2,

                //Boolean - Whether to fill the dataset with a colour
                datasetFill: true,

                // Function - on animation progress
                onAnimationProgress: function () {
                },

                // Function - on animation complete
                onAnimationComplete: function () {
                },

                //String - A legend template
                legendTemplate: '<ul class="tc-chart-js-legend"><% for (var i=0; i<datasets.length; i++){%><li><span style="background-color:<%=datasets[i].strokeColor%>"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>'
            }
        }
    };
});
