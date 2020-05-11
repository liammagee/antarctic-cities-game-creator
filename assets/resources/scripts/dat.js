
// Version
const VERSION_ANTARCTIC_FUTURES = "Build: 1012";

// Game data
let gd = {};

// LANGUAGES
const LANGUAGES = ['eng', 'esp'];

// UI Constants
const FONT_FACE_TITLE = "ArvoFont";
const FONT_FACE_BODY = "JosefinSansFont";
const FONT_FACE_TITLE_SMALL = 20;
const FONT_FACE_TITLE_MEDIUM = 26;
const FONT_FACE_TITLE_BIG = 38;
const FONT_FACE_BODY_SMALL = 20;
const FONT_FACE_BODY_MEDIUM = 24;
const FONT_FACE_BODY_BIG = 30;
const FONT_FACE_BODY_VERY_BIG = 48;
const FONT_SPACING = 4;

const X_OFFSET = 0, Y_OFFSET = 55;
const RESOURCE_SIZE_W = 64; 
const RESOURCE_SIZE_H = 72; 
const TAG_SPRITE_BATCH_NODE = 1;
const FULLSCREEN = true;


// Timing Constants
const MONTH_INTERVAL = 15;
const MONTH_INTERVAL_FF = MONTH_INTERVAL / 3;
const RESOURCE_CHANCE = 0.1;
const CRISIS_CHANCE = 0.05;
const TUTORIAL_INTERVAL_MULTIPLIER = 6; 
const RESOURCE_INTERVAL_MULTIPLIER = 10; 
const CRISIS_INTERVAL_MULTIPLIER = 20; 
const RESOURCE_DURATION = 300;
const GAME_STATES = {
    INITIALISED: 0,
    PREPARED: 1,
    STARTED: 2,
    PAUSED: 3,
    PAUSED_TUTORIAL: 4,
    GAME_OVER: 5
};

// Colours
const COLOR_LICORICE = new cc.Color(42, 54, 68, 255); // Dark Grey
const COLOR_ZINC = new cc.Color(123, 133, 143, 255); // Medium Grey
const COLOR_ICE = new cc.Color(214, 225, 227, 255); // Light Grey
const COLOR_OAK = new cc.Color(243, 226, 206, 255); // Beige
const COLOR_UMBER = new cc.Color(154, 136, 124, 255); // Brown
const COLOR_BLACK = new cc.Color(0, 0, 0, 255); // Black
const COLOR_WHITE = new cc.Color(255, 255, 255, 255); // White


// ANTARCTIC CITIES THEME
const COLOR_BACKGROUND = COLOR_BLACK; 
const COLOR_FOREGROUND = COLOR_ICE; 
const COLOR_HIGHLIGHT = COLOR_OAK; 
const COLOR_RESOURCE = new cc.Color(108, 180, 244, 255); // Blue with transparency; COLOR_UMBER; 
const COLOR_POLICY_POINTS = new cc.Color(0, 255, 0, 100); // Green, with transparency
const COLOR_DESTRUCTION_POINTS = new cc.Color(255, 0, 0, 100); // Red, with transparency
const COLOR_DESTRUCTION_POINTS_HALF = new cc.Color(255, 0, 0, 100); // Red, with transparency
const COLOR_BACKGROUND_TRANS = new cc.Color(42, 54, 68, 200); // Black, with transparency

// DEFAULT LOSS CUTOFFs - Can be modified by narratives below
const LOSS_TOTAL = 80;
const LOSS_PARTIAL = 80;


