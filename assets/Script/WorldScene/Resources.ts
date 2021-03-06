
// Resources.ts
// const {ccclass, property} = cc._decorator;

// @ccclass
// export class Resources extends cc.Component {
export class Resources  {

    // Version
    VERSION_ANTARCTIC_FUTURES : string = "Build: 1031";

    // LANGUAGES
    LANGUAGES = ['eng', 'esp'];

    // UI Constants
    Y_OFFSET : number = 55;
    RESOURCE_SIZE_W : number = 64; 
    RESOURCE_SIZE_H : number = 72; 

    // Timing Constants
    MONTH_INTERVAL : number = 15;
    MONTH_INTERVAL_FF : number = this.MONTH_INTERVAL / 3;
    RESOURCE_CHANCE : number = 0.1;
    CRISIS_CHANCE : number = 0.05;
    QUIZ_CHANCE : number = 0.33;
    RESOURCE_INTERVAL_MULTIPLIER : number = 10; 
    RESOURCE_DURATION : number = 300;
    CRISIS_INTERVAL_MULTIPLIER : number = 20; 
    TUTORIAL_INTERVAL_MULTIPLIER : number = 20; 

    // Game states
    GAME_STATES = {
        INITIALISED: 0,
        PREPARED: 1,
        STARTED: 2,
        PAUSED: 3,
        PAUSED_TUTORIAL: 4,
        GAME_OVER: 5
    };

    // DEFAULT LOSS CUTOFFs - Can be modified by narratives below
    LOSS_TOTAL = 80;
    LOSS_PARTIAL = 80;
    // Decay effects
    DECAY_LOSS : number = 50.0;
    DECAY_PREPAREDNESS : number = 5.0;
    // Game play parameters
    SIGMOIDAL_DECAY = true;

    // Game instructions
    LANG = {
        welcome: {
            eng: "Welcome to Antarctic Futures!",
            esp: "¡Bienvenido a Futuros Antárcticos!"
        },
        about_game: {
            eng: "This game is developed as part of a research project, 'Antarctic Cities and the Global Commons'. As part of our research, we collect your IP address, as well as anonymous data during the game. To learn more, click the 'Learn More' button below.",
            esp: "Este juego forma parte del proyecto de investigación “Las ciudades antárticas y los bienes comunes globales”. Como parte de nuestra investigación recopilamos tu dirección de IP así como algunos datos anónimos de la sesión de juego."
        },
        consent: {
            eng: "I agree to participate in this research project, and understand my gameplay data will be recorded anonymously.",
            esp: "Acepto participar en este proyecto de investigación y entiendo que los datos de mi sesión de juego serán recopilados de forma anónima."
        },
        commands_play: {
            eng: "PLAY",
            esp: "JUEGA"
        },
        commands_learn_more: {
            eng: "LEARN MORE",
            esp: "APRENDE MÁS"
        },
        url_learn_more: {
            eng: "https://antarctic-cities.org/the-game/",
            esp: "https://antarctic-cities.org/el-juego/",
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
            esp: "Directo al juego"
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
        },
        game_over_heading: {
            eng: "Game Over",
            esp: "Fin del juego"
        },
        game_over_story_heading: {
            eng: "The Story in ",
            esp: "La historia en "
        },
        game_over_hint_loss: {
            eng: "Hint: Try a different mix of resources next time!",
            esp: "Pista: La próxima vez, prueba una combinación diferente de recursos."
        },
        game_over_hint_win: {
            eng: "You're a great policy maker! Could another set of policies work next time?",
            esp: "¡Armaste muy bien tus  políticas! ¿Podría funcionar otro conjunto de políticas la próxima vez?"
        },
        game_over_no_policies: {
            eng: "(no policies)",
            esp: "(sin políticas)"
        },
        game_over_policy_list: {
            eng: "These were the policies you chose: ",
            esp: "Estas son las políticas que elegiste: "
        },
        game_over_world_experienced: {
            eng: "The world has experienced ",
            esp: "El mundo ha sufrido "
        },
        game_over_crises: {
            eng: " crises.",
            esp: " crisis."
        },
        game_over_whats_next: {
            eng: "What's next?",
            esp: "¿Qué sigue?",
        },
        game_over_ayc: {
            eng: "Get involved in real-world Antarctic issues. Visit the <color=#ccccff click='handler' param='https://antarctic-cities.org/ayc/'>Antartic Youth Forum</color>.",
            esp: "Involúcrate en los asuntos antárticos del mundo real. Visita el <color=#ccccff click='handler' param='https://antarctic-cities.org/ayc/'>Foro Juvenil Antártico</color>.",
        },
        game_over_feedback: {
            eng: "Send us feedback on <color=#ccccff click='handler' param='https://forms.gle/cYkKsquN3i9q5FfY8'>Antartic Futures</color>.",
            esp: "Envíanos tus comentarios sobre <color=#ccccff click='handler' param='https://forms.gle/cYkKsquN3i9q5FfY8'>Futuros Atlánticos</color>.",
        },
        game_over_play_again: {
            eng: "or PLAY AGAIN?",
            esp: "o JUEGA OTRA VEZ?",
        }
        
    };

