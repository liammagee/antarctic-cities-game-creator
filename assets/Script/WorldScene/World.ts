
import {Resources} from './Resources';


export class Shader  {
    u_cellSize: number = 0.0
    u_randFactor: number = 0.0
    u_randAlpha: number = 0.0
    u_sizePower: number = 0.0
    u_sizeMultiplier: number = 0.0
    u_stepMin: number = 0.0
    u_stepMax: number = 0.0
    u_borderRadius: number = 0.0
}

export class Place  {
    points: cc.Vec2[] = []
    name: string = null
    iso_a2: string = null
    iso_a3: string = null
    latitute: number = 0
    longitude: number = 0
    pop_max: number = 0
    pop_min: number = 0
}

export class Country  {
    name: string = null
    points: cc.Vec2[] = []
    extremes: cc.Vec2[] = []
    centroid: cc.Vec2 = null
    area: number = 0
    affected_chance: number = 0
    pop_est: number = 0
    pop_aware: number = 0
    pop_aware_percent: number = 0
    pop_prepared: number = 0
    pop_prepared_percent: number = 0
    gdp_est: number = 0
    iso_a2: string = null
    iso_a3: string = null
    subregion: string = null
    economy: string = null
    income_grp: string = null
    income_grp_num: number = 0
    equator_dist: number = 0
    offsetX: number = 0
    offsetY: number = 0

    policy: number = 0
    previousLoss: number = 0
    loss: number = 0
    neighbours: Country[] = []
    points_shared: number = 0
    points_total: number = 0
    shared_border_percentage: number = 0
    policyPoints: any[] = []
    policyDots: any[] = []
    destructionPoints: any[] = []
    destructionDots: any[] = []
    selected: boolean = false
    places: Map<string,Place> = new Map<string,Place>()
}

export class CrisisCountry {
    crisis: string = ''
    id: number = 0
    country: string = ''
    counter: number = 0
}

export class Policy {
    cost_1: number = 0
    cost_2: number = 0
    cost_3: number = 0
    
}

export class GameParams  {
    populationWorld: number = 0
    level: string = ''
    language: string = 'eng'
    greyscale: boolean = true
    difficultyMultiplier: number = 0
    state: number = 0
    modal: boolean = false
    startDate: Date = new Date(Date.now())
    targetDate: Date = new Date(Date.now())
    previousDate: Date = null
    currentDate: Date = null
    counter: number = 0
    lastResource: number = 0
    lastCrisis: number = 0
    crises: CrisisCountry[] = []
    crisisCountry: CrisisCountry = null
    crisisCount: number = 0
    policies: Map<number, number> = new Map<number, number>()
    policy: number = 0
    countriedAffected: number = 0
    populationAware: number = 0
    populationPrepared: number = 0
    populationAwarePercent: number = 0
    populationPreparedPercent: number = 0
    resources: number = 0
    alertResources: boolean = false
    alertCrisis: boolean = false
    resourcesAdded: boolean = false
    previousLoss: number = 0
    rateOfLoss: number = 0
    minimumLoss: number = 0
    totalLoss: number = 0
    scenarioName: string = ''
    messagesNegative: string[] = []
    messagesPositive: string[] = []
    messageOverride: string = null
    tutorialMode: boolean = false
    tutorialHints: Array<string> = []
    stats: Object = {}
    quizzes: number[] = []
    shader: Shader = new Shader()
    automateMode: boolean = false
    automateScript: AutomatedScript = null
    timeInterval: number = 0
    tutorialInterval: number = 0
    resourceInterval: number = 0
    crisisInterval: number = 0
    policyOptions: Object = {}
    policyRelations: Object = {}
    startCountry: string = ''
    statsCountry: string = ''
    countries: Country[] = []
    currentCountry: string = null
    timeoutID: number = 0
}

export class AutomatedScript  {
    name: string = null
}

export class World {
    res: Resources = new Resources()
    countries: Country[] = []
    countriesJson: Map<string, Country> = new Map<string, Country>()
    sortedObjs: Country[] = []
    areaMin: number = 0
    areaMax: number = 0
    areaMean: number = 0
    areaRatio: number = 0
    areaMinCountry: string = ''
    areaMaxCountry: string = ''
    gameParams: GameParams = null
    automateID: number = 0
    automateScripts: AutomatedScript[] = []
    scenarioData: any = {}

}
