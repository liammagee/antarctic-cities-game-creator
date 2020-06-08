
  var res = {
    world_tilemap_tmx : "res/tmx-equal-greyscale.tmx",
    world_tilemap_background : "res/background-equal-greyscale.png",
    world_tilemap_foreground : "res/foreground-equal-greyscale.png",
    dot_png : "res/images/dot.png",
    fire_texture: "res/images/fire.png",
    policy_dot_off_png : "res/images/BUTTONS/DOT_OFF.png",
    policy_dot_on_png : "res/images/niab/DOT_ON.png",
    quit_off_png : "res/images/niab/BUTTON_QUIT.png",
    quit_on_png : "res/images/niab/BUTTON_QUIT.png",
    pause_off_png : "res/images/niab/BUTTON_PAUSE_NORMAL.png",
    pause_on_png : "res/images/niab/BUTTON_PAUSE_ON.png",
    play_off_png : "res/images/niab/BUTTON_PLAY_NORMAL.png",
    play_on_png : "res/images/niab/BUTTON_PLAY_ON.png",
    playfast_off_png : "res/images/niab/BUTTON_PLAYFAST_NORMAL.png",
    playfast_on_png : "res/images/niab/BUTTON_PLAYFAST_ON.png",
    antarctica_small_png : "res/images/NEW_ICONS/ANTARCTICA_SMALL.png",
    antarctica_large_png : "res/images/NEW_ICONS/ANTARCTICA_LARGE.png",
    resource_icon: "res/images/NEW_ICONS/ICON_RESOURCE.png",
    resource_economy_1: "res/images/niab/ICON_RESOURCE_ECONOMY_1.png",
    resource_economy_2: "res/images/niab/ICON_RESOURCE_ECONOMY_2.png",
    resource_economy_3: "res/images/niab/ICON_RESOURCE_ECONOMY_3.png",
    resource_economy_4: "res/images/niab/ICON_RESOURCE_ECONOMY_4.png",
    resource_politics_1: "res/images/niab/ICON_RESOURCE_POLITICS_1.png",
    resource_politics_2: "res/images/niab/ICON_RESOURCE_POLITICS_2.png",
    resource_politics_3: "res/images/niab/ICON_RESOURCE_POLITICS_3.png",
    resource_politics_4: "res/images/niab/ICON_RESOURCE_POLITICS_4.png",
    resource_culture_1: "res/images/niab/ICON_RESOURCE_CULTURE_1.png",
    resource_culture_2: "res/images/niab/ICON_RESOURCE_CULTURE_2.png",
    resource_culture_3: "res/images/niab/ICON_RESOURCE_CULTURE_3.png",
    resource_culture_4: "res/images/niab/ICON_RESOURCE_CULTURE_4.png",
    resource_ecology_1: "res/images/niab/ICON_RESOURCE_ECOLOGY_1.png",
    resource_ecology_2: "res/images/niab/ICON_RESOURCE_ECOLOGY_2.png",
    resource_ecology_3: "res/images/niab/ICON_RESOURCE_ECOLOGY_3.png",
    resource_ecology_4: "res/images/niab/ICON_RESOURCE_ECOLOGY_4.png",
    button_white: "res/images/BUTTONS/BUTTON_WHITE.png",
    button_grey: "res/images/BUTTONS/BUTTON_GREY.png",
    progress_bar: "res/images/progress-bar.png",
    ctrls_background: "res/images/ctrls-background.png",
    status_button: "res/images/status-button.png",
    shader_outline_vertex: "res/shaders/mask_country.vsh",
    shader_outline_fragment: "res/shaders/mask_country.fsh",
    ArvoFont : {
      type:"font",
      name:"ArvoFont",
      srcs:["res/fonts/Arvo-Regular.ttf", "res/fonts/Arvo-Regular.ttf"]
    },
    JosefinSansFont : {
      type:"font",
      name:"JosefinSansFont",
      srcs:["res/fonts/JosefinSans-Regular.ttf", "res/fonts/JosefinSans-Regular.ttf"]
    },
  
};

var g_resources = [];
for (var i in res) {
    g_resources.push(res[i]);
}