// RESOURCES
const RESOURCES = {
    economic: {
        eng: {
            labelText: "Design your Economic Policy",
            name: "Economy"    
        },
        esp: {
            labelText: "Diseñe su pólitica económica",
            name: "Economía"    
        },
        policyOptions: [        
        {
            id: 1,
            domain: 1,
            eng: {
                text: "Free Trade Agreements", 
                text_long: "Free Trade Agreements", 
                description: "This policy may produce additional resources in lower-income countries."
            },
            esp: {
                text: "Acuerdos de libre comercio", 
                text_long: "Acuerdos de libre comercio", 
                description: "Esta política puede producir recursos adicionales en los países de bajos ingresos."
            },
            location: {x: 300, y: 500},
            img_normal: "res/images/niab/POLICY_ECONOMY_1_NORMAL.png",
            img_on: "res/images/niab/POLICY_ECONOMY_1_ON.png",
            levels: 3,
            effect_on_transmissability: 0,
            effect_on_infectivity: 0,
            effect_on_resources: 0.2,
            effect_on_crises: 0.5,
            effect_on_pop_high: 0,
            effect_on_pop_medium: -0.05,
            effect_on_pop_low: -0.1,
            effect_on_income_low: -0.2,
            effect_on_income_low_medium: -0.15,
            effect_on_income_medium_high: 0.05,
            effect_on_income_high: 0.1,
            effect_on_geo_tropic: 0,
            effect_on_geo_subtropic: 0,
            effect_on_geo_temperate: 0,
            effect_on_geo_polar: 0,
            effect_on_density: 0,
            effect_on_area_large: 0,
            effect_on_area_medium: 0,
            effect_on_area_small: 0,
            cost_1: 3,
            cost_2: 4,
            cost_3: 5
        },
        {
            id: 2, 
            domain: 1,
            eng: {
                text: "Automate Industry", 
                text_long: "Automate Industry", 
                description: "This policy reduces the carbon footprint of wealthy nations and it may produce additional resources in middle-income countries.",
            },
            esp: {
                text: "Automatizar la industria", 
                text_long: "Automatizar la industria", 
                description: "Esta política reduce la huella de carbono de las naciones ricas y puede producir recursos adicionales en los países de ingresos medios.",
            },
            location: {x: 600, y: 500},
            img_normal: "res/images/niab/POLICY_ECONOMY_2_NORMAL.png",
            img_on: "res/images/niab/POLICY_ECONOMY_2_ON.png",
            levels: 3,
            effect_on_transmissability: 0,
            effect_on_infectivity: 0,
            effect_on_resources: 0.4,
            effect_on_crises: 0.5,
            effect_on_pop_high: -0.1,
            effect_on_pop_medium: 0,
            effect_on_pop_low: 0.2,
            effect_on_income_low: 0,
            effect_on_income_low_medium: 0,
            effect_on_income_medium_high: 0.1,
            effect_on_income_high: 0.15,
            effect_on_geo_tropic: 0,
            effect_on_geo_subtropic: 0,
            effect_on_geo_temperate: 0,
            effect_on_geo_polar: 0,
            effect_on_density: 0,
            effect_on_area_large: 0,
            effect_on_area_medium: 0,
            effect_on_area_small: 0,
            cost_1: 3,
            cost_2: 4,
            cost_3: 5
        },
        {
            id: 3,
            domain: 1,
            eng: {
                text: "Reduce Inequality", 
                text_long: "Reduce Inequality", 
                description: "This policy may produce additional resources in lower-income countries."
            },
            esp: {
                text: "Reducir la desigualdad", 
                text_long: "Reducir la desigualdad", 
                description: "Esta política puede producir recursos adicionales en los países de bajos ingresos."
            },
            location: {x: 300, y: 200},
            img_normal: "res/images/niab/POLICY_ECONOMY_3_NORMAL.png",
            img_on: "res/images/niab/POLICY_ECONOMY_3_ON.png",
            levels: 3,
            effect_on_transmissability: 0,
            effect_on_infectivity: 0,
            effect_on_resources: 0.3,
            effect_on_crises: 0.0,
            effect_on_pop_high: 0.05,
            effect_on_pop_medium: 0,
            effect_on_pop_low: 0,
            effect_on_income_low: 0.15,
            effect_on_income_low_medium: 0.1,
            effect_on_income_medium_high: 0.05,
            effect_on_income_high: 0.01,
            effect_on_geo_tropic: 0,
            effect_on_geo_subtropic: 0,
            effect_on_geo_temperate: 0,
            effect_on_geo_polar: 0,
            effect_on_density: 0,
            effect_on_area_large: 0,
            effect_on_area_medium: 0,
            effect_on_area_small: 0,
            cost_1: 3,
            cost_2: 4,
            cost_3: 5
        },
        {
            id: 4,
            domain: 1,
            eng: {
                text: "Remove Regulations", 
                text_long: "Remove Regulations", 
                description: "This policy is highly effective in producing additional resources but may worsen carbon footprint globally."    
            },
            esp: {
                text: "Eliminar regulaciones", 
                text_long: "Eliminar regulaciones", 
                description: "Esta política es muy eficaz para producir recursos adicionales, pero puede empeorar la huella de carbono en todo el mundo."    
            },
            location: {x: 600, y: 200},
            img_normal: "res/images/niab/POLICY_ECONOMY_4_NORMAL.png",
            img_on: "res/images/niab/POLICY_ECONOMY_4_ON.png",
            levels: 3,
            effect_on_transmissability: 0,
            effect_on_infectivity: 0,
            effect_on_resources: 0.2,
            effect_on_crises: 1.0,
            effect_on_pop_high: -0.1,
            effect_on_pop_medium: -0.1,
            effect_on_pop_low: -0.05,
            effect_on_income_low: -0.3,
            effect_on_income_low_medium: -0.15,
            effect_on_income_medium_high: -0.05,
            effect_on_income_high: 0,
            effect_on_geo_tropic: 0,
            effect_on_geo_subtropic: 0,
            effect_on_geo_temperate: 0,
            effect_on_geo_polar: 0,
            effect_on_density: 0,
            effect_on_area_large: 0,
            effect_on_area_medium: 0,
            effect_on_area_small: 0,
            cost_1: 3,
            cost_2: 4,
            cost_3: 5
        } ]
    },
    politics: {        
        eng: {
            labelText: "Design your Political Policy",
            name: "Politics"
        },
        esp: {
            labelText: "Diseñe su pólitica política",
            name: "Política"
        },
        policyOptions: [ 
        {
            id: 5,
            domain: 2,
            eng: {
                text: "Diplomacy", 
                text_long: "Diplomacy", 
                description: "This policy may allow the renegotiations of climate accords with better targets and stricter conditions."
            },
            esp: {
                text: "Diplomacia", 
                text_long: "Diplomacia", 
                description: "Esta política puede permitir la renegociación de acuerdos climáticos con mejores objetivos y condiciones más estrictas."
            },
            location: {x: 300, y: 500},
            img_normal: "res/images/niab/POLICY_POLITCS_1_NORMAL.png",
            img_on: "res/images/niab/POLICY_POLITCS_1_ON.png",
            levels: 3,
            effect_on_transmissability: 0,
            effect_on_infectivity: 0,
            effect_on_resources: 0,
            effect_on_crises: -0.5,
            effect_on_pop_high: 0,
            effect_on_pop_medium: 0,
            effect_on_pop_low: 0,
            effect_on_income_low: 0,
            effect_on_income_low_medium: 0,
            effect_on_income_medium_high: 0.1,
            effect_on_income_high: 0.1,
            effect_on_geo_tropic: 0,
            effect_on_geo_subtropic: 0,
            effect_on_geo_temperate: 0,
            effect_on_geo_polar: 0,
            effect_on_density: 0,
            effect_on_area_large: 0,
            effect_on_area_medium: 0,
            effect_on_area_small: 0,
            cost_1: 3,
            cost_2: 4,
            cost_3: 5
        },
        {
            id: 6,
            domain: 2,
            eng: {
                text: "Promote Democracy", 
                text_long: "Promote Democracy", 
                description: "Democratic institutions may improve the effectiveness of cultural policies."
            },
            esp: {
                text: "Promover la democracia", 
                text_long: "Promover la democracia", 
                description: "Las instituciones democráticas pueden mejorar la eficacia de las políticas culturales."
            },
            location: {x: 600, y: 500},
            img_normal: "res/images/niab/POLICY_POLITCS_2_NORMAL.png",
            img_on: "res/images/niab/POLICY_POLITCS_2_ON.png",
            levels: 3,
            effect_on_transmissability: 0,
            effect_on_infectivity: 0,
            effect_on_resources: 0,
            effect_on_crises: 0,
            effect_on_pop_high: 0.05,
            effect_on_pop_medium: 0.05,
            effect_on_pop_low: 0,
            effect_on_income_low: 0,
            effect_on_income_low_medium: 0.05,
            effect_on_income_medium_high: 0,
            effect_on_income_high: 0,
            effect_on_geo_tropic: 0,
            effect_on_geo_subtropic: 0,
            effect_on_geo_temperate: 0,
            effect_on_geo_polar: 0,
            effect_on_density: 0,
            effect_on_area_large: 0,
            effect_on_area_medium: 0,
            effect_on_area_small: 0,
            cost_1: 3,
            cost_2: 4,
            cost_3: 5
        },
        {
            id: 7,
            domain: 2,
            eng: {
                text: "Global Treaties", 
                text_long: "Global Treaties", 
                description: "This policy allows the creation of global alliances in the reduction of greenhouse emissions."
            },
            esp: {
                text: "Tratados Globales", 
                text_long: "Tratados Globales", 
                description: "Esta política permite la creación de alianzas globales en la reducción de emisiones de gases de efecto invernadero."
            },
            location: {x: 300, y: 200},
            img_normal: "res/images/niab/POLICY_POLITCS_3_NORMAL.png",
            img_on: "res/images/niab/POLICY_POLITCS_3_ON.png",
            levels: 3,
            effect_on_transmissability: 0,
            effect_on_infectivity: 0,
            effect_on_resources: 0,
            effect_on_crises: 0,
            effect_on_pop_high: 0.05,
            effect_on_pop_medium: 0.05,
            effect_on_pop_low: 0,
            effect_on_income_low: 0,
            effect_on_income_low_medium: 0,
            effect_on_income_medium_high: 0,
            effect_on_income_high: 0.05,
            effect_on_geo_tropic: 0,
            effect_on_geo_subtropic: 0,
            effect_on_geo_temperate: 0,
            effect_on_geo_polar: 0,
            effect_on_density: 0,
            effect_on_area_large: 0,
            effect_on_area_medium: 0,
            effect_on_area_small: 0,
            cost_1: 3,
            cost_2: 4,
            cost_3: 5
        },
        {
            id: 8,
            domain: 2,
            eng: {
                text: "Boost Military", 
                text_long: "Boost Military", 
                description: "This policy may produce additional resources and improve the effectiveness of top-down ecological transitions."
            },
            esp: {
                text: "Impulso Militar", 
                text_long: "Impulso Militar", 
                description: "Esta política puede producir recursos adicionales y mejorar la eficacia de las transiciones ecológicas de arriba hacia abajo."
            },
            location: {x: 600, y: 200},
            img_normal: "res/images/niab/POLICY_POLITCS_4_NORMAL.png",
            img_on: "res/images/niab/POLICY_POLITCS_4_ON.png",
            levels: 3,
            effect_on_transmissability: 0,
            effect_on_infectivity: 0,
            effect_on_resources: 0.1,
            effect_on_crises: 1.0,
            effect_on_pop_high: -0.05,
            effect_on_pop_medium: 0,
            effect_on_pop_low: 0,
            effect_on_income_low: -0.2,
            effect_on_income_low_medium: -0.05,
            effect_on_income_medium_high: 0,
            effect_on_income_high: -0.1,
            effect_on_geo_tropic: 0,
            effect_on_geo_subtropic: 0,
            effect_on_geo_temperate: 0,
            effect_on_geo_polar: 0,
            effect_on_density: 0,
            effect_on_area_large: 0,
            effect_on_area_medium: 0,
            effect_on_area_small: 0,
            cost_1: 3,
            cost_2: 4,
            cost_3: 5
        } ]
    },
    cultural: {
        eng: {
            labelText: "Design your Cultural Policy",
            name: "Culture"
        },
        esp: {
            labelText: "Diseñe su pólitica cultural",
            name: "Cultura"
        },
        policyOptions: [ 
        {
            id: 9,
            domain: 3,
            eng: {
                text: "Social Media", 
                text_long: "Social Media", 
                description: "Through social media, some ecological and political strategies may increase their effectiveness."
            },
            esp: {
                text: "Medios de comunicación social", 
                text_long: "Medios de comunicación social", 
                description: "A través de los medios sociales, algunas estrategias ecológicas y políticas pueden aumentar su eficacia."
            },
            location: {x: 300, y: 500},
            img_normal: "res/images/niab/POLICY_CULTURE_1_NORMAL.png",
            img_on: "res/images/niab/POLICY_CULTURE_1_ON.png",
            levels: 3,
            effect_on_transmissability: 0,
            effect_on_infectivity: 0,
            effect_on_resources: 0.1,
            effect_on_crises: 0,
            effect_on_pop_high: 0.05,
            effect_on_pop_medium: 0,
            effect_on_pop_low: 0,
            effect_on_income_low: -0.15,
            effect_on_income_low_medium: -0.1,
            effect_on_income_medium_high: 0.1,
            effect_on_income_high: 0.1,
            effect_on_geo_tropic: 0,
            effect_on_geo_subtropic: 0,
            effect_on_geo_temperate: 0,
            effect_on_geo_polar: 0,
            effect_on_density: 0,
            effect_on_area_large: 0,
            effect_on_area_medium: 0,
            effect_on_area_small: 0,
            cost_1: 3,
            cost_2: 4,
            cost_3: 5
        },
        {
            id: 10,
            domain: 3,
            eng: {
                text: "Global Festivals", 
                text_long: "Global Festivals", 
                description: "Global festivals generate consensus and may add resources to spend on other cultural strategies."
            },
            esp: {
                text: "Festivales Globales", 
                text_long: "Festivales Globales", 
                description: "Los festivales globales generan consenso y pueden añadir recursos para gastar en otras estrategias culturales."
            },
            location: {x: 600, y: 500},
            img_normal: "res/images/niab/POLICY_CULTURE_2_NORMAL.png",
            img_on: "res/images/niab/POLICY_CULTURE_2_ON.png",
            levels: 3,
            effect_on_transmissability: 0,
            effect_on_infectivity: 0,
            effect_on_resources: 0.2,
            effect_on_crises: 0,
            effect_on_pop_high: 0.1,
            effect_on_pop_medium: 0.05,
            effect_on_pop_low: 0,
            effect_on_income_low: -0.1,
            effect_on_income_low_medium: 0,
            effect_on_income_medium_high: 0,
            effect_on_income_high: 0.1,
            effect_on_geo_tropic: 0,
            effect_on_geo_subtropic: 0,
            effect_on_geo_temperate: 0,
            effect_on_geo_polar: 0,
            effect_on_density: 0,
            effect_on_area_large: 0,
            effect_on_area_medium: 0,
            effect_on_area_small: 0,
            cost_1: 3,
            cost_2: 4,
            cost_3: 5
        },
        {
            id: 11,
            domain: 3,
            eng: {
                text: "Global Education", 
                text_long: "Global Education", 
                description: "Education strategies may improve climate change awareness as well as resource production in lower and middle-income countries."
            },
            esp: {
                text: "Educación Global", 
                text_long: "Educación Global", 
                description: "Las estrategias de educación pueden mejorar la concienciación sobre el cambio climático, así como la producción de recursos en los países de ingresos bajos y medios."
            },
            location: {x: 300, y: 200},
            img_normal: "res/images/niab/POLICY_CULTURE_3_NORMAL.png",
            img_on: "res/images/niab/POLICY_CULTURE_3_ON.png",
            levels: 3,
            effect_on_transmissability: 0,
            effect_on_infectivity: 0,
            effect_on_resources: 0.1,
            effect_on_crises: -0.05,
            effect_on_pop_high: 0.05,
            effect_on_pop_medium: 0,
            effect_on_pop_low: 0,
            effect_on_income_low: 0.05,
            effect_on_income_low_medium: 0.05,
            effect_on_income_medium_high: 0.05,
            effect_on_income_high: 0,
            effect_on_geo_tropic: 0,
            effect_on_geo_subtropic: 0,
            effect_on_geo_temperate: 0,
            effect_on_geo_polar: 0,
            effect_on_density: 0,
            effect_on_area_large: 0,
            effect_on_area_medium: 0,
            effect_on_area_small: 0,
            cost_1: 3,
            cost_2: 4,
            cost_3: 5
        },
        {
            id: 12,
            domain: 3,
            eng: {
                text: "Celebrity Endorsements", 
                text_long: "Celebrity Endorsements", 
                description: "This policy uses film and music stars to raise awareness. Combined with ecological strategies, it may improve their effectiveness."
            },
            esp: {
                text: "Apoyos de celebridades", 
                text_long: "Apoyos de celebridades", 
                description: "Esta política utiliza estrellas de cine y de música para sensibilizar a la opinión pública. Combinado con estrategias ecológicas, puede mejorar su eficacia."
            },
            location: {x: 600, y: 200},
            img_normal: "res/images/niab/POLICY_CULTURE_4_NORMAL.png",
            img_on: "res/images/niab/POLICY_CULTURE_4_ON.png",
            levels: 3,
            effect_on_transmissability: 0,
            effect_on_infectivity: 0,
            effect_on_resources: 0.1,
            effect_on_crises: 0.1,
            effect_on_pop_high: -0.05,
            effect_on_pop_medium: 0,
            effect_on_pop_low: 0,
            effect_on_income_low: 0,
            effect_on_income_low_medium: 0,
            effect_on_income_medium_high: 0,
            effect_on_income_high: 0.05,
            effect_on_geo_tropic: 0,
            effect_on_geo_subtropic: 0,
            effect_on_geo_temperate: 0,
            effect_on_geo_polar: 0,
            effect_on_density: 0,
            effect_on_area_large: 0,
            effect_on_area_medium: 0,
            effect_on_area_small: 0,
            cost_1: 3,
            cost_2: 4,
            cost_3: 5
        } ]
    },
    ecology: {
        eng: {
            labelText: "Design your Ecological Policy",
            name: "Ecology"
        },
        esp: {
            labelText: "Diseñe su pólitica ecológica",
            name: "Ecología"
        },
        policyOptions: [ 
        {
            id: 13,
            domain: 4,
            eng: {
                text: "Fund Renewable Energy", 
                text_long: "Fund Renewable Energy", 
                description: "This policy is potentially very effective in highly industrialised countries."
            },
            esp: {
                text: "Fondo de Energías Renovables", 
                text_long: "Fondo de Energías Renovables", 
                description: "Esta política es potencialmente muy eficaz en los países altamente industrializados."
            },
            location: {x: 300, y: 500},
            img_normal: "res/images/niab/POLICY_ECOLOGY_1_NORMAL.png",
            img_on: "res/images/niab/POLICY_ECOLOGY_1_ON.png",
            levels: 3,
            effect_on_transmissability: 0,
            effect_on_infectivity: 0,
            effect_on_resources: 0.2,
            effect_on_crises: -0.2,
            effect_on_pop_high: 0.05,
            effect_on_pop_medium: 0,
            effect_on_pop_low: 0,
            effect_on_income_low: 0,
            effect_on_income_low_medium: 0.05,
            effect_on_income_medium_high: 0.15,
            effect_on_income_high: 0.15,
            effect_on_geo_tropic: 0.2,
            effect_on_geo_subtropic: 0.1,
            effect_on_geo_temperate: 0.05,
            effect_on_geo_polar: 0,
            effect_on_density: 0,
            effect_on_area_large: 0,
            effect_on_area_medium: 0,
            effect_on_area_small: 0,
            cost_1: 3,
            cost_2: 4,
            cost_3: 5
        },
        {
            id: 14,
            domain: 4,
            eng: {
                text: "Public Transport", 
                text_long: "Public Transport", 
                description: "This policy targets the reduction on greenhouse emissions globally. Particularly effective in urbanised countries."
            },
            esp: {
                text: "Transporte Público", 
                text_long: "Transporte Público", 
                description: "Esta política tiene como objetivo la reducción de las emisiones de gases de efecto invernadero en todo el mundo. Especialmente eficaz en países urbanizados."
            },
            location: {x: 600, y: 500},
            img_normal: "res/images/niab/POLICY_ECOLOGY_2_NORMAL.png",
            img_on: "res/images/niab/POLICY_ECOLOGY_2_ON.png",
            levels: 3,
            effect_on_transmissability: 0,
            effect_on_infectivity: 0,
            effect_on_resources: 0,
            effect_on_crises: -0.1,
            effect_on_pop_high: 0.1,
            effect_on_pop_medium: 0,
            effect_on_pop_low: 0,
            effect_on_income_low: 0.1,
            effect_on_income_low_medium: 0.2,
            effect_on_income_medium_high: 0.2,
            effect_on_income_high: 0.15,
            effect_on_geo_tropic: 0,
            effect_on_geo_subtropic: 0,
            effect_on_geo_temperate: 0,
            effect_on_geo_polar: 0,
            effect_on_density: 0,
            effect_on_area_large: 0,
            effect_on_area_medium: 0,
            effect_on_area_small: 0,
            cost_1: 3,
            cost_2: 4,
            cost_3: 5
        },
        {
            id: 15,
            domain: 4,
            eng: {
                text: "Green Cities", 
                text_long: "Green Cities", 
                description: "This policy involves the reduction of urban carbon footprint but does not address inequalities."
            },
            esp: {
                text: "Ciudades verdes", 
                text_long: "Ciudades verdes", 
                description: "Esta política implica la reducción de la huella de carbono urbana, pero no aborda las desigualdades."
            },
            location: {x: 300, y: 200},
            img_normal: "res/images/niab/POLICY_ECOLOGY_3_NORMAL.png",
            img_on: "res/images/niab/POLICY_ECOLOGY_3_ON.png",
            levels: 3,
            effect_on_transmissability: 0,
            effect_on_infectivity: 0,
            effect_on_resources: 0.1,
            effect_on_crises: -0.1,
            effect_on_pop_high: 0.2,
            effect_on_pop_medium: 0,
            effect_on_pop_low: 0,
            effect_on_income_low: 0,
            effect_on_income_low_medium: 0,
            effect_on_income_medium_high: 0.1,
            effect_on_income_high: 0.1,
            effect_on_geo_tropic: 0.1,
            effect_on_geo_subtropic: 0.1,
            effect_on_geo_temperate: 0.1,
            effect_on_geo_polar: 0,
            effect_on_density: 0,
            effect_on_area_large: 0,
            effect_on_area_medium: 0,
            effect_on_area_small: 0,
            cost_1: 3,
            cost_2: 4,
            cost_3: 5
        },
        {
            id: 16,
            domain: 4,
            eng: {
                text: "Global Heritage Trust", 
                text_long: "Global Heritage Trust", 
                description: "This policy boots the creation of national parks and produces better awareness about endangered species."
            },
            esp: {
                text: "Fondo del Patrimonio Mundial", 
                text_long: "Fondo del Patrimonio Mundial", 
                description: "Esta política fomenta la creación de parques nacionales y produce una mayor conciencia sobre las especies en peligro de extinción."
            },
            location: {x: 600, y: 200},
            img_normal: "res/images/niab/POLICY_ECOLOGY_4_NORMAL.png",
            img_on: "res/images/niab/POLICY_ECOLOGY_4_ON.png",
            levels: 3,
            effect_on_transmissability: 0,
            effect_on_infectivity: 0,
            effect_on_resources: 0,
            effect_on_crises: -0.05,
            effect_on_pop_high: 0,
            effect_on_pop_medium: 0,
            effect_on_pop_low: 0,
            effect_on_income_low: -0.1,
            effect_on_income_low_medium: 0,
            effect_on_income_medium_high: 0.1,
            effect_on_income_high: 0.15,
            effect_on_geo_tropic: 0.1,
            effect_on_geo_subtropic: 0,
            effect_on_geo_temperate: 0.05,
            effect_on_geo_polar: 0.1,
            effect_on_density: 0,
            effect_on_area_large: 0,
            effect_on_area_medium: 0,
            effect_on_area_small: 0,
            cost_1: 3,
            cost_2: 4,
            cost_3: 5
        } ]
    }
};


