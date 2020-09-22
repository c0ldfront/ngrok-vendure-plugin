import { Logger, OnVendureBootstrap, OnVendureClose, Type, VendurePlugin } from '@vendure/core';

import { loggerCtx } from './constants';
import ngrok, { INgrokOptions } from 'ngrok';

/**
 * An ngrok vendure tunnel plugin.
 *
 * @example
 * ```TypeScript
 * export const config: VendureConfig = {
 *   //...
 *   plugins: [
 *     NgrokPlugin.init({
 *          authtoken: 'NGROK_AUTHTOKEN',
 *          addr: '3000',
 *          region: 'us',
 *          hostname: 'shop.vendure.io'
 *     }),
 *   ]
 * }
 * ```
 */
@VendurePlugin({})
export class NgrokPlugin implements OnVendureBootstrap, OnVendureClose {
    private static options: INgrokOptions;

    static init(options: INgrokOptions): Type<NgrokPlugin> {
        this.options = options;
        return NgrokPlugin;
    }

    async onVendureBootstrap(): Promise<void> {
        try {
            const tunnelUri = await ngrok.connect(NgrokPlugin.options);
            Logger.info(`=====================================================================`, loggerCtx);
            Logger.info(`\t\t\t\t\tNgrok tunnel now established`, loggerCtx);
            Logger.info(`=====================================================================`, loggerCtx);
            Logger.info(`Web Interface:\t${ngrok.getUrl()}`, loggerCtx);
            Logger.info(
                `Forwarding:\t\t${tunnelUri} -> http://localhost:${NgrokPlugin.options.addr}`,
                loggerCtx,
            );
            Logger.info(`=====================================================================`, loggerCtx);
        } catch (e) {
            Logger.info(e, loggerCtx);
        }
    }

    async onVendureClose(): Promise<void> {
        try {
            await ngrok.disconnect();
            await ngrok.kill();
            Logger.info('Shutting down ngrok tunnel.', loggerCtx);
        } catch (e) {
            Logger.info(e, loggerCtx);
        }
    }
}
