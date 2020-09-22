# Ngrok VendureIO Plugin

This is a plugin for the [Vendure e-commerce framework](https://www.vendure.io/). It allows establishing a tunnel with [ngrok](https://ngrok.com) service using the [npm]((https://www.npmjs.com/package/ngrok)) package.   

This plugin is a work in progress and if there are any bugs found report them under issues.

#### Todo
- [ ] complete readme
- [ ] add in unit testing
- [ ] code cleanup

## Usage

VendureConfig
```
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
```

Acceptable ngrok options
```
interface INgrokOptions {
    /**
     * Other "custom", indirectly-supported ngrok process options.
     *
     * @see {@link https://ngrok.com/docs}
     */
    [customOption: string]: any;

    /**
     * The tunnel type to put in place.
     *
     * @default 'http'
     */
    proto?: 'http' | 'tcp' | 'tls';

    /**
     * Port or network address to redirect traffic on.
     *
     * @default opts.port || opts.host || 80
     */
    addr?: string | number;

    /**
     * HTTP Basic authentication for tunnel.
     *
     * @default opts.httpauth
     */
    auth?: string;

    /**
     * Reserved tunnel name (e.g. https://alex.ngrok.io)
     */
    subdomain?: string;

    /**
     * Your authtoken from ngrok.com
     */
    authtoken?: string;

    /**
     * One of ngrok regions.
     * Note: region used in first tunnel will be used for all next tunnels too.
     *
     * @default 'us'
     */
    region?: 'us' | 'eu' | 'au' | 'ap' | 'sa' | 'jp' | 'in';

    /**
     * Custom path for ngrok config file.
     */
    configPath?: string;

    /**
     * Custom binary path, eg for prod in electron
     */
    binPath?: (defaultPath: string) => string;

    /**
     * Callback called when ngrok logs an event.
     */
    onLogEvent?: (logEventMessage: string) => any;

    /**
     * Callback called when session status is changed.
     * When connection is lost, ngrok will keep trying to reconnect.
     */
    onStatusChange?: (status: 'connected' | 'closed') => any;
}
```

## Linting

This repository uses [eslint](https://eslint.org/) & [Prettier](https://prettier.io/) for finding and fixing common code issues and formatting your code in a standard way. To identify and fix issues, use the command:

```bash
yarn lint:fix
```