const RESOURCE_MATRIX = [
    [ 0		                                                                ],
    [ 0 	,0	                                                            ],
    [ 0     ,0	,0						 ],
    [ 0	    ,0	,0	,0						],
    [ 0	    ,0	,0	,0	,0					 ],
    [ 0 	,0	,0	,0	,0	,0				 	],
    [ 0    	,0	,0	,0	,0	,0	,0				 ],
    [ 0 	,0	,0	,0	,0	,0	,0	,0			 	],
    [ 0 	,0	,0	,0	,0	,0	,0	,0	,0			],
    [ 0    	,0	,0	,0	,0	,0	,0	,0	,0	,0			],
    [ 0    	,0	,0	,0	,0	,0	,0	,0	,0	,0	,0		  ],
    [ 0 	,0	,0	,0	,0	,0	,0	,0	,0	,0	,0	,0	  	],
    [ 0 	,0	,0	,0	,0	,0	,0	,0	,0	,0	,0	,0	,0	  	],
    [ 0 	,0	,0	,0	,0	,0	,0	,0	,0	,0	,0	,0	,0	,0	  ],
    [ 0	    ,0	,0	,0	,0	,0	,0	,0	,0	,0	,0	,0	,0	,0	,0	  ],
    [ 0 	,0	,0	,0	,0	,0	,0	,0	,0	,0	,0	,0	,0	,0	,0	,0   ]
];

