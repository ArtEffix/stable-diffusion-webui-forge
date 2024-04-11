const path = require('path')

const STATUS = {
    INIT: 0,
    INSTALLED: 1,
    INSTALLING: 2,
    STARTING: 3,
    STARTED: 4,
    STOPPING: 5,
    STOPPED: 6,
    ERROR: 7,
};

module.exports = {
    title: "Stable Diffusion Forge",
    description: "Stable Diffusion WebUI Forge is a platform on top of Stable Diffusion WebUI (based on Gradio) to make development easier, optimize resource management, and speed up inference. https://github.com/lllyasviel/stable-diffusion-webui-forge?tab=readme-ov-file",
    icon: "icon.jpeg",
    menu: async (status) => {
        if (STATUS.INSTALLING === status) {
            return [{
                icon: "fa-solid fa-plug", text: "Installing", href: "install.js"
            }]
        }

        if (STATUS.INIT === status) {
            return [{
                icon: "fa-solid fa-plug",
                text: "Install",
                href: "install.js"
            }, {
                icon: "fa-solid fa-rotate",
                text: "Update",
                href: "update.json"
            }]
        }
        
        return {
            icon: "fa-solid fa-rocket",
            text: "Start",
            href: "start.js"
        }
    }
}