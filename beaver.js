module.exports = {
    title: "Stable Diffusion Forge",
    description: "Stable Diffusion WebUI Forge is a platform on top of Stable Diffusion WebUI (based on Gradio) to make development easier, optimize resource management, and speed up inference. https://github.com/lllyasviel/stable-diffusion-webui-forge?tab=readme-ov-file",
    icon: "icon.jpeg",
    install: "install.js",
    unInstall: "uninstall.json",
    start: "start.js",
    update: "update.json",
    installed: function (ctx) {
        return ctx.absPath('app', 'venv');
    },
}