const RESOURCE_RELATIONS = [
    [0															],
    [0	,0														],
    [0	,0	,0													],
    [1	,0	,0	,0												],
    [0	,0	,0	,0	,0											],
    [0	,0	,0	,0	,0	,0										],
    [0	,0	,0	,0	,0	,0	,0									],
    [0	,0	,0	,0	,0	,0	,0	,0								],
    [0	,0	,0	,0	,0	,0	,0	,0	,0							],
    [0	,0	,0	,0	,0	,0	,0	,0	,0	,0						],
    [1	,0	,0	,0	,0	,0	,0	,0	,0	,0	,0					],
    [0	,0	,0	,0	,0	,0	,0	,0	,0	,0	,0	,0				],
    [0	,0	,0	,0	,0	,0	,0	,0	,0	,0	,0	,0	,0			],
    [0	,0	,0	,0	,0	,0	,0	,0	,0	,0	,0	,0	,0	,0		],
    [0	,0	,0	,0	,0	,0	,0	,0	,0	,0	,0	,0	,0	,0	,0	],
    [0	,0	,0	,0	,0	,0	,0	,0	,0	,0	,0	,0	,0	,0	,0	,0]
];

const CRISES = {
    WATER_SHORTAGE: {
        eng: "Water shortage",
        esp: "Escasez de agua",
        image: "res/images/NEW_ICONS/ICON_CRISIS_WATER_SHORTAGE.png",
        effect_on_climate: 0,
        effect_on_population: 0,
        effect_on_global_gdp: 0,
        effect_on_transmissability: 0,
        effect_on_infectivity: 0,
        effect_on_resources: -0.2,
        effect_on_environmental_loss: 0.3,
        influence_of_environmental_loss: 2.0,
        influence_of_preparedness: -0.2 
    },
    FINANCIAL_CRISIS: {
        eng: "Financial crisis",
        esp: "Crisis financiera",
        image: "res/images/NEW_ICONS/ICON_CRISIS_CRASH.png",
        effect_on_climate: 0,
        effect_on_population: 0,
        effect_on_global_gdp: 0,
        effect_on_transmissability: 0,
        effect_on_infectivity: 0,
        effect_on_resources: -1.0,
        effect_on_environmental_loss: 0.0,
        influence_of_environmental_loss: 0.0,
        influence_of_preparedness: 0.0 
    },
    EXTREME_WEATHER_EVENT: {
        eng: "Extreme weather event",
        esp: "Evento meteorológico extremo",
        image: "res/images/NEW_ICONS/ICON_CRISIS_WEATHER.png",
        effect_on_climate: 0,
        effect_on_population: 0,
        effect_on_global_gdp: 0,
        effect_on_transmissability: 0,
        effect_on_infectivity: 0,
        effect_on_resources: -0.2,
        effect_on_environmental_loss: 0.4,
        influence_of_environmental_loss: 0.5,
        influence_of_preparedness: -0.2 
    },
    FORCED_DISPLACEMENT: {
        eng: "Forced displacement",
        esp: "Desplazamiento forzado",
        image: "res/images/NEW_ICONS/ICON_CRISIS_DISPLACEMENT.png",
        effect_on_climate: 0,
        effect_on_population: 0,
        effect_on_global_gdp: 0,
        effect_on_transmissability: 0,
        effect_on_infectivity: 0,
        effect_on_resources: -0.5,
        effect_on_environmental_loss: 0.2,
        influence_of_environmental_loss: 0.4,
        influence_of_preparedness: -0.5 
    },
    EPIDEMIC: {
        eng: "Epidemic",
        esp: "Epidémico",
        image: "res/images/NEW_ICONS/ICON_CRISIS_EPIDEMIC.png",
        effect_on_climate: 0,
        effect_on_population: 0,
        effect_on_global_gdp: 0,
        effect_on_transmissability: 0,
        effect_on_infectivity: 0,
        effect_on_resources: -0.7,
        effect_on_environmental_loss: 0.0,
        influence_of_environmental_loss: 0.2,
        influence_of_preparedness: -0.2 
    },
    WAR: {
        eng: "War",
        esp: "Guerra",
        image: "res/images/NEW_ICONS/ICON_CRISIS_WAR.png",
        effect_on_climate: 0,
        effect_on_population: 0,
        effect_on_global_gdp: 0,
        effect_on_transmissability: 0,
        effect_on_infectivity: 0,
        effect_on_resources: -0.8,
        effect_on_environmental_loss: -0.1,
        influence_of_environmental_loss: 0.3,
        influence_of_preparedness: -0.2 
    }
};

TUTORIAL_MESSAGES = {
    FIRST_RESOURCE_SHOWN: {
        eng: "Click on the blue icons when they appear. It will add resources to your wallet.",
        esp: "Haga clic en los iconos azules cuando aparezcan. Añadirá recursos a su billetera."
    },
    FIRST_RESOURCE_CLICKED: {
        eng: "Click on the \"POLICY\" button to invest your resources and build your strategy. Remember that not all policies are equally effective in each country and that some policies are only effective if combined with other ones.",
        esp: "Haga clic en el botón \"PÓLIZA\" para invertir sus recursos y construir su estrategia. Recuerde que no todas las políticas son igualmente eficaces en cada país y que algunas sólo lo son si se combinan con otras."
    },
    RANDOM_1: {
        eng: "Click on one country to check the progress of environmental loss and the effectiveness of your policy on the preparedness of that country.",
        esp: "Haga clic en un país para comprobar el progreso de la pérdida medioambiental y la eficacia de su política sobre la preparación de ese país."
    },
    RANDOM_2: {
        eng: "Click on \"STATS\" to check the progress of the game and the global effectiveness of your policy platform.",
        esp: "Haga clic en \"STATS\" para comprobar el progreso del juego y la eficacia global de su plataforma de políticas."
    },
    RANDOM_3: {
        eng: "You can pause or control the speed of the game by clicking on the top-right buttons.",
        esp: "Puedes pausar o controlar la velocidad del juego haciendo clic en los botones de la parte superior derecha."
    },
    RANDOM_4: {
        eng: "Keep an eye on the message bar at the top to be aware of unexpected events and adapt your strategy.",
        esp: "Vigile la barra de mensajes en la parte superior para estar al tanto de los eventos inesperados y adaptar su estrategia."
    },
};

