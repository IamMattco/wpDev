## Usage

Now the reason of the all thing: instant development. Just two commands.   

Clone this repo and type 

```bash
composer install
```

Next install node packages

```bash
npm install
```

in order to install all the dependencies of the project. **You are already done**, just launch the php's built-in server with

```bash
php -S localhost:8000 -t app/
```

## WP Configuration

Thanks to phpdotenv you can store your configurations outside the public directory in a `.env` file. You'll find the file `.env.example` that you need to copy to `.env` within the root directory of the project with the following variables:

|**variable name** |**role**|
|------------------|--------|
| ENVIRNOMENT      | the environment where the app lives in (development, staging, production) |
| WP_HOME          | the url of the website|
| WP_SITEURL       | the url of the wordpress directory, here is urlofthesite.ltd/wordpress|
| DB_NAME          | name of the MySQL DB|
| DB_USER          | user of the MySQL DB|
| DB_PASSWORD      | password of the MySQL DB|
| DB_HOST          | host of the MySQL DB|
| USE_MYSQL        | `1` for MySQL, `0` for SQLite|
| DISABLE_WP_CRON  | whether or not the app should use the WP cron system (false requires setting up cron manually on your server)|

**For security purposes, don't forget to set AUTH_KEY, SECURE_AUTH_KEY, LOGGED_IN_KEY, NONCE_KEY, AUTH_SALT, SECURE_AUTH_SALT, LOGGED_IN_SALT, NONCE_SALT to different (long) random strings on production.**

**NOTE**
Don't commit the `.env` file, it's very likely that you want sapearate settings for each copy of the project. e.g. different urls for each environment like website.dev, staging.website.com and website.com. Just set those domains on each respective .env and you're ready to go :)

## Deploy :zap:

Thanks to SQLite DB the project itself is a self-contained package. You can just upload it to your server and point the webserver of your choice to `/path/to/project/app`.


## How to add WordPress Plugins

All the php dependencies are managed by Composer, the same happens for WordPress plugins (of course if they are commodities and not custom ones). You can find all the packagist entries for WordPress plugins on the [WPackagist official website](http://wpackagist.org/). 

For example, searching for buddypress would return something like `"wpackagist-plugin/buddypress": "~2.3.0"`, you just need to drop this line inside the `composer.json` file and type 

```bash
composer update
```

The whole plugins directory is under `.gitignore`, so if you add custom plugins you need to exclude them (you'll find an example within the .gitignore file) and add them to git.

_________________________________________


## Notes about SQLite

Even if the WordPress plugin included on this repo tries to create a drop-in replacement for MySQL converting all the MySQL queries to SQLite, there are certain operations that are not possible on SQLite. Hence, some plugin may not work as expected. You can see [a list of known non-working plugins here](http://dogwood.skr.jp/wordpress/sqlite-integration/#plugin-compat). I personally haven't found issues with other plugins until now (even heavy ones like WPML) but keep in mind that it could happen.

Another characteristic to keep in mind is that **SQLite is far from being a production database for big sites or with an heavy traffic**. In those cases you want to stay on a more efficient and scalable db engine like MySQL (or my favorite, MariaDB). You can switch from SQLite to MySQL without uninstalling the plugin with a simple false in the config file (keeping SQLite on local machine and MySQL on staging and production is a way).