    SCENARIO_DATA = {
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
            "popup_2_description": "Click on the lilac icons to collect resources!",
            "messages": {
                "negative": [
                    "Global temperatures are rising, and could be 3.5 degrees higher by 2070!",
                    "New ice-free areas are appearing on the Antarctic continent!",
                    "Warming of Southern Ocean pose risks to all marine life.",
                    "Fishing, tourism and commercial shipping are expanding exponentially in the Southern Ocean!",
                    "On a planetary scale, sea level rise costs coastal cities $1 trillion USD each year!",
                    "Ships can now access new parts of the Antarctic continent during winter months...",
                    "Warmer waters see a rise in baleen whales!",
                    "Southern Ocean fish and penguin populations are declining...",
                    "Invasive species, such as grasses and insects - are colonising new environments in Antarctica...",
                    "Calls to protect endangered species appear to be ignored by Antarctic Treaty signatories...",
                    "Human population is on track to exceed 10 billion by 2070...",
                    "New technologies are enabling polar mining for oil and other resources!",
                    "Antarctica tourism reaches half a million visitors per year!"
                ],
                "positive": [
                    "Finally! The fragile ecosystems of Antarctica and the Southern Ocean are returning to 2020 levels...",
                    "'Hey Jude'! Ozone levels in the stratosphere over Antarctica are returning to the values of the 1960s...",
                    "Ocean acidification is no longer increasing dramatically...",
                    "Major ice shelves remain intact... for now.",
                    "Sea level rise is restricted to 6mm per annum!",
                    "Dramatic new conservation policies are being enforced...",
                    "Great! Invasive species have declined on the Antarctic!",
                    "Decisive steps are being taken to limit the impact of increased human engagement in Antarctica.",
                    "Global action on the Sustainable Development Goals continues!",
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
            "popup_2_description": "Haga clic en los iconos lilas para reunir recursos!",
            "messages": {
                "negative": [
                    "Las temperaturas globales están subiendo, ¡y podrían aumentar por3,5 grados para el año 2070!",
                    "¡Están apareciendo nuevas áreas libres de hielo en el continente antártico!",
                    "El calentamiento del Océano Austral  pone en riesgo a toda la  vida marina.",
                    "La pesca, el turismo y la navegación comercial se expande exponencialmente en el Océano Austral",
                    " El aumento del nivel del mar le cuesta a las ciudades costeras del planeta 1 billón USD cada año.",
                    "Ya se puede acceder con  barcos, durante los meses de invierno, a nuevas partes del continente antártico....",
                    "¡Las aguas más cálidas han llevado al aumento en la cantidad de balénidos!",
                    "Las poblaciones de peces y pingüinos del Océano Austral están disminuyendo....",
                    "Las especies invasoras, tales como ciertas hierbas, insectos, y biota, están colonizando nuevos entornos antárticos...",
                    "Los llamamientos a proteger las especies amenazadas parecen ser ignorados por los signatarios del Tratado Antártico...",
                    "La población humana va camino de superar los 10.000 millones para 2070...",
                    "¡Las nuevas tecnologías están permitiendo la minería polar del petróleo y de otros recursos!",
                    "¡El turismo antártico alcanza el medio millón de visitantes al año!"
                ],
                "positive": [
                    "¡Por fin! Los frágiles ecosistemas de Antártida y el Océano Austral están volviendo a los niveles del año 2020....",
                    "¡Qué bien! Los niveles de ozono en la estratosfera sobre Antártida están volviendo a los valores de 1960....",
                    "La acidificación de los océanos ya no aumenta de modo dramático....",
                    "Las principales barreras de hielo permanecen intactas.... por ahora.",
                    "¡El aumento del nivel del mar se ha limitado a 6 mm por año!",
                    "Se vienen implementando nuevas políticas de conservación de gran impacto....",
                    "¡Genial! ¡Han disminuido las especies invasoras en Antártida!",
                    "Se están tomando medidas decisivas para limitar el impacto del aumento de la participación humana en la Antártida.",
                    "Continúa la acción a nivel mundial con respecto a los Objetivos de Desarrollo Sostenible.",
                    "¡Eureka! Las científicas y científicos siguen descubriendo nuevos compuestos en la biota antártica con aplicaciones médicas e industriales de gran alcance...."
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
        "start_month": 1,
        "start_year": 2020,
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
                "loss_increase_speed": 0.1, 
                "minimum_loss_increase": 0.02, 
                "infectivity_increase_speed": 1.0, 
                "minimum_infectivity_increase": 0.1, 
                "severity_increase_speed": 1.1, 
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

    // RESOURCES
    RESOURCES = {
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
                img_normal: "policies/POLICY_ECONOMY_1_NORMAL",
                img_on: "policies/POLICY_ECONOMY_1_ON",
                levels: 3,
                effect_on_transmissability: 0,
                effect_on_infectivity: 0,
                effect_on_resources: 0.2,
                effect_on_crises: 0.05,
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
                img_normal: "policies/POLICY_ECONOMY_2_NORMAL",
                img_on: "policies/POLICY_ECONOMY_2_ON",
                levels: 3,
                effect_on_transmissability: 0,
                effect_on_infectivity: 0,
                effect_on_resources: 0.4,
                effect_on_crises: 0.05,
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
                img_normal: "policies/POLICY_ECONOMY_3_NORMAL",
                img_on: "policies/POLICY_ECONOMY_3_ON",
                levels: 3,
                effect_on_transmissability: 0,
                effect_on_infectivity: 0,
                effect_on_resources: 0.3,
                effect_on_crises: -0.05,
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
                img_normal: "policies/POLICY_ECONOMY_4_NORMAL",
                img_on: "policies/POLICY_ECONOMY_4_ON",
                levels: 3,
                effect_on_transmissability: 0,
                effect_on_infectivity: 0,
                effect_on_resources: 0.2,
                effect_on_crises: 0.1,
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
                img_normal: "policies/POLICY_POLITCS_1_NORMAL",
                img_on: "policies/POLICY_POLITCS_1_ON",
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
                img_normal: "policies/POLICY_POLITCS_2_NORMAL",
                img_on: "policies/POLICY_POLITCS_2_ON",
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
                img_normal: "policies/POLICY_POLITCS_3_NORMAL",
                img_on: "policies/POLICY_POLITCS_3_ON",
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
                img_normal: "policies/POLICY_POLITCS_4_NORMAL",
                img_on: "policies/POLICY_POLITCS_4_ON",
                levels: 3,
                effect_on_transmissability: 0,
                effect_on_infectivity: 0,
                effect_on_resources: 0.1,
                effect_on_crises: 0.1,
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
                img_normal: "policies/POLICY_CULTURE_1_NORMAL",
                img_on: "policies/POLICY_CULTURE_1_ON",
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
                img_normal: "policies/POLICY_CULTURE_2_NORMAL",
                img_on: "policies/POLICY_CULTURE_2_ON",
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
                img_normal: "policies/POLICY_CULTURE_3_NORMAL",
                img_on: "policies/POLICY_CULTURE_3_ON",
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
                img_normal: "policies/POLICY_CULTURE_4_NORMAL",
                img_on: "policies/POLICY_CULTURE_4_ON",
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
                img_normal: "policies/POLICY_ECOLOGY_1_NORMAL",
                img_on: "policies/POLICY_ECOLOGY_1_ON",
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
                img_normal: "policies/POLICY_ECOLOGY_2_NORMAL",
                img_on: "policies/POLICY_ECOLOGY_2_ON",
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
                img_normal: "policies/POLICY_ECOLOGY_3_NORMAL",
                img_on: "policies/POLICY_ECOLOGY_3_ON",
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
                img_normal: "policies/POLICY_ECOLOGY_4_NORMAL",
                img_on: "policies/POLICY_ECOLOGY_4_ON",
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

    RESOURCE_MATRIX = [
        [0, 0.4, -0.5, 1, 0, -0.5, -0.2, 0, 0.2, 0.2, 0.1, 0, 0.1, 0.1, 0.1, -0.1],
        [0.1, 0, -0.7, 0, 0, -0.3, -0.1, 0.2, 0.1, 0, -0.2, 0, 0.2, 0.2, 0.1, 0],
        [-0.5, -0.5, 0, -0.8, 0.2, 0.8, 0.2, -0.3, 0.1, 0.1, 1, -0.4, 0.2, 0.4, 0.2, 0.1],
        [1, 0.6, -1, 0, 0.2, -0.7, 0.2, 0.2, 0.4, 0.4, -0.6, 0, -0.7, -0.8, 0.2, -1],
        [0.6, -0.2, 0.2, -0.6, 0, 0.4, 1, -0.5, 0, 0.1, 0.5, -0.4, 0.1, 0.1, 0.5, 0.5],
        [0, -0.1, 0.5, -0.6, 0.6, 0, 0.4, -0.8, 0.3, 0.2, 0.6, -0.1, 0.3, 0.4, 0.3, 0.3],
        [-0.1, -0.4, 0.2, 0.4, 0.6, 0.5, 0, -0.6, 0.1, 0.3, 0.2, 0.1, 0.2, 0.1, 0.4, 0.4],
        [0.1, 0.4, -0.8, 0.1, -0.9, -0.7, -0.6, 0, 0, 0.1, -0.6, 0, 0.3, -0.3, 0.1, -0.7],
        [0, 0.3, 0.1, 0.2, 0.4, -0.4, 0.1, 0, 0, 0.6, 0.3, 1, -0.3, 0, 0.1, 0.1],
        [0.3, 0.1, -0.3, 0.1, 0.6, -0.5, 0.1, 0.4, 0.6, 0, 0.1, 0.7, -0.6, 0.3, 0.1, 0.2],
        [-0.2, 0.2, 0.8, -0.5, 0.2, 0.8, 0.1, -0.7, 0.5, 0.2, 0, -0.4, 0.6, 0.5, 0.8, 0.7],
        [0.2, 0, -0.6, 0.2, 0.3, 0.2, 0.1, -0.3, 0.9, 1, 0.5, 0, 0, 0, 0.3, 0.2],
        [0.1, 0.4, 0.4, -0.4, 0, 0.2, 0, 0.2, -0.2, -0.5, 0.1, 0.1, 0, 1, 0.8, 0.5],
        [0.1, 0.2, 0.5, -0.4, 0.1, 0.5, 0, -0.4, 0.1, 0.4, 0.7, 0, 1, 0, 0.5, 0.3],
        [0.2, 0.4, 0.2, 0.2, 0, 0.2, 0.6, 0.1, 0.2, 0, 0.2, 0, 1, 0.8, 0, 0.5],
        [-0.7, -0.2, -0.1, -1, 0.2, -0.1, 0.5, -1, 0, 0.6, 0.3, 0, 0.6, 0.2, -0.1, 0]    ];

    RESOURCE_ICONS = {
        resource_economy_1: "icons/RESOURCE_1",
        resource_economy_2: "icons/RESOURCE_2",
        resource_economy_3: "icons/RESOURCE_3",
        resource_economy_4: "icons/RESOURCE_4",
        resource_politics_1: "icons/RESOURCE_1",
        resource_politics_2: "icons/RESOURCE_2",
        resource_politics_3: "icons/RESOURCE_3",
        resource_politics_4: "icons/RESOURCE_4",
        resource_culture_1: "icons/RESOURCE_1",
        resource_culture_2: "icons/RESOURCE_2",
        resource_culture_3: "icons/RESOURCE_3",
        resource_culture_4: "icons/RESOURCE_4",
        resource_ecology_1: "icons/RESOURCE_1",
        resource_ecology_2: "icons/RESOURCE_2",
        resource_ecology_3: "icons/RESOURCE_3",
        resource_ecology_4: "icons/RESOURCE_4",
    };

    CRISES = {
        WATER_SHORTAGE: {
            eng: "water shortage",
            esp: "escasez de agua",
            image: "icons/ICON_CRISIS_WATER_SHORTAGE",
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
            eng: "financial crisis",
            esp: "crisis financiera",
            image: "icons/ICON_CRISIS_CRASH",
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
            eng: "extreme weather event",
            esp: "evento meteorológico extremo",
            image: "icons/ICON_CRISIS_WEATHER",
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
            eng: "forced displacement",
            esp: "desplazamiento forzado",
            image: "icons/ICON_CRISIS_DISPLACEMENT",
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
            eng: "epidemic",
            esp: "epidémico",
            image: "icons/ICON_CRISIS_EPIDEMIC",
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
            eng: "war",
            esp: "guerra",
            image: "icons/ICON_CRISIS_WAR",
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

    CRISIS_ICONS = {
        crisis_1: "icons/ICON_CRISIS_CRASH",
        crisis_2: "icons/ICON_CRISIS_DISPLACEMENT",
        crisis_3: "icons/ICON_CRISIS_PANDEMIC",
        crisis_4: "icons/ICON_CRISIS_WAR",
        crisis_5: "icons/ICON_CRISIS_WATER_SHORTAGE",
        crisis_6: "icons/ICON_CRISIS_WEATHER"
    };

    TUTORIAL_MESSAGES = {
        FIRST_RESOURCE_SHOWN: {
            eng: "Click on the lilac icons when they appear. They will add resources to your wallet.",
            esp: "Pulsa sobre los íconos lilas cuando aparezcan, para añadir recursos a tu billetera."
        },
        FIRST_RESOURCE_CLICKED: {
            eng: "Click on the \"POLICY\" button to invest your resources and build your strategy. Remember that not all policies are equally effective in each country and that some policies are only effective if combined with other ones.",
            esp: "Pulsa sobre el botón \"POLÍTICA\" para invertir tus recursos y elaborar tu estrategia. Recuerda que no todas las políticas son igualmente eficaces en cada país y que algunas solo lo son si se combinan con otras."
        },
        RANDOM_1: {
            eng: "Click on one country to check the progress of environmental loss and the effectiveness of your policy on the preparedness of that country.",
            esp: "Pulsa sobre un país para comprobar cómo avanza  la pérdida medioambiental y la eficacia de tus políticas para mejorar la preparación de ese país."
        },
        RANDOM_2: {
            eng: "Click on \"STATS\" to check the progress of the game and the global effectiveness of your policy platform.",
            esp: "Pulsa sobre \"ESTADÍSTICA\" para comprobar el progreso del juego y la eficacia global de tus políticas."
        },
        RANDOM_3: {
            eng: "You can pause or control the speed of the game by clicking on the top-right buttons.",
            esp: "Puedes pausar o controlar la velocidad del juego haciendo clic en los botones de la parte superior derecha."
        },
        RANDOM_4: {
            eng: "Keep an eye on the message bar at the top to be aware of unexpected events and adapt your strategy.",
            esp: "Vigila la barra de mensajes en la parte superior de la pantalla para estar al tanto de los eventos inesperados y adaptar tu estrategia."
        },
    };

    NARRATIVES = {
        n2048: {
            BAD: {
                loss: 20,
                eng: [
                    "Because of the high level of environmental damage globally, surface waters have become corrosive to aragonite shells of pteropods, with long lasting effects on Antarctic sea ecosystems. Act fast to avoid worse consequences to the Antarctic region."
                ],
                esp: [
                    "Debido al alto nivel de daño ambiental a nivel mundial, las aguas superficiales se han vuelto corrosivas para las conchas de aragonita de los pterópodos, alterando para siempre el ecosistema marino antártico. Debes actuar con rapidez para evitar las peores consecuencias para el continente antártico."
                ]
            },
            VERY_BAD: {
                loss: 40,
                eng: [
                    "Sea levels are rising because of the rapid melting of Antarctic glaciers and ice shelves. Their thawing and retreat has exposed new ice-free areas, particularly on the Antarctic Peninsula, the northernmost part of the continent, where new invasive species have flourished. Act fast to avoid worse consequences to the Antarctic continent."
                ],
                esp: [
                    "El nivel del mar está subiendo debido al rápido derretimiento de los glaciares y las plataformas de hielo de la Antártida. El retroceso glaciar  ha puesto al descubierto nuevas áreas libres de hielo, en particular en la Península Antártica, la parte más septentrional del continente, donde han llegado nuevas especies invasoras. Se debe actuar con rapidez para evitar las peores consecuencias para el continente antártico."
                ]
            },
            VERY_VERY_BAD: {
                loss: 60,
                eng: [
                    "In response to new phenomena such as transport of soil particles to the ocean by increased run-off of ice melt from the continent, interactions between key species (especially krill, penguins, seals and whales) are rapidly changing. Catastrophic declines in some communities prelude to the extinction of many of these species. Act fast to avoid worse consequences to the Antarctic region."
                ],
                esp: [
                    "En respuesta a nuevos fenómenos, tales como el transporte de partículas de suelo al océano por el aumento de la escorrentía del hielo derretido del continente, las interacciones entre las especies clave (especialmente el krill, los pingüinos, las focas y las ballenas) están cambiando repentinamente. Las disminuciones catastróficas en algunas comunidades son el preludio de la extinción de muchas de estas especies. Debes actuar con rapidez para evitar las peores consecuencias para el continente antártico."
                ]
            },
            VERY_VERY_VERY_BAD: {
                loss: 80,
                eng: [
                    "Owing to tremendous pressure for resources to support the world's population, Antarctica is being opened up for resource exploitation. The Commission for the Conservation of Antarctic Marine Living Resources (CCAMLR), which is responsible for setting the limits on fishing in the region, is weakening. As a result, many new marine species are now being harvested in the Southern Ocean. In addition, several nations are attempting to rescind Article 7 of the Protocol on Environmental Protection to the Antarctic Treaty, which prohibits mineral resource exploitation. Devastation of Antarctica seems inevitable."
                ],
                esp: [
                    "Debido a la tremenda demanda de recursos para sustentar a la población mundial, la Antártida se abre cada vez más a la explotación . La Comisión para la Conservación de los Recursos Vivos Marinos Antárticos (CCAMLR), responsable de fijar los límites de pesca en la región, se está debilitando. En consecuencia, se vienen capturando muchas nuevas especies marinas en el Océano Austral. Además, varias naciones están intentando rescindir el Artículo 7 del Protocolo sobre Protección Ambiental del Tratado Antártico, que prohíbe la explotación de los recursos minerales. La devastación de la Antártida tal como la conocemos parece inevitable."
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
                    "Si bien algunas barreras de hielo en la Península Antártica y el Mar de Amundsen parecen haberse perdido para siempre, las tasas de adelgazamiento que se observaron  durante el período 1994-2012 se mantuvieron bastante estables hasta 2048. La inestabilidad de los acantilados de hielo marino se ha acotado a algunos glaciares de salida en el sector del Mar de Amundsen de la Antártida occidental y no ha llegado a la Antártida oriental. Sigue mejorando tu estrategia de política global para salvar a la Antártida.",
                    "Aunque la acidificación de los océanos continúa, el impacto se estabiliza debido a que los niveles atmosféricos de CO2 están disminuyendo. Se ha registrado una caída en las poblaciones antárticas de algunas especies críticas, pero otras especies se han adaptado, resultando en un cambio menos dramático que el inicialmente pronosticado. Si los eventos climáticos extremos se vuelven menos frecuentes, es probable que las poblaciones de focas y aves marinas puedan adaptarse a las nuevas condiciones ecosistémicas.",
                    "Gracias a las enérgicas medidas de mitigación de las emisiones de gases de efecto invernadero en todo el mundo, los cambios en la temperatura y la salinidad del Océano Austral se están invirtiendo. La Corriente Circumpolar Antártica se desplaza hacia el Ecuador, contribuyendo así a enfriar el Océano Austral. Los cambios en las corrientes oceánicas impulsadas por el viento están reduciendo la exposición de las plataformas de hielo flotante al derretimiento basal por las aguas cálidas del océano. Sin embargo, la reducción en el transporte de calor oceánico a las cavidades de la plataforma de hielo está llegando demasiado tarde para salvar algunas barreras y lenguas de hielo de la Antártida occidental. Sigue actuando en tu estrategia de política global para salvar a la Antártida.",
                ]
            }
        },
        n2070: {
            BAD: {
                loss: 80,
                eng: [
                    "<color=#ff3333>You lost!</color> Your policy platform did not achieve its aim and an unprecedented environmental catastrophe is leading to a collapse of organised society globally. An international armed conflict over the use of Antarctic water and underground resources has sparked in 2069 with large scale human casualties. Forced human migration has spiked in 2048, when low-rise coastal cities needed to be abandoned and half the species on the planet have gone extinct. Carbon footprint is decreasing, but only due to population loss. Underground and low-orbit settlements for wealthy people are under construction, whilst a large majority of the world’s population will not survive the combination of climate wars and extreme climate events."
                ],
                esp: [
                    "<color=#ff3333>¡Perdiste!</color> Tu plataforma política no ha alcanzado su objetivo y una catástrofe medioambiental sin precedentes está llevando a un colapso de la sociedad organizada a nivel mundial. Un conflicto armado internacional por el uso del agua y los recursos subterráneos antárticos se desencadenó en 2069 con grandes pérdidas humanas. La migración forzada de seres humanos aumentó  en 2048, cuando las ciudades costeras de baja altura debieron ser abandonadas y la mitad de las especies del planeta se extinguieron. La huella de carbono está disminuyendo, pero sólo debido a la pérdida de población. Se están construyendo asentamientos subterráneos y en órbita baja para personas ricas, mientras que una gran mayoría de la población mundial no sobrevivirá a la combinación de guerras climáticas y fenómenos climáticos extremos."
                ]
            },
            MID: {
                loss: 20,
                eng: [
                    "<color=#ccccff>You lost!</color> In spite of your efforts, which have curbed climate change and reduced global carbon footprint, your policy platform was not strong enough to avoid environmental catastrophe. Whilst some Antarctic species have adapted to the new habitat conditions, the loss of ice shelves, the change in salinity, temperature and acidity of the Southern Ocean have completely transformed the Antarctic Continent. Mining explorations are taking place in the eastern side of the continent, after  a number of states called for a review of the Environmental Protocol to the Antarctic Treaty. Elsewhere in the world, several cities have become inhospitable and climate migrants are causing several political struggles globally. The future of humanity is at risk."
                ],
                esp: [
                    "<color=#ccccff>¡Perdiste!</color> A pesar de tus esfuerzos, que han puesto el freno l cambio climático y reducido la huella de carbono global, tu plataforma política no fue lo suficientemente fuerte como para evitar una catástrofe medioambiental. Si bien algunas especies antárticas se adaptaron a las nuevas condiciones del hábitat, la pérdida de las plataformas de hielo, el cambio en la salinidad, la temperatura y la acidez del Océano Austral han transformado completamente el continente antártico.  Se están llevando a cabo exploraciones mineras en la parte oriental del continente, después de que varios estados solicitaron una revisión del Protocolo Ambiental del Tratado Antártico. En otras partes del mundo, varias ciudades se han vuelto inhóspitas y los migrantes climáticos están causando varias luchas políticas a nivel mundial. El futuro de la humanidad está en peligro."
                ]
            },
            GOOD: {
                loss: 0,
                eng: [
                    "<color=#99cc66>You won!</color> Your global policy platform has arrested climate change and reverted its negative effects on Antarctica. Most polar species are adapting to the new environmental conditions and your policy efforts have allowed a renegotiation of the Antarctic Treaty, which imposes much stricter limitations on human presence and on the exploitation of resources on the continent. Sea level rise has remained contained within 6mm, whilst less than 10% of Antarctic ice has been lost. Congratulations for avoiding an environmental catastrophe."
                ],
                esp: [
                    "<color=#99cc66>¡Ganaste!</color> Tu plataforma política global ha logrado detener el cambio climático y revertir los efectos negativos sobre la Antártida. La mayoría de las especies polares se han adaptado a las nuevas condiciones climáticas y tus esfuerzos políticos han permitido la renegociación del Tratado Antártico, el cual impone límites más estrictos a la presencia humana y la explotación de recursos en el continente. El aumento del nivel del mar se ha contenido dentro de los 6mm y se ha perdido sólo un 10% del hielo Antártico . Felicitaciones por evitar una catástrofe ambiental."
                ]
            }
        }
    }

    QUIZZES =
        [
            {
                id: 1,
                quiz: {
                    eng: `Lack of consensus among countries has led to an overfishing of <color=#AAAAFF click="handler" param='https://en.wikipedia.org/wiki/Krill'>Antarctic krill</color>, which produce protein-rich animal feed. This is impacting many other krill-feeding marine species in the Southern Ocean, including whales. What can be done?`,
                    esp: `La falta de consenso entre distintos países ha llevado a la sobrepesca del <color=#AAAAFF click="handler" param='https://es.wikipedia.org/wiki/Euphausiacea'>krill antártico</color> que es una fuente de  alimentación animal rica en proteínas. El efecto sobre otras especies marinas que se alimentan del kril, como las ballenas en el Océano Austral, es muy grave. ¿Qué se puede hacer?`,
                },
                wrong_answer: {
                    eng: `Lobby for the establishment of a <color=#AAAAFF click="handler" param='https://en.wikipedia.org/wiki/Marine_protected_area'>marine protected area</color>?`,
                    esp: `¿Establecer un <color=#AAAAFF click="handler" param='https://es.wikipedia.org/wiki/%C3%81rea_marina_protegida'>área marina protegida</color>?`
                },
                right_answer: {
                    eng: `Lobby parties to the <color=#AAAAFF click="handler" param='https://www.ccamlr.org/en/organisation'>Commission for the Conservation of Antarctic Marine Living Resources (CCAMLR)</color> to secure Antarctica as a natural reserve, and establish a <color=#AAAAFF click="handler" param='https://en.wikipedia.org/wiki/Moratorium_(law)'>moratorium</color> on fishing in the Southern Ocean?`,
                    esp: `¿Ejercer presión sobre las partes de la Comisión para la <color=#AAAAFF click="handler" param='https://www.ccamlr.org/es/organisation/acerca-de-la-ccrvma'>Conservación de los Recursos Vivos Marinos Antárticos (CCRVMA)</color> para asegurar la Antártida como reserva natural y establecer una <color=#AAAAFF click="handler" param='https://www.lavanguardia.com/vida/20041126/51262801243/la-uicn-pide-una-moratoria-a-la-pesca-de-arrastre.html'>moratoria</color> sobre la pesca en el Océano Austral?`
              }
            },
            {
                id: 2,
                quiz: {
                    eng: `Because of the <color=#AAAAFF click="handler" param='https://en.wikipedia.org/wiki/Retreat_of_glaciers_since_1850#Antarctica'>retreat of glaciers</color> on the Antarctic peninsula, two <color=#AAAAFF click="handler" param='https://en.wikipedia.org/wiki/Invasive_species'>invasive species</color> have been found to be spreading without control, threatening the local ecosystem. What can be done?`,
                    esp: `Se ha descubierto que dos <color=#AAAAFF click="handler" param='https://es.wikipedia.org/wiki/Especie_invasora'>especies invasoras</color> se extienden sin control y amenazan el ecosistema local, debido al <color=#AAAAFF click="handler" param='https://es.wikipedia.org/wiki/Retroceso_de_los_glaciares_desde_1850#Ant%C3%A1rtida'>retroceso de los glaciares</color> en la península antártica. ¿Qué se puede hacer?`,
                },
                wrong_answer: {
                    eng: `Start a social media campaign to support research on non-native invaders by the Antarctic Treaty’s Committee for Environmental Protection?`,
                    esp: `¿Iniciar una campaña en los medios de comunicación social para apoyar la investigación sobre invasores exóticos por parte del <color=#AAAAFF click="handler" param='https://www.ats.aq/s/committee.html'>Comité para la Protección del Medio Ambiente del Tratado Antártico</color>?`
                },
                right_answer: {
                    eng: `Adopt a systematic <color=#AAAAFF click="handler" param='https://en.wikipedia.org/wiki/DNA_barcoding'>DNA barcoding</color>and web-based surveillance system, which will enable rapid identification of other ‘unusual’ species in order to curb their spread on the peninsula?`,
                    esp: `¿Adoptar un sistema de vigilancia sistemático, basado en <color=#AAAAFF click="handler" param='https://es.wikipedia.org/wiki/C%C3%B3digo_de_barras_de_la_vida'>códigos de barras de la vida</color> y en la web, que permita la rápida identificación de otras especies 'inusuales' para frenar su propagación en la península?`
                }
            },
            {
                id: 3,
                quiz: {
                    eng: `Because of a global shortage in key minerals, a few nations have started investigating the potential for  resource extraction in  Antarctica, thinly veiled under the guise of scientific exploration. Environmental experts are worried that mineral deposits might be opened for exploration on the continent, endangering the ecosystem. What can be done?`,
                    esp: `Debido a la escasez mundial de minerales importantes, algunas naciones han comenzado a investigar el potencial para extraer recursos n en la Antártida, apenas velado bajo el pretexto de la exploración científica. A los expertos en medio ambiente les preocupa que se empiecen a explotar los depósitos minerales en el continente, poniendo en peligro el ecosistema. ¿Qué se puede hacer?`,
                },
                wrong_answer: {
                    eng: `Call upon the Antarctic Treaty parties to <i>rescind</i> Article 7 of the <color=#AAAAFF click="handler" param='https://en.wikipedia.org/wiki/Protocol_on_Environmental_Protection_to_the_Antarctic_Treaty'>Protocol on Environmental Protection</color>?`,
                    esp: `¿Llamar a las partes del Tratado Antártico a <i>rescindir</i> el artículo 7 del <color=#AAAAFF click="handler" param='https://www.ats.aq/s/protocol.html'>Protocolo de Protección Ambiental</color>?`
                },
                right_answer: {
                    eng: `Call upon the Antarctic Treaty parties to <i>reinforce</i> Article 7 of the <color=#AAAAFF click="handler" param='https://en.wikipedia.org/wiki/Protocol_on_Environmental_Protection_to_the_Antarctic_Treaty'>Protocol on Environmental Protection</color>?`,
                    esp: `¿Llamar a las partes del Tratado Antártico a <i>reforzar</i> el artículo 7 del <color=#AAAAFF click="handler" param='https://www.ats.aq/s/protocol.html'>Protocolo de Protección Ambiental</color>?`
                }
            },
            {
                id: 4,
                quiz: {
                    eng: `Mass loss from the melting <color=#AAAAFF click="handler" param='https://es.wikipedia.org/wiki/Tratado_Ant%C3%A1rtico'>Western Antarctic Ice Sheet (WAIS)</color> is contributing to global sea level rise and continues to accelerate. Antarctica now makes the largest contribution to the rise in global mean sea level, exceeding the contribution from <color=#AAAAFF click="handler" param='https://en.wikipedia.org/wiki/Thermal_expansion'>thermal expansion</color>, the retreat of mountain glaciers and melting of the <color=#AAAAFF click="handler" param='https://en.wikipedia.org/wiki/Greenland_ice_sheet'>Greenland Ice Sheet</color>. What can be done?`,
                    esp: `El derretimiento de la <color=#AAAAFF click="handler" param='https://es.wikipedia.org/wiki/Capa_de_hielo_de_la_Ant%C3%A1rtida_occidental'>capa de hielo de la Antártida occidental (WAIS)</color> está contribuyendo al aumento del nivel del mar a nivel mundial y continúa acelerándose. El aporte antártico al aumento del nivel medio del mar mundial es actualmente el más importante, superando la contribución de la <color=#AAAAFF click="handler" param='https://es.wikipedia.org/wiki/Dilataci%C3%B3n_t%C3%A9rmica'>dilatación térmica</color>, el retroceso de los glaciares montañosos y el derretimiento de la <color=#AAAAFF click="handler" param='https://es.wikipedia.org/wiki/Capa_de_hielo_de_Groenlandia'>capa de hielo de Groenlandia</color>. ¿Qué se puede hacer?`,
                },
                wrong_answer: {
                    eng: `Lobby the Antarctic treaty parties to test a geoengineering solution that delays sea level rise by pumping seawater onto the Antarctic continent to be stored as ice, with power supplied by 850,000 1.5-MW wind turbines?`,
                    esp: `¿Presionar a las partes del Tratado Antártico para probar una solución de geoingeniería que retrase la subida del nivel del mar bombeando agua de mar al continente antártico para almacenarla como hielo, con la energía suministrada por 850 000 turbinas eólicas de 1,5 MW?`
                },
                right_answer: {
                    eng: `Lobby the UN to adopt a more strict temperature increase target and a <color=#AAAAFF click="handler" param='https://en.wikipedia.org/wiki/Moratorium_(law)'>moratorium</color> on new <color=#AAAAFF click="handler" param='https://en.wikipedia.org/wiki/Fossil_fuel'>fossil fuel</color> explorations?`,
                    esp: `¿Presionar a la ONU para que adopte un objetivo más estricto para limitar el aumento de la temperatura y una <color=#AAAAFF click="handler" param='https://www.lavanguardia.com/vida/20041126/51262801243/la-uicn-pide-una-moratoria-a-la-pesca-de-arrastre.html'>moratoria</color> de las nuevas exploraciones de los <color=#AAAAFF click="handler" param='https://es.wikipedia.org/wiki/Combustible_f%C3%B3sil'>combustibles fósiles</color>?`
                }
            },
            {
                id: 5,
                quiz: {
                    eng: `With the increase of tourism to Antarctica, and the construction of eco-hotels in the Antarctic Peninsula, alien plants have spread, threatening the local ecosystem. What can be done?`,
                    esp: `Con el aumento del turismo hacia la Antártida y la construcción de hoteles ecológicos en la Península Antártica, las plantas exóticas se han extendido, amenazando el ecosistema local. ¿Qué se puede hacer?`,
                },
                wrong_answer: {
                    eng: `Start a social media campaign to ban tourism and non-scientific presence in Antarctica?`,
                    esp: `¿Empezar una campaña en los medios sociales para prohibir el turismo y la presencia no científica en la Antártida?`
                },
                right_answer: {
                    eng: `Call upon the Antarctic Treaty to include a limit on human presence in the <color=#AAAAFF click="handler" param='https://en.wikipedia.org/wiki/Protocol_on_Environmental_Protection_to_the_Antarctic_Treaty'>Protocol on Environmental Protection</color>, and enact a systematic surveillance system for alien species?`,
                    esp: `¿Exhortar a las partes del Tratado Antártico a incluir un límite a la presencia humana en el <color=#AAAAFF click="handler" param='https://es.wikipedia.org/wiki/Protocolo_al_Tratado_Ant%C3%A1rtico_sobre_Protecci%C3%B3n_del_Medio_Ambiente'>Protocolo de Protección Ambiental</color>, y a promulgar un sistema de vigilancia sistemática de las especies exóticas?`
                }
            },
            {
                id: 6,
                quiz: {
                    eng: `Changes in food availability is endangering the survival of several penguin species, which have to compete with large-scale <color=#AAAAFF click="handler" param='https://en.wikipedia.org/wiki/Krill'>krill</color> fishing in the <color=#AAAAFF click="handler" param='https://en.wikipedia.org/wiki/Antarctic_Peninsula'>Antarctic Peninsula</color>. What can be done?`,
                    esp: `Los cambios en la disponibilidad de alimentos están poniendo en peligro la supervivencia de varias especies de pingüinos, que tienen que competir con la pesca de <color=#AAAAFF click="handler" param='https://es.wikipedia.org/wiki/Euphausiacea'>krill</color> a gran escala en <color=#AAAAFF click="handler" param='https://es.wikipedia.org/wiki/Pen%C3%ADnsula_Ant%C3%A1rtica'>la Península Antártica</color>. ¿Qué se puede hacer?`,
                },
                wrong_answer: {
                    eng: `Establish a <color=#AAAAFF click="handler" param='https://en.wikipedia.org/wiki/Marine_protected_area'>marine protected area</color>?`,
                    esp: `¿Establecer un <color=#AAAAFF click="handler" param='https://es.wikipedia.org/wiki/%C3%81rea_marina_protegida'>área marina protegida</color>?`
                },
                right_answer: {
                    eng: `Lobby parties to the <color=#AAAAFF click="handler" param='https://www.ccamlr.org/en/organisation'>Commission for the Conservation of Antarctic Marine Living Resources (CCAMLR)</color> to secure Antarctica as a <color=#AAAAFF click="handler" param='https://en.wikipedia.org/wiki/Nature_reserve'>natural reserve</color> and establish a <color=#AAAAFF click="handler" param='https://en.wikipedia.org/wiki/Moratorium_(law)'>moratorium</color> on fishing in the Southern Ocean?`,
                    esp: `¿Presionar a las partes del <color=#AAAAFF click="handler" param='https://www.ccamlr.org/es/organisation/acerca-de-la-ccrvma'>Comisión para la Conservación de los Recursos Vivos Marinos Antárticos (CCRVMA)</color> para asegurar la Antártida como <color=#AAAAFF click="handler" param='https://es.wikipedia.org/wiki/Reserva_natural'>reserva natural</color> y establecer una <color=#AAAAFF click="handler" param='https://www.lavanguardia.com/vida/20041126/51262801243/la-uicn-pide-una-moratoria-a-la-pesca-de-arrastre.html'>moratoria</color> de la pesca en el Océano Austral?`
                }
            },
            {
                id: 7,
                quiz: {
                    eng: `Owing to tremendous pressure for food to support the ever-growing world population, <color=#AAAAFF click="handler" param='https://en.wikipedia.org/wiki/Bioprospecting'>bioprospecting</color> experiments have identified the possibility to expand harvesting several <color=#AAAAFF click="handler" param='https://en.wikipedia.org/wiki/Krill'>krill</color> species in the Southern Ocean. Scientists fear that high levels of fishing will cause irreparable damage to the whole Antarctic ecosystem. Meanwhile, several nations are fighting over krill fishing rights. What can be done?`,
                    esp: `Debido a la tremenda presión para obtener alimentos para sostener la creciente población mundial, los experimentos de <color=#AAAAFF click="handler" param='https://es.wikipedia.org/wiki/Bioprospecci%C3%B3n'>bioprospección</color> han identificado la posibilidad de extender la explotación devarias especies de <color=#AAAAFF click="handler" param='https://es.wikipedia.org/wiki/Euphausiacea'>kril</color> en el Océano Austral. Los científicos temen que los altos niveles de pesca causen un daño irreparable a todo el ecosistema antártico, mientras que varias naciones luchan por los derechos de pesca de kril. ¿Qué se puede hacer?`,
                },
                wrong_answer: {
                    eng: `Establish <color=#AAAAFF click="handler" param='https://en.wikipedia.org/wiki/Marine_protected_area'>marine protected areas</color> within the <color=#AAAAFF click="handler" param='https://en.wikipedia.org/wiki/Protocol_on_Environmental_Protection_to_the_Antarctic_Treaty'>Protocol on Environmental Protection of the Antarctic Treaty</color>, and apportion the remainder of the Southern Ocean area to countries that most need food supplies?`,
                    esp: `¿Establecer <color=#AAAAFF click="handler" param='https://es.wikipedia.org/wiki/%C3%81rea_marina_protegida'>áreas marinas protegidas</color> dentro del <color=#AAAAFF click="handler" param='https://www.ats.aq/s/protocol.html'>Protocolo al Tratado Antártico sobre Protección del Medio Ambiente</color>, y repartir el resto de la superficie del Océano Austral entre los países que más necesitan los suministros alimentarios?`
                },
                right_answer: {
                    eng: `Lobby the Antarctic Treaty parties and the UN to adopt an <color=#AAAAFF click="handler" param='https://cordis.europa.eu/article/id/411719-stopping-aquatic-biodiversity-loss-with-ecosystem-based-management-tools'>ecosystem-based approach</color> approach to the conservation of krill in the Southern Ocean, including a possible <color=#AAAAFF click="handler" param='https://en.wikipedia.org/wiki/Moratorium_(law)'>moratorium</color> on fishing?`,
                    esp: `¿Presionar a las partes del Tratado Antártico y a las Naciones Unidas para que adopten <color=#AAAAFF click="handler" param='https://cordis.europa.eu/article/id/411719-stopping-aquatic-biodiversity-loss-with-ecosystem-based-management-tools/es'>la gestión basada en el ecosistema</color> para la conservación del krill en el Océano Austral, incluyendo una posible <color=#AAAAFF click="handler" param='https://www.lavanguardia.com/vida/20041126/51262801243/la-uicn-pide-una-moratoria-a-la-pesca-de-arrastre.html'>moratoria</color> de la pesca?`
                }
            },
            {
                id: 8,
                quiz: {
                    eng: `It’s time to spread awareness about environmental damage to the Antarctic region. What can be done?`,
                    esp: `Se debe aumentar el nivel de concienciación sobre el daño ambiental en la región antártica. ¿Qué se puede hacer?`,
                },
                wrong_answer: {
                    eng: `Hope Antarctica  will take care of itself?`,
                    esp: `¿Esperar que Antártida se cuide sola?`
                },
                right_answer: {
                    eng: `Get in touch with the <color=#AAAAFF click="handler" param='https://antarctic-cities.org/ayc/'>Antarctic Youth Coalition</color> for advice and ideas about how to promote awareness in your local area?`,
                    esp: `¿Entrar en contacto con la <color=#AAAAFF click="handler" param='https://antarctic-cities.org/ayc/'>Coalición Juvenil Antártica</color> y hablar sobre ideas para concientizar a la población en tu zona?`
                }
            }

        ];


    automateScripts = [
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
    
    
}