const NARRATIVES = {
    n2048: {
        BAD: {
            loss: 20,
            eng: [
                "Because of the high level of environmental damage globally, surface waters have become corrosive to aragonite shells of pteropods, forever altering the Antarctic sea ecosystem. Act fast to avoid worse consequences to the Antarctic continent."
            ],
            esp: [
                "Debido al alto nivel de daño ambiental a nivel mundial, las aguas superficiales se han vuelto corrosivas para las conchas de aragonita de los pterópodos, alterando para siempre el ecosistema marino antártico. Actuar con rapidez para evitar las peores consecuencias para el continente antártico."
            ]
        },
        VERY_BAD: {
            loss: 40,
            eng: [
                "Sea levels are rising because of the contribution of Antarctic glaciers and ice shelves. Their retreat has exposed new ice-free areas, particularly on the Antarctic Peninsula, the northernmost part of the continent, where new invasive species have arrived. Act fast to avoid worse consequences to the Antarctic continent."
            ],
            esp: [
                "El nivel del mar está subiendo debido a la contribución de los glaciares y las plataformas de hielo de la Antártida. Su retirada ha puesto al descubierto nuevas áreas libres de hielo, particularmente en la Península Antártica, la parte más septentrional del continente, donde han llegado nuevas especies invasoras. Actuar con rapidez para evitar las peores consecuencias para el continente antártico."
            ]
        },
        VERY_VERY_BAD: {
            loss: 60,
            eng: [
                "In response to new phenomena such as transport of soil particles to the ocean by increased run-off of ice melt from the continent, interactions between key species (especially krill, penguins, seals and whales) are unexpectedly changing. Catastrophic declines in some communities prelude to the extinction of many of these species. Act fast to avoid worse consequences to the Antarctic continent."
            ],
            esp: [
                "En respuesta a nuevos fenómenos como el transporte de partículas de suelo al océano por el aumento de la escorrentía del hielo derretido del continente, las interacciones entre especies clave (especialmente el krill, los pingüinos, las focas y las ballenas) están cambiando inesperadamente. Las disminuciones catastróficas en algunas comunidades son el preludio de la extinción de muchas de estas especies. Actuar con rapidez para evitar las peores consecuencias para el continente antártico."
            ]
        },
        VERY_VERY_VERY_BAD: {
            loss: 80,
            eng: [
                "Owing to tremendous pressure for resources to support the world's population, Antarctica is becoming more widely exploited. The Commission for the Conservation of Antarctic Marine Living Resources (CCAMLR), which is responsible for setting the limits on fishing in the region, is weakening. As a result, many new marine species are now being harvested in the Southern Ocean. In addition, several nations are attempting to rescind Article 7 of the Protocol on Environmental Protection to the Antarctic Treaty, which prohibits mineral resource exploitation. The destruction of Antarctica as we know it seems inevitable."
            ],
            esp: [
                "Debido a la tremenda presión por recursos para apoyar a la población mundial, la Antártida se está explotando cada vez más. La Comisión para la Conservación de los Recursos Vivos Marinos Antárticos (CCAMLR), responsable de fijar los límites de pesca en la región, se está debilitando. Como resultado, muchas nuevas especies marinas están siendo capturadas en el Océano Austral. Además, varias naciones están intentando rescindir el Artículo 7 del Protocolo sobre Protección Ambiental del Tratado Antártico, que prohíbe la explotación de recursos minerales. La destrucción de la Antártida tal como la conocemos parece inevitable."
            ]
        },
        GOOD: {
            loss: 0,
            eng: [
                "While some ice shelves in the Antarctic Peninsula and Amundsen Sea appear forever lost, the thinning rates observed in the large ice shelves for the period 1994–2012 remained fairly steady through to 2048. The marine ice cliff instability has mostly been limited to a few outlet glaciers in the Amundsen Sea sector of West Antarctica and has not reached East Antarctica. Keep improving your global policy strategy to save Antarctica.",
                "Although ocean acidification is continuing, the impact is stabilizing as atmospheric CO2 levels are decreasing. Some Antarctic population declines have been recorded in sensitive species, but others adapted, resulting in less change than was initially forecast. Seal and seabird populations will probably be able to adapt to the new ecosystemic conditions if extreme events due to climate change become less frequent.",
                "Thanks to the strong action in mitigation greenhouse emissions globally, changes in the temperature and salinity of the Southern Ocean are reversing. The Antarctic Circumpolar Current is shifting towards the Equator, therefore contributing to cooling  the Southern Ocean. Changes in wind-driven ocean currents are reducing the exposure of the floating ice shelves to basal melt by warm ocean waters. However, the reduction in ocean heat transport to the ice shelf cavities is coming too late to save some West Antarctic ice shelves and ice tongues. Keep acting on your global policy strategy to save Antarctica.",
            ],
            esp: [
                "Mientras que algunas plataformas de hielo en la Península Antártica y el Mar de Amundsen parecen haberse perdido para siempre, las tasas de adelgazamiento observadas en las grandes plataformas de hielo durante el período 1994-2012 se mantuvieron bastante estables hasta 2048. La inestabilidad de los acantilados de hielo marino se ha limitado principalmente a unos pocos glaciares de salida en el sector del Mar de Amundsen de la Antártida occidental y no ha llegado a la Antártida oriental. Sigan mejorando su estrategia de política global para salvar a la Antártida.",
                "Aunque la acidificación de los océanos continúa, su impacto se estabiliza debido a que los niveles atmosféricos de CO2 están decreciendo. Se ha registrado una caída en las poblaciones antárticas de algunas especies críticas, pero otras especies se han adaptado, resultando en un cambio menos dramático que el inicialmente pronosticado. Si los eventos climáticos extremos se vuelven menos frecuentes, es probable que las poblaciones de focas y aves marinas puedan adaptarse a las nuevas condiciones ecosistémicas.",
                "Gracias a las enérgicas medidas de mitigación de las emisiones de gases de efecto invernadero en todo el mundo, los cambios en la temperatura y la salinidad del Océano Austral se están invirtiendo. La Corriente Circumpolar Antártica se desplaza hacia el Ecuador, contribuyendo así a enfriar el Océano Austral. Los cambios en las corrientes oceánicas impulsadas por el viento están reduciendo la exposición de las plataformas de hielo flotante al derretimiento basal por las aguas cálidas del océano. Sin embargo, la reducción en el transporte de calor oceánico a las cavidades de la plataforma de hielo está llegando demasiado tarde para salvar algunas plataformas de hielo y lenguas de hielo de la Antártida Occidental. Sigan actuando en su estrategia de política global para salvar a la Antártida.",
            ]
        }
    },
    n2070: {
        BAD: {
            loss: 80,
            eng: [
                "You lost! Your policy platform did not achieve its aim and an unprecedented environmental catastrophe is leading to a collapse of organised society globally. An international armed conflict over the use of Antarctic water and underground resources has sparked in 2069 with large scale human casualties. Forced human migration has spiked in 2048, when low-rise coastal cities needed to be abandoned and half the species on the planet have gone extinct. Carbon footprint is decreasing, but only due to population loss. Underground and low-orbit settlements for wealthy people are under construction, whilst a large majority of the world’s population will not survive the combination of climate wars and extreme climate events."
            ],
            esp: [
                "¡Perdiste! Su plataforma política no ha alcanzado su objetivo y una catástrofe medioambiental sin precedentes está llevando a un colapso de la sociedad organizada a nivel mundial. Un conflicto armado internacional por el uso del agua de la Antártida y los recursos subterráneos se desencadenó en 2069 con grandes pérdidas humanas. La migración forzada de seres humanos ha aumentado en 2048, cuando las ciudades costeras de baja altura necesitaban ser abandonadas y la mitad de las especies del planeta se han extinguido. La huella de carbono está disminuyendo, pero sólo debido a la pérdida de población. Se están construyendo asentamientos subterráneos y en órbita baja para personas ricas, mientras que una gran mayoría de la población mundial no sobrevivirá a la combinación de guerras climáticas y fenómenos climáticos extremos."
            ]
        },
        MID: {
            loss: 20,
            eng: [
                "You lost! In spite of your efforts, which have curbed climate change and reduced global carbon footprint, your policy platform was not strong enough to avoid environmental catastrophe. Whilst some Antarctic species have adapted to the new habitat conditions, the loss of ice shelves, the change in salinity, temperature and acidity of the Southern Ocean have completely transformed the Antarctic Continent. Mining explorations are taking place in the eastern side of the continent, after a number of states called for a review of the Environmental Protocol to the Antarctic Treaty. Elsewhere in the world, several cities have become inhospitable and climate migrants are causing several political struggles globally. The future of humanity is at risk."
            ],
            esp: [
                "¡Perdiste! A pesar de sus esfuerzos, que han frenado el cambio climático y reducido la huella de carbono global, su plataforma política no era lo suficientemente fuerte como para evitar una catástrofe medioambiental. Mientras que algunas especies antárticas se han adaptado a las nuevas condiciones del hábitat, la pérdida de las plataformas de hielo, el cambio en la salinidad, la temperatura y la acidez del Océano Austral han transformado completamente el continente antártico. Las exploraciones mineras se están llevando a cabo en la parte oriental del continente, después de que varios estados solicitaran una revisión del Protocolo Ambiental del Tratado Antártico. En otras partes del mundo, varias ciudades se han vuelto inhóspitas y los migrantes climáticos están causando varias luchas políticas a nivel mundial. El futuro de la humanidad está en peligro."
            ]
        },
        GOOD: {
            loss: 0,
            eng: [
                "You won! Your global policy platform has arrested climate change and reverted its negative effects on Antarctica. Most polar species have adapted to the new environmental conditions and your policy efforts have allowed a renegotiation of the Antarctic Treaty, which imposes much stricter limitations on human presence and on the exploitation of resources on the continent. Sea level rise has remained contained within 6cm, whilst less than 10% of Antarctic ice has been lost. Congratulations for avoiding an environmental catastrophe."
            ],
            esp: [
                "¡Ganaste! Tu plataforma política global ha logrado detener el cambio climático y revertir sus efectos negativos sobre la Antártida. La mayoría de las especies polares se han adaptado a las nuevas condiciones climáticas y tus esfuerzos políticos han permitido la renegociación del Tratado Antártico, el cual impone límites más estrictos a la presencia humana y la explotación de recursos en el continente. El nivel del mar ha permanecido contenido en 6cm y sólo un 10% del hielo Antártico se ha perdido. Felicitaciones por evitar una catástrofe ambiental."
            ]
        }
    }
};

