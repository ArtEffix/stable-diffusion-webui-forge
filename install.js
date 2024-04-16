module.exports = async ({platform}) => {
    const script = {}
    if (platform === 'darwin') {
        script.requires = [{
            platform: "darwin",
            type: "conda",
            name: ["cmake", "protobuf", "rust", "wget"],
            args: "-c conda-forge"
        }]
    }

    script.run = [{
        method: "shell.run",
        params: {
            message: [
                "git clone https://github.com/lllyasviel/stable-diffusion-webui-forge app",
            ]
        }
    }, {
        method: "fs.share",
        params: {
            drive: {
                checkpoints: "app/models/Stable-diffusion",
                vae: "app/models/VAE",
                loras: [
                    "app/models/Lora",
                    "app/models/LyCORIS"
                ],
                upscale_models: [
                    "app/models/ESRGAN",
                    "app/models/RealESRGAN",
                    "app/models/SwinIR"
                ],
                embeddings: "app/embeddings",
                hypernetworks: "app/models/hypernetworks",
                controlnet: "app/models/ControlNet"
            },
            peers: [
                "https://github.com/ArtEffix/comfyui.git",
            ]
        }
    }, {
        method: "fs.share",
        params: {
            drive: {
                outputs: "app/output"
            }
        }
    }, {
        method: "json.add",
        params: {
            json: {
                "app/ui-config.json": {
                    "txt2img/Sampling steps/value": 1,
                    "txt2img/CFG Scale/value": 1.0
                }
            }
        }
    }, {
        method: "fs.download",
        params: {
            uri: "https://huggingface.co/stabilityai/sdxl-turbo/resolve/main/sd_xl_turbo_1.0_fp16.safetensors?download=true",
            dir: "app/models/Stable-diffusion"
        }
    }, {
        method: "shell.run",
        params: {
            messageFn: function ({platform}) {
                return platform === 'win32' ? 'webui-user.bat' : 'bash webui.sh -f';
            },
            env: {
                SD_WEBUI_RESTARTING: 1,
            },
            path: "app",
            on: [{"event": "/http:\/\/[0-9.:]+/", "kill": true}]
        }
    }, {
        method: "notify",
        params: {
            html: "Click the 'start' tab to launch the app"
        }
    }];
    return script
}
