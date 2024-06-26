module.exports = ({
                            platform,
                            arch
                        }) => {
    let env = {
        SD_WEBUI_RESTARTING: 1
    }
    if (platform === 'darwin' && arch === 'x64') {
        env.PYTORCH_MPS_HIGH_WATERMARK_RATIO = 0
    }
    return {
        daemon: true,
        run: [{
            method: "shell.execute",
            params: {
                path: "app",
                messageFn: function ({platform}) {
                    return platform === 'win32' ? 'webui-user.bat --no-download-sd-model' : 'bash webui.sh -f --no-download-sd-model';
                },
                env,
                on: [{"event": "/http:\/\/[0-9.:]+/", "done": true}]
            }
        }]
    }
}