gd.lang = {
    welcome: {
        eng: "Welcome to Antarctic Futures!",
        esp: "¡Bienvenido a Futuros Antárcticos!"
    },
    about_game: {
        eng: "This game is developed as part of a research project, 'Antarctic Cities and the Global Commons'. As part of our research, we collect your IP address, as well as anonymous data during the game. To learn more, click the 'Learn More' button below.",
        esp: "Este juego forma parte del proyecto de investigación “Ciudades Antárticas y Bienes Comunes Globales”. Como parte de nuestra investigación recopilamos tu dirección de IP así como algunos datos anónimos de la sesión de juego."
    },
    consent: {
        eng: "I agree to participate in this research project, and understand my gameplay data will be recorded anonymously.",
        esp: "Acepto participar de este proyecto de investigación y entiendo que los datos de mi sesión de juego serán recopilados de forma anónima."
    },
    commands_play: {
        eng: "PLAY",
        esp: "JUEGA"
    },
    commands_learn_more: {
        eng: "LEARN MORE",
        esp: "APRENDA MÁS"
    },
    commands_policy: {
        eng: "POLICY",
        esp: "PÓLITICA"
    },
    commands_loss: {
        eng: "Loss",
        esp: "Pérdida"
    },
    commands_prepared: {
        eng: "Prepared",
        esp: "Preparado"
    },
    commands_stats: {
        eng: "STATS",
        esp: "ESTADÍSTICA"
    },
    world_label: {
        eng: "World",
        esp: "Mundo"
    },
    crisis_prefix: {
        eng: "A ",
        esp: "Un "
    },
    crisis_suffix: {
        eng: " is taking place in ",
        esp: " tiene lugar en "
    },
    crisis_explanation: {
        eng: " Crises are unexpected events due to environmental loss. Click on the crisis icon to slow the loss and increase the preparedness of the country to minimise the risk of further crises.",
        esp: " Las crisis son eventos inesperados como consecuencia de la degradación ambiental. Haz clic sobre el ícono de crisis para detener el daño ambiental; aumenta el nivel de preparación de los países para minimizar el riesgo de nuevas crisis."
    },
    crisis_alert: {
        eng: "Crisis alert!",
        esp: "¡Alerta de Crisis!"
    },
    bulletin: {
        eng: "Antarctic Bulletin, year ",
        esp: "Boletín Antártico, año "
    },
    start_tutorial: {
        eng: "Start Tutorial",
        esp: "Iniciar Tutorial"
    },
    start_tutorial_skip: {
        eng: "Straight to Game",
        esp: "Straight to Game"
    },
    start_prepare: {
        eng: "Prepare the world...",
        esp: "Preparar al mundo..."
    },
    start_mission_a: {
        eng: "In 2019, your global policy mission begins in ",
        esp: "En el 2019 tu misión política global comienza en "
    },
    start_mission_b: {
        eng: ". You have until 2070 to save the Antarctic continent. Invest in policies that will reduce the effects of climate change, arrest environmental loss and increase the preparedness of each country.",
        esp: ". Tienes tiempo hasta el año 2070 para salvar el continente Antártico. Invertí en políticas que ayuden a reducir los efectos del cambio climático, evitar la pérdida de medio ambiente y aumentar el nivel de preparación de cada país."
    },
    crisis_title: {
        eng: "Congratulations!",
        esp: "Felicitaciones!"
    },
    crisis_message: {
        eng: "You have averted the ",
        esp: "Has evitado el "
    },
    policy_platform_title: {
        eng: "Build a policy platform",
        esp: "Construir una plataforma de políticas"
    },
    policy_platform_hint: {
        eng: "<<< Select one of these policies to invest in it!",
        esp: "<<< ¡Seleccione una de estas póliticas para invertir en ella!"
    },
    policy_platform_cost: {
        eng: "Cost: ",
        esp: "Costo: "
    },
    policy_platform_invest: {
        eng: "Invest in this policy",
        esp: "Invierta en esta política"
    },
    policy_platform_completed: {
        eng: "Policy completed!",
        esp: "¡Pólitica completa!"
    },
    policy_platform_more_resources: {
        eng: "You need more resources!",
        esp: "¡Necesita más recursos!"
    },
    stats_world: {
        eng: "World",
        esp: "Mundo"
    },
    stats_countries: {
        eng: "Countries",
        esp: "Países"
    },
    stats_trends: {
        eng: "Trends",
        esp: "Tendencias"
    },
    stats_country: {
        eng: "Country",
        esp: "País"
    },
    stats_year: {
        eng: "Year ",
        esp: "Año "
    },
    stats_year_message_a: {
        eng: "You have ",
        esp: "Usted tiene "
    },
    stats_year_message_b: {
        eng: " years until the end of the simulation.",
        esp: " años hasta el final de la simulación."
    },
    stats_loss: {
        eng: "Environmental loss",
        esp: "Pérdida ambiental"
    },
    stats_loss_message_a: {
        eng: "Since ",
        esp: "Desde que "
    },
    stats_loss_message_b: {
        eng: ", the global environment has declined by ",
        esp: ", el medio ambiente mundial se ha deteriorado en "
    },
    stats_preparedness: {
        eng: "Preparedness ",
        esp: "Preparación "
    },
    stats_preparedness_message_a: {
        eng: "Thanks to your policy platform, ",
        esp: "Gracias a su plataforma de póliticas, "
    },
    stats_preparedness_message_b: {
        eng: " of the world is now more ready to take action against climate change. ",
        esp: " del mundo está ahora más preparado para tomar medidas contra el cambio climático. "
    },
    stats_track: {
        eng: "Track how the world is doing",
        esp: "Siga la pista de cómo le va al mundo"
    }
};

gd.scenarioData = {
    "version":"1.0",
    "eng": { 
        "name": "Scenario: 'Choosing the future of Antarctica'",
        "description": "Obtained from Rintoul et al. (2018), 'Choosing the future of Antarctica', Nature, 558, 233-241",
        "icon": "",
        "feedback_email": "",
        "threat_type": "",
        "threat_type_locked": "",
        "threat_name": "",
        "popup_1_title": "Welcome to Antarctic Futures",
        "popup_1_description": "The future of Antarctica and the future of the world are deeply connected. What kind of policy action will halt climate change and save Antarctica from environmental destruction? The aim of the game is to build the right global policy platform to survive until year 2070.",
        "popup_2_title": "OK",
        "popup_2_description": "Click on the blue icons to collect resources!",
        "messages": {
            "negative": [
                "Global temperatures are rising, and could be 3.5 degrees higher by 2070!",
                "New ice-free areas are appearing on the Antarctic continent!",
                "Warming of Southern Oceans pose risks to shellfish and other marine life.",
                "Fishing, tourism and commercial shipping are expanding in the Southern Ocean!",
                "Globally, sea level rises cost coastal cities $1 trillion USD each year!",
                "Ships can now access new parts of the Antarctic continent...",
                "Warmer waters see a rise in baleen whales!",
                "Southern Ocean fish and penguin populations are declining...",
                "Invasive species - grasses, insects, biota - are settling permanently in Antarctica...",
                "Calls to protect endangered species appear to be ignored by Antarctic Treaty signatories...",
                "Human population is on track to exceed 10 billion by 2070...",
                "New technologies are enabling polar mining for oil and other resources!",
                "Antarctica tourism reaches 1 million visitors per year!"
            ],
            "positive": [
                "Finally! The physical environment of Antarctica and the Southern Ocean is returning to 2020 levels...",
                "'Hey Jude'! Ozone levels in the Antarctic stratosphere are returning to the values of the 1960s...",
                "Ocean acidification is no longer increasing dramatically...",
                "Major ice shelves remain in tact... for now.",
                "Sea level rises are restricted to 6cm per annum!",
                "Systematic conservation begins...",
                "Great! Invasive species are unable to settle permanently on the Antarctic!",
                "Decisive steps are being taken to limit the impact of increased human engagement with Antarctica.",
                "Truly global action on the Sustainable Development Goals is now underway!",
                "Eureka! Scientists discover new compounds from Antarctic biota, with major industrial and medical applications..."
            ]
        }
    
    },
    "esp": {
        "name": "Escenario: 'Choosing the future of Antarctica'",
        "description": "Obtenido de Rintoul et al. (2018), 'Choosing the future of Antarctica', Nature, 558, 233-241",
        "icon": "",
        "feedback_email": "",
        "threat_type": "",
        "threat_type_locked": "",
        "threat_name": "",
        "popup_1_title": "¡Bienvenido a Futuros Antárcticos!",
        "popup_1_description": "El futuro de la Antártida y el futuro del planeta están profundamente interconectados ¿Qué tipo de políticas pueden detener el cambio climático global y salvar a la Antártida de la destrucción medioambiental? El objetivo del juego es construir la plataforma política global correcta para sobrevivir hasta el año 2070.",
        "popup_2_title": "OK",
        "popup_2_description": "Haga clic en los iconos azules para reunir recursos!",
        "messages": {
            "negative": [
                "Las temperaturas globales están subiendo, y podrían ser 3,5 grados más altas para el año 2070!",
                "Nuevas áreas libres de hielo están apareciendo en el continente antártico!",
                "El calentamiento de los océanos meridionales plantea riesgos para los mariscos y otras formas de vida marina.",
                "La pesca, el turismo y la navegación comercial se están expandiendo en el Océano Antártico!",
                "A nivel global, el aumento del nivel del mar cuesta a las ciudades costeras 1 trillón de dólares cada año.",
                "Los barcos ya pueden acceder a nuevas partes del continente antártico....",
                "Las aguas más cálidas ven un aumento en las ballenas con barbas!",
                "Las poblaciones de peces y pingüinos del Océano Austral están disminuyendo....",
                "Las especies invasoras - hierbas, insectos, biota - se están asentando permanentemente en la Antártida....",
                "Los llamamientos para proteger las especies amenazadas parecen ser ignorados por los signatarios del Tratado Antártico...",
                "La población humana va camino de superar los 10.000 millones para 2070...",
                "Las nuevas tecnologías están permitiendo la minería polar para el petróleo y otros recursos!",
                "¡El turismo Antártico alcanza 1 millón de visitantes al año!"
            ],
            "positive": [
                "¡Finalmente! El entorno físico de la Antártida y el Océano Antártico está volviendo a los niveles del año 2020....",
                "¡Hey Jude! Los niveles de ozono en la estratósfera antártica están volviendo a los valores de 1960....",
                "La acidificación de los océanos ya no aumenta de modo dramático....",
                "Las principales plataformas de hielo permanecen intactas.... por ahora.",
                "El aumento del nivel del mar está restringido a 6 cm por año!",
                "Comienza una política de conservación sistemática....",
                "¡Genial! Las especies invasoras no pueden establecerse permanentemente en la Antártida!",
                "Se están tomando medidas decisivas para limitar el impacto del aumento de la participación humana en la Antártida.",
                "La acción verdaderamente global sobre los Objetivos de Desarrollo Sostenible ya está en marcha!",
                "¡Eureka! Científicos descubren nuevos compuestos en la biota Antártica con aplicaciones médicas e industriales de gran alcance...."
            ]
        }
    
    },
    "start_country": "",
    "start_country_locked": "",
    "start_country_percentage_affected": "",
    "start_country_percentage_dead": "",
    "start_country_percentage_zombie": "",

    "scenario_score_adjusted": "",
    "event_restriction": "",
    "lock_difficulty": "",
    "gene_selection": "",
    "allow_cheats": "",

    "start_specified": 1,
    "start_day": 1,
    "start_month": 8,
    "start_year": 2018,
    "target_month": 1,
    "target_year": 2070,

    "starting_resources": 8,

    "threat_details" : {
        "threat_template": "",
        "starting_conditions": {
            "starting_loss": 0.1,
            "starting_infectivity": 1,
            "starting_severity": 1,
            "starting_lethality": 10
        },
        "transmission": {
            "transmission_air": 1.0,
            "transmission_sea": 1.0,
            "transmission_land": 1.0    		
        },
        "environmental_effectivness": {
            "wealthy_country": 0.0,
            "poor_country": 1.0,
            "urban_country": 1.0,
            "rural_country": 1.0,
            "hot_country": 0.1,
            "cold_country": 0.1,
            "humid_country": 1.0,
            "arid_country": 1.0
        },
        "other_stats": {
            "cure_requirement": 0.0, 
            "mutation_likelihood": 0.5
        },
        "advanced_stats": {
            "loss_increase_speed": 0.02, 
            "minimum_loss_increase": 0.002, 
            "infectivity_increase_speed": 1.0, 
            "minimum_infectivity_increase": 0.1, 
            "severity_increase_speed": 1.0, 
            "minimum_severity_increase": 1.0, 
            "lethality_increase_speed": 0.05, 
            "minimum_lethality_increase_speed": 0.4, 
            "enable_corpse_transmission": false,
            "enable_land_transmission": true,
            "enable_sea_transmission": true,
            "enable_air_transmission": true,
            "infected_points_pot": 0 
        }
    }
};


gd.automateScripts = [
    {
        "name": "Green Growth",
        "resourcesProb": 0.8,
        "crisisDuration": 10,
        "fastForward": true,
        "policyEvents": [ 
            { "counter": 480, "policyID": 1 },
            { "counter": 960, "policyID": 5 },
            { "counter": 1440, "policyID": 13 },
            { "counter": 1920, "policyID": 2 },
            { "counter": 2400, "policyID": 6 },
            { "counter": 2880, "policyID": 14 },
            { "counter": 3360, "policyID": 4 },
            { "counter": 3840, "policyID": 7 },
            { "counter": 4320, "policyID": 15 },
            { "counter": 4800, "policyID": 8 },
            { "counter": 5280, "policyID": 16 },
            { "counter": 5760, "policyID": 1 },
            { "counter": 6240, "policyID": 6 },
            { "counter": 6720, "policyID": 13 },
            { "counter": 7200, "policyID": 2 },
            { "counter": 7680, "policyID": 8 },
            { "counter": 8160, "policyID": 14 },
            { "counter": 8640, "policyID": 4 },
            { "counter": 9120, "policyID": 15 },
            { "counter": 9600, "policyID": 16 },
            { "counter": 10080, "policyID": 1 },
            { "counter": 10560, "policyID": 8 },
            { "counter": 11040, "policyID": 13 },
            { "counter": 11520, "policyID": 2 },
            { "counter": 12000, "policyID": 4 }
        ]
    },
    {
        "name": "Democratic Ecosocialism",
        "resourcesProb": 0.8,
        "crisisDuration": 10,
        "fastForward": true,
        "policyEvents": [ 
            { "counter": 480, "policyID": 2 },
            { "counter": 960, "policyID": 5 },
            { "counter": 1440, "policyID": 9 },
            { "counter": 1920, "policyID": 13 },
            { "counter": 2400, "policyID": 3 },
            { "counter": 2880, "policyID": 6 },
            { "counter": 3360, "policyID": 10 },
            { "counter": 3840, "policyID": 14 },
            { "counter": 4320, "policyID": 3 },
            { "counter": 4800, "policyID": 7 },
            { "counter": 5280, "policyID": 11 },
            { "counter": 5760, "policyID": 15 },
            { "counter": 6240, "policyID": 16 },
            { "counter": 6720, "policyID": 13 },
            { "counter": 7200, "policyID": 14 },
            { "counter": 7680, "policyID": 15 },
            { "counter": 8160, "policyID": 16 },
            { "counter": 8640, "policyID": 14 },
            { "counter": 9120, "policyID": 15 }
        ]
    },
    {
        "name": "Eco totalitarian",
        "resourcesProb": 0.8,
        "crisisDuration": 10,
        "fastForward": true,
        "policyEvents": [ 
            { "counter": 480, "policyID": 1 },
            { "counter": 960, "policyID": 7 },
            { "counter": 1440, "policyID": 13 },
            { "counter": 1920, "policyID": 14 },
            { "counter": 2400, "policyID": 15 },
            { "counter": 2880, "policyID": 16 },
            { "counter": 3360, "policyID": 1 },
            { "counter": 3840, "policyID": 7 },
            { "counter": 4320, "policyID": 13 },
            { "counter": 4800, "policyID": 14 },
            { "counter": 5280, "policyID": 16 },
            { "counter": 5760, "policyID": 1 },
            { "counter": 6240, "policyID": 7 },
            { "counter": 6720, "policyID": 13 },
            { "counter": 7200, "policyID": 14 },
            { "counter": 7680, "policyID": 16 }
        ]
    },
    {
        "name": "Green Internationalist",
        "resourcesProb": 0.8,
        "crisisDuration": 10,
        "fastForward": true,
        "policyEvents": [ 
            { "counter": 480, "policyID": 1 },
            { "counter": 960, "policyID": 5 },
            { "counter": 1440, "policyID": 9 },
            { "counter": 1920, "policyID": 13 },
            { "counter": 2400, "policyID": 2 },
            { "counter": 2880, "policyID": 7 },
            { "counter": 3360, "policyID": 10 },
            { "counter": 3840, "policyID": 14 },
            { "counter": 4320, "policyID": 4 },
            { "counter": 4800, "policyID": 7 },
            { "counter": 5280, "policyID": 11 },
            { "counter": 5760, "policyID": 15 },
            { "counter": 6240, "policyID": 4 },
            { "counter": 6720, "policyID": 12 },
            { "counter": 7200, "policyID": 16 },
            { "counter": 7680, "policyID": 9 },
            { "counter": 8160, "policyID": 13 },
            { "counter": 8640, "policyID": 10 },
            { "counter": 9120, "policyID": 14 },
            { "counter": 9600, "policyID": 11 },
            { "counter": 10080, "policyID": 15 },
            { "counter": 10560, "policyID": 12 },
            { "counter": 11040, "policyID": 16 },
            { "counter": 11520, "policyID": 12 },
            { "counter": 12000, "policyID": 16 },
            { "counter": 12480, "policyID": 12 },
            { "counter": 12960, "policyID": 16 }
        ]
    },
    {
        "name": "Climate-change sceptic",
        "resourcesProb": 0.8,
        "crisisDuration": 10,
        "fastForward": true,
        "policyEvents": [ 
            { "counter": 480, "policyID": 1 },
            { "counter": 960, "policyID": 5 },
            { "counter": 1440, "policyID": 9 },
            { "counter": 1920, "policyID": 15 },
            { "counter": 2400, "policyID": 2 },
            { "counter": 2880, "policyID": 6 },
            { "counter": 3360, "policyID": 9 },
            { "counter": 3840, "policyID": 3 },
            { "counter": 4320, "policyID": 7 },
            { "counter": 4800, "policyID": 4 },
            { "counter": 5280, "policyID": 8 },
            { "counter": 5760, "policyID": 1 },
            { "counter": 6240, "policyID": 5 },
            { "counter": 6720, "policyID": 2 },
            { "counter": 7200, "policyID": 6 },
            { "counter": 7680, "policyID": 3 },
            { "counter": 8160, "policyID": 7 },
            { "counter": 8640, "policyID": 4 },
            { "counter": 9120, "policyID": 8 },
            { "counter": 9600, "policyID": 1 },
            { "counter": 10080, "policyID": 6 },
            { "counter": 10560, "policyID": 2 },
            { "counter": 11040, "policyID": 7 },
            { "counter": 11520, "policyID": 3 },
            { "counter": 12000, "policyID": 8 },
            { "counter": 11520, "policyID": 3 },
            { "counter": 12000, "policyID": 8 },
            { "counter": 12000, "policyID": 4 }
        ]
    },
    {
        "name": "Do nothing",
        "resourcesProb": 0.8,
        "crisisDuration": 10,
        "fastForward": true,
        "policyEvents": [ 
        ]
    }

];


gd.quizzes =
    [
        {
            id: 1,
            quiz: {
                eng: "As access to the Antarctic coast has become easier, thanks to rising temperatures and ice melt,  Antarctic krill is being fished to produce protein-rich animal feed. This is causing a decline in many other marine species around the continent. What can be done?",
                esp: "A medida que el acceso a la costa antártica se ha hecho más fácil, gracias al aumento de las temperaturas y al derretimiento del hielo, se está pescando krill antártico para producir alimentos para animales ricos en proteínas. Esto está causando una disminución en muchas otras especies marinas en todo el continente. ¿Qué se puede hacer?",
            },
            wrong_answer: {
                eng: "Establish a marine protected area?",
                esp: "Establecer un área marina protegida?"
            },
            right_answer: {
                eng: "Lobby the parties to the Antarctic Treaty secure Antarctica as a natural reserve and establish a moratorium on fishing in the Southern Ocean?",
                esp: "Hacer lobby ante las partes del Tratado Antártico para asegurar la Antártida como reserva natural y establecer una moratoria sobre la pesca en el Océano Austral?"
            }
        },
        {
            id: 2,
            quiz: {
                eng: "Because of the retreat of glaciers on the Antarctic peninsula, two invasive species have been found to be spreading without control, threatening the local ecosystem. What can be done?",
                esp: "Debido al retroceso de los glaciares en la península antártica, se ha descubierto que dos especies invasoras se están extendiendo sin control, amenazando el ecosistema local. ¿Qué se puede hacer?",
            },
            wrong_answer: {
                eng: "Start a social media campaign to support research on non-native invaders by the Antarctic Treaty’s Committee for Environmental Protection?",
                esp: "Iniciar una campaña en los medios de comunicación social para apoyar la investigación sobre invasores no autóctonos por parte del Comité para la Protección del Medio Ambiente del Tratado Antártico?"
            },
            right_answer: {
                eng: "Adopt a systematic, DNA barcoding and web-based surveillance system, which will enable rapid identification of other ‘unusual’ species in order to curb their spread on the peninsula?",
                esp: "Adoptar un sistema de vigilancia sistemático, basado en códigos de barras de ADN y en la web, que permita la rápida identificación de otras especies 'inusuales' para frenar su propagación en la península?"
            }
        },
        {
            id: 3,
            quiz: {
                eng: "Because of a global shortage in key minerals, a few nations have started investigating resource potential and extraction technologies in Antarctica, thinly veiled under the guise of scientific exploration. Environmental experts are worried that secret mines will appear on the continent, endangering the ecosystem. What can be done?",
                esp: "Because of a global shortage in key minerals, a few nations have started investigating resource potential and extraction technologies in Antarctica, thinly veiled under the guise of scientific exploration. Environmental experts are worried that secret mines will appear on the continent, endangering the ecosystem. What can be done?",
            },
            wrong_answer: {
                eng: "Call upon the Antarctic Treaty parties to rescind Article 7 of the Protocol on Environmental Protection to the Antarctic Treaty?",
                esp: "Call upon the Antarctic Treaty parties to rescind Article 7 of the Protocol on Environmental Protection to the Antarctic Treaty?"
            },
            right_answer: {
                eng: "Call upon the Antarctic Treaty parties to reinforce Article 7 of the Protocol on Environmental Protection to the Antarctic Treaty?",
                esp: "Call upon the Antarctic Treaty parties to reinforce Article 7 of the Protocol on Environmental Protection to the Antarctic Treaty?"
            }
        },
        {
            id: 4,
            quiz: {
                eng: "Mass loss from the melting Antarctic Ice Sheet is contributing to global sea level rise and continues to accelerate. Antarctica now makes the largest contribution to the rise in global mean sea level, exceeding the contribution from thermal expansion, the retreat of mountain glaciers and melting of the Greenland Ice Sheet. What can be done?",
                esp: "Mass loss from the melting Antarctic Ice Sheet is contributing to global sea level rise and continues to accelerate. Antarctica now makes the largest contribution to the rise in global mean sea level, exceeding the contribution from thermal expansion, the retreat of mountain glaciers and melting of the Greenland Ice Sheet. What can be done?",
            },
            wrong_answer: {
                eng: "Lobby the Antarctic treaty parties to test a geoengineering solution that delays sea level rise by pumping seawater onto the Antarctic continent to be stored as ice, with power supplied by 850,000 1.5-MW wind turbines?",
                esp: "Lobby the Antarctic treaty parties to test a geoengineering solution that delays sea level rise by pumping seawater onto the Antarctic continent to be stored as ice, with power supplied by 850,000 1.5-MW wind turbines?"
            },
            right_answer: {
                eng: "Lobby the UN to adopt a stricter temperature increase target and a moratorium on new fossil fuel explorations?",
                esp: "Lobby the UN to adopt a stricter temperature increase target and a moratorium on new fossil fuel explorations?"
            }
        },
        {
            id: 5,
            quiz: {
                eng: "With the increase of tourism to Antarctica, and the construction of hotels in the Antarctic Peninsula, alien plants have spread, threatening the local ecosystem. What can be done?",
                esp: "With the increase of tourism to Antarctica, and the construction of hotels in the Antarctic Peninsula, alien plants have spread, threatening the local ecosystem. What can be done?",
            },
            wrong_answer: {
                eng: "Start a social media campaign to ban tourism and non-scientific presence in Antarctica?",
                esp: "Start a social media campaign to ban tourism and non-scientific presence in Antarctica?"
            },
            right_answer: {
                eng: "Call upon the Antarctic Treaty to include a limit on human presence in the Protocol on Environmental Protection, and enact a systematic surveillance system for alien species?",
                esp: "Call upon the Antarctic Treaty to include a limit on human presence in the Protocol on Environmental Protection, and enact a systematic surveillance system for alien species?"
            }
        },
        {
            id: 6,
            quiz: {
                eng: "Changes in food availability is endangering the survival of several penguin species, which have to compete with large-scale krill fishing in the North of Antarctica. What can be done?",
                esp: "Changes in food availability is endangering the survival of several penguin species, which have to compete with large-scale krill fishing in the North of Antarctica. What can be done? ",
            },
            wrong_answer: {
                eng: "Establish a marine protected area?",
                esp: "Establish a marine protected area?"
            },
            right_answer: {
                eng: "Lobby the parties to the Antarctic Treaty to secure Antarctica as a natural reserve and establish a moratorium on fishing in the Southern Ocean?",
                esp: "Lobby the parties to the Antarctic Treaty to secure Antarctica as a natural reserve and establish a moratorium on fishing in the Southern Ocean?"
            }
        },
        {
            id: 7,
            quiz: {
                eng: "Owing to tremendous pressure for food to support the ever-growing world population, bioprospecting experiments have identified the possibility to harvest several krill species in the Southern Ocean. Scientists  fear that high levels of fishing will cause irreparable damage to the whole Antarctic ecosystem, whilst several nations are fighting for the apportionment of the krill population. What can be done?",
                esp: "Owing to tremendous pressure for food to support the ever-growing world population, bioprospecting experiments have identified the possibility to harvest several krill species in the Southern Ocean. Scientists  fear that high levels of fishing will cause irreparable damage to the whole Antarctic ecosystem, whilst several nations are fighting for the apportionment of the krill population. What can be done?",
            },
            wrong_answer: {
                eng: "Establish marine protected areas within the Protocol on Environmental Protection of the Antarctic Treaty, and apportion the remainder of the Southern Ocean area to countries that most need food supplies?",
                esp: "Establish marine protected areas within the Protocol on Environmental Protection of the Antarctic Treaty, and apportion the remainder of the Southern Ocean area to countries that most need food supplies?"
            },
            right_answer: {
                eng: "Lobby the Antarctic Treaty parties and the UN to adopt an ecosystem-based approach to the conservation of krill in the Southern Ocean, including a possible moratorium on fishing?",
                esp: "Lobby the Antarctic Treaty parties and the UN to adopt an ecosystem-based approach to the conservation of krill in the Southern Ocean, including a possible moratorium on fishing?"
            }
        }

    ];