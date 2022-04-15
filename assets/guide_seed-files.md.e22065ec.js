import{_ as e,c as n,o as t,a as o}from"./app.eb3a0253.js";const f='{"title":"Seed files","description":"","frontmatter":{},"headers":[{"level":3,"title":"Seed files","slug":"seed-files"},{"level":3,"title":"Seed CLI","slug":"seed-cli"},{"level":3,"title":"knexfile.js","slug":"knexfile-js"},{"level":3,"title":"Migration API","slug":"migration-api"},{"level":2,"title":"make","slug":"make"},{"level":2,"title":"latest","slug":"latest"},{"level":2,"title":"rollback","slug":"rollback"},{"level":2,"title":"up","slug":"up"},{"level":2,"title":"down","slug":"down"},{"level":2,"title":"currentVersion","slug":"currentversion"},{"level":2,"title":"list","slug":"list"},{"level":2,"title":"unlock","slug":"unlock"},{"level":3,"title":"Notes about locks","slug":"notes-about-locks"},{"level":3,"title":"Custom migration sources","slug":"custom-migration-sources"},{"level":3,"title":"ECMAScript modules (ESM) Interoperability","slug":"ecmascript-modules-esm-interoperability"},{"level":3,"title":"Seed API","slug":"seed-api"},{"level":2,"title":"make","slug":"make-1"},{"level":2,"title":"run","slug":"run"},{"level":3,"title":"Custom seed sources","slug":"custom-seed-sources"}],"relativePath":"guide/seed-files.md"}',i={},a=o(`<h3 id="seed-files" tabindex="-1">Seed files <a class="header-anchor" href="#seed-files" aria-hidden="true">#</a></h3><p>Seed files allow you to populate your database with test or seed data independent of your migration files.</p><h3 id="seed-cli" tabindex="-1">Seed CLI <a class="header-anchor" href="#seed-cli" aria-hidden="true">#</a></h3><p>To create a seed file, run:</p><pre><code>$ knex seed:make seed_name
</code></pre><p>Seed files are created in the directory specified in your knexfile.js for the current environment. A sample seed configuration looks like:</p><pre><code>development: {
  client: ...,
  connection: { ... },
  seeds: {
      directory: &#39;./seeds/dev&#39;
  }
}
</code></pre><p>If no <code>seeds.directory</code> is defined, files are created in <code>./seeds</code>. Note that the seed directory needs to be a relative path. Absolute paths are not supported (nor is it good practice).</p><p>To run seed files, execute:</p><pre><code>$ knex seed:run
</code></pre><p>Seed files are executed in alphabetical order. Unlike migrations, <em>every</em> seed file will be executed when you run the command. You should design your seed files to reset tables as needed before inserting data.</p><p>To run specific seed files, execute:</p><pre><code>$ knex seed:run --specific=seed-filename.js --specific=another-seed-filename.js
</code></pre><h3 id="knexfile-js" tabindex="-1">knexfile.js <a class="header-anchor" href="#knexfile-js" aria-hidden="true">#</a></h3><p>A knexfile.js generally contains all of the configuration for your database. It can optionally provide different configuration for different environments. You may pass a <code>--knexfile</code> option to any of the command line statements to specify an alternate path to your knexfile.</p><h4 id="basic-configuration" tabindex="-1">Basic configuration <a class="header-anchor" href="#basic-configuration" aria-hidden="true">#</a></h4><pre><code>module.exports = {
  client: &#39;pg&#39;,
  connection: process.<wbr>env.DATABASE_URL || { user: &#39;me&#39;, database: &#39;my_app&#39; }
};
</code></pre><p>you can also export an async function from the knexfile. This is useful when you need to fetch credentials from a secure location like vault</p><pre><code>async function fetchConfiguration() {
  // TODO: implement me
  return {
    client: &#39;pg&#39;,
    connection: { user: &#39;me&#39;, password: &#39;my_pass&#39; }
  }
}

module.exports = async () =&gt; {
  const configuration = await fetchConfiguration();
  return {
    ...configuration,
    migrations: {}
  }
};
</code></pre><h4 id="environment-configuration" tabindex="-1">Environment configuration <a class="header-anchor" href="#environment-configuration" aria-hidden="true">#</a></h4><pre><code>module.exports = {
  development: {
    client: &#39;pg&#39;,
    connection: { user: &#39;me&#39;, database: &#39;my_app&#39; }
  },
  production: { client: &#39;pg&#39;, connection: process.<wbr>env.DATABASE_URL }
};
</code></pre><h4 id="custom-migration" tabindex="-1">Custom migration <a class="header-anchor" href="#custom-migration" aria-hidden="true">#</a></h4><p>You may provide a custom migration stub to be used in place of the default option.</p><pre><code>module.exports = {
  client: &#39;pg&#39;,
  migrations: {
    stub: &#39;migration.stub&#39;
  }
};
</code></pre><h4 id="generated-migration-extension" tabindex="-1">Generated migration extension <a class="header-anchor" href="#generated-migration-extension" aria-hidden="true">#</a></h4><p>You can control extension of generated migrations.</p><pre><code>module.exports = {
  client: &#39;pg&#39;,
  migrations: {
    extension: &#39;ts&#39;
  }
};
</code></pre><h4 id="knexfile-in-other-languages" tabindex="-1">Knexfile in other languages <a class="header-anchor" href="#knexfile-in-other-languages" aria-hidden="true">#</a></h4><p>Knex uses <a href="https://github.com/js-cli/js-liftoff" target="_blank" rel="noopener noreferrer">Liftoff</a> to support knexfile written in other compile-to-js languages.</p><p>Depending on the language, this may require you to install additional dependencies. The complete list of dependencies for each supported language can be found <a href="https://github.com/gulpjs/interpret#extensions" target="_blank" rel="noopener noreferrer">here</a>.</p><p>Most common cases are typescript (for which <a href="https://www.npmjs.com/package/typescript" target="_blank" rel="noopener noreferrer">typescript</a> and <a href="https://www.npmjs.com/package/ts-node" target="_blank" rel="noopener noreferrer">ts-node</a> packages are recommended), and coffeescript (for which <a href="https://www.npmjs.com/package/coffeescript" target="_blank" rel="noopener noreferrer">coffeescript</a> dependency is required).</p><p>If you don&#39;t specify the extension explicitly, the extension of generated migrations/seed files will be inferred from the knexfile extension</p><h3 id="migration-api" tabindex="-1">Migration API <a class="header-anchor" href="#migration-api" aria-hidden="true">#</a></h3><p><code>knex.migrate</code> is the class utilized by the knex migrations cli.</p><p>Each method takes an optional <code>config</code> object, which may specify the following properties:</p><ul><li><code>directory</code>: a relative path to the directory containing the migration files. Can be an array of paths (default <code>./migrations</code>)</li><li><code>extension</code>: the file extension used for the generated migration files (default <code>js</code>)</li><li><code>tableName</code>: the table name used for storing the migration state (default <code>knex_migrations</code>)</li><li><code>schemaName</code>: the schema name used for storing the table with migration state (optional parameter, only works on DBs that support multiple schemas in a single DB, such as PostgreSQL)</li><li><code>disableTransactions</code>: don&#39;t run migrations inside transactions (default <code>false</code>)</li><li><code>disableMigrationsListValidation</code>: do not validate that all the already executed migrations are still present in migration directories (default <code>false</code>)</li><li><code>sortDirsSeparately</code>: if true and multiple directories are specified, all migrations from a single directory will be executed before executing migrations in the next folder (default <code>false</code>)</li><li><code>loadExtensions</code>: array of file extensions which knex will treat as migrations. For example, if you have typescript transpiled into javascript in the same folder, you want to execute only javascript migrations. In this case, set <code>loadExtensions</code> to <code>[&#39;.js&#39;]</code> (Notice the dot!) (default <code>[&#39;.co&#39;, &#39;.coffee&#39;, &#39;.eg&#39;, &#39;.iced&#39;, &#39;.js&#39;, &#39;.litcoffee&#39;, &#39;.ls&#39;, &#39;.ts&#39;]</code>)</li><li><code>migrationSource</code>: specify a custom migration source, see <a href="#custom-migration-sources">Custom Migration Source</a> for more info (default filesystem)</li></ul><h4 id="transactions-in-migrations" tabindex="-1">Transactions in migrations <a class="header-anchor" href="#transactions-in-migrations" aria-hidden="true">#</a></h4><p>By default, each migration is run inside a transaction. Whenever needed, one can disable transactions for all migrations via the common migration config option <code>config.disableTransactions</code> or per-migration, via exposing a boolean property <code>config.transaction</code> from a migration file:</p><pre><code>exports.up = function(knex) {
  return knex.schema
    .createTable(&#39;users&#39;, function (table) {
       table.increments(&#39;id&#39;);
       table.string(&#39;first_name&#39;, 255).notNullable();
       table.string(&#39;last_name&#39;, 255).notNullable();
    })
    .createTable(&#39;products&#39;, function (table) {
       table.increments(&#39;id&#39;);
       table.decimal(&#39;price&#39;).notNullable();
       table.string(&#39;name&#39;, 1000).notNullable();
    });
};

exports.down = function(knex) {
  return knex.schema
      .dropTable(&quot;products&quot;)
      .dropTable(&quot;users&quot;);
};

exports.config = { transaction: false };
</code></pre><p>The same config property can be used for enabling transaction per-migration in case the common configuration has <code>disableTransactions: true</code>.</p><h2 id="make" tabindex="-1">make <a class="header-anchor" href="#make" aria-hidden="true">#</a></h2><p><strong>knex.migrate.make(name, [config])</strong></p><p>Creates a new migration, with the name of the migration being added.</p><h2 id="latest" tabindex="-1">latest <a class="header-anchor" href="#latest" aria-hidden="true">#</a></h2><p><strong>knex.migrate.latest([config])</strong></p><p>Runs all migrations that have not yet been run.</p><p>If you need to run something only after all migrations have finished their execution, you can do something like this:</p><pre><code>knex.migrate.latest()
  .then(function() {
    return knex.seed.run();
  })
  .then(function() {
    // migrations are finished
  });
</code></pre><h2 id="rollback" tabindex="-1">rollback <a class="header-anchor" href="#rollback" aria-hidden="true">#</a></h2><p><strong>knex.migrate.rollback([config], [all])</strong></p><p>Rolls back the latest migration group. If the <code>all</code> parameter is truthy, all applied migrations will be rolled back instead of just the last batch. The default value for this parameter is <code>false</code>.</p><h2 id="up" tabindex="-1">up <a class="header-anchor" href="#up" aria-hidden="true">#</a></h2><p><strong>knex.migrate.up([config])</strong></p><p>Runs the specified (by <code>config.name</code> parameter) or the next chronological migration that has not yet be run.</p><h2 id="down" tabindex="-1">down <a class="header-anchor" href="#down" aria-hidden="true">#</a></h2><p><strong>knex.migrate.down([config])</strong></p><p>Will undo the specified (by <code>config.name</code> parameter) or the last migration that was run.</p><h2 id="currentversion" tabindex="-1">currentVersion <a class="header-anchor" href="#currentversion" aria-hidden="true">#</a></h2><p><strong>knex.migrate.currentVersion([config])</strong></p><p>Retrieves and returns the current migration version, as a promise. If there aren&#39;t any migrations run yet, returns &quot;none&quot; as the value for the currentVersion.</p><h2 id="list" tabindex="-1">list <a class="header-anchor" href="#list" aria-hidden="true">#</a></h2><p><strong>knex.migrate.list([config])</strong></p><p>Will return list of completed and pending migrations</p><h2 id="unlock" tabindex="-1">unlock <a class="header-anchor" href="#unlock" aria-hidden="true">#</a></h2><p><strong>knex.migrate.forceFreeMigrationsLock([config])</strong></p><p>Forcibly unlocks the migrations lock table, and ensures that there is only one row in it.</p><h3 id="notes-about-locks" tabindex="-1">Notes about locks <a class="header-anchor" href="#notes-about-locks" aria-hidden="true">#</a></h3><p>A lock system is there to prevent multiple processes from running the same migration batch in the same time. When a batch of migrations is about to be run, the migration system first tries to get a lock using a <code>SELECT ... FOR UPDATE</code> statement (preventing race conditions from happening). If it can get a lock, the migration batch will run. If it can&#39;t, it will wait until the lock is released.</p><p>Please note that if your process unfortunately crashes, the lock will have to be <em>manually</em> removed with <code>knex migrate:unlock</code> in order to let migrations run again.</p><p>The locks are saved in a table called &quot;<code>tableName</code>_lock&quot;; it has a column called <code>is_locked</code> that <code>knex migrate:unlock</code> sets to <code>0</code> in order to release the lock. The <code>index</code> column in the lock table exists for compatibility with some database clusters that require a primary key, but is otherwise unused. There must be only one row in this table, or an error will be thrown when running migrations: &quot;Migration table is already locked&quot;. Run <code>knex migrate:unlock</code> to ensure that there is only one row in the table.</p><h3 id="custom-migration-sources" tabindex="-1">Custom migration sources <a class="header-anchor" href="#custom-migration-sources" aria-hidden="true">#</a></h3><p>Knex supports custom migration sources, allowing you full control of where your migrations come from. This can be useful for custom folder structures, when bundling with webpack/browserify and other scenarios.</p><pre><code>// Create a custom migration source class
class MyMigrationSource {
  // Must return a Promise containing a list of migrations. 
  // Migrations can be whatever you want, they will be passed as
  // arguments to getMigrationName and getMigration
  getMigrations() {
    // In this example we are just returning migration names
    return Promise.resolve([&#39;migration1&#39;])
  }

  getMigrationName(migration) {
    return migration;
  }

  getMigration(migration) {
    switch(migration) {
      case &#39;migration1&#39;:
        return {
          up(knex)   { /* ... */ }
          down(knex) { /* ... */ }
        }
    }
  }
}

// pass an instance of your migration source as knex config
knex.migrate.latest({ migrationSource: new MyMigrationSource() })
</code></pre><h4 id="webpack-migration-source-example" tabindex="-1">Webpack migration source example <a class="header-anchor" href="#webpack-migration-source-example" aria-hidden="true">#</a></h4><p>An example of how to create a migration source where migrations are included in a webpack bundle.</p><pre><code>const path = require(&#39;path&#39;)

class WebpackMigrationSource {
  constructor(migrationContext) {
    this.migrationContext = migrationContext
  }

  getMigrations() {
    return Promise.resolve(this.migrationContext.keys().sort())
  }

  getMigrationName(migration) {
    return path.parse(migration).base
  }

  getMigration(migration) {
    return this.migrationContext(migration)
  }
}

// pass an instance of your migration source as knex config
knex.migrate.latest({
  migrationSource: new WebpackMigrationSource(require.context(&#39;./migrations&#39;, false, /.js$/))
})

// with webpack &gt;=5, require.context will add both the relative and absolute paths to the context
// to avoid duplicate migration errors, you&#39;ll need to filter out one or the other
// this example filters out absolute paths, leaving only the relative ones(./migrations/*.js):
knex.migrate.latest({
  migrationSource: new WebpackMigrationSource(require.context(&#39;./migrations&#39;, false, /^\\.\\/.*\\.js$/))
})
</code></pre><h3 id="ecmascript-modules-esm-interoperability" tabindex="-1">ECMAScript modules (ESM) Interoperability <a class="header-anchor" href="#ecmascript-modules-esm-interoperability" aria-hidden="true">#</a></h3><p>ECMAScript Module support for knex CLI&#39;s configuration, migration and seeds<br> enabled by the <code>--esm</code> flag, ECMAScript Interoperability is provided by the <a href="https://github.com/standard-things/esm" target="_blank" rel="noopener noreferrer"><em>&#39;esm&#39;</em></a> module.<br> You can find <a href="https://github.com/standard-things/esm" target="_blank" rel="noopener noreferrer">here</a> more information about &#39;esm&#39; superpowers.</p><p>Node &#39;mjs&#39; files are handled by NodeJS own import mechanics<br> and do not require the use of the &#39;--esm&#39; flag.<br> But you might need it anyway for Node v10 under certain scenarios.<br> You can find details about NodeJS ECMAScript modules <a href="https://nodejs.org/api/esm.html" target="_blank" rel="noopener noreferrer">here</a></p><p>While it is possible to mix and match different module formats (extensions)<br> between your knexfile, seeds and migrations,<br> some format combinations will require specific NodeJS versions,<br><em>Notably mjs/cjs files will follow NodeJS import and require restrictions.</em><br> You can see <a href="https://github.com/knex/knex/blob/master/test/cli/esm-interop.spec.js" target="_blank" rel="noopener noreferrer">here</a> many possible scenarios,<br> and <a href="https://github.com/knex/knex/tree/master/test/jake-util/knexfile-imports" target="_blank" rel="noopener noreferrer">here</a> some sample configurations</p><p>Node v10.* require the use of the &#39;--experimental-module&#39; flag in order to use the &#39;mjs&#39; or &#39;cjs&#39; extension.</p><pre><code># launching knex on Node v10 to use mjs/cjs modules
node --experimental-modules ./node_modules/.bin/knex $@
</code></pre><p>When using migration and seed files with &#39;.cjs&#39; or &#39;.mjs&#39; extensions, you will need to specify that explicitly:</p><pre><code>/* 
 * knexfile.mjs
 */
export default {      
  migrations: {
    // ... client, connection,etc .... 
    directory: &#39;./migrations&#39;,
    loadExtensions: [&#39;.mjs&#39;] // 
  }
}
</code></pre><p>When using &#39;.mjs&#39; extensions for your knexfile and &#39;.js&#39; for the seeds/migrations, you will need to specify that explicitly.</p><pre><code>/* 
 * knexfile.mjs
 */
export default {      
  migrations: {
    // ... client, connection,etc .... 
    directory: &#39;./migrations&#39;,
    loadExtensions: [&#39;.js&#39;] // knex will search for &#39;mjs&#39; file by default
  }
}
</code></pre><p>For the knexfile you can use a default export,<br> it will take precedence over named export.</p><pre><code>/**
 * filename: knexfile.js
 * For the knexfile you can use a default export
 **/        
export default {
  client: &#39;sqlite3&#39;,
  connection: {
    filename: &#39;../test.sqlite3&#39;,
  },
  migrations: {
    directory: &#39;./migrations&#39;,
  },
  seeds: {
    directory: &#39;./seeds&#39;,
  },
}

/**
 * filename: knexfile.js
 * Let knex find the configuration by providing named exports,
 * but if exported a default, it will take precedence, and it will be used instead
 **/
const config = {
  client: &#39;sqlite3&#39;,
  connection: {
    filename: &#39;../test.sqlite3&#39;,
  },
  migrations: {
    directory: &#39;./migrations&#39;,
  },
  seeds: {
    directory: &#39;./seeds&#39;,
  },
};
/** this will be used, it has precedence over named export */
export default config;
/** Named exports, will be used if you didn&#39;t provide a default export */
export const { client, connection, migrations, seeds } = config;
</code></pre><p>Seed and migration files need to follow Knex conventions</p><pre><code>// file: seed.js
/** 
 * Same as with the CommonJS modules
 * You will need to export a &quot;seed&quot; named function.
 * */
export function seed(next) {
  // ... seed logic here
}

// file: migration.js
/** 
 * Same as the CommonJS version, the miration file should export 
 * &quot;up&quot; and &quot;down&quot; named functions
 */
export function up(knex) {
  // ... migration logic here
}
export function down(knex) {
// ... migration logic here
}
</code></pre><h3 id="seed-api" tabindex="-1">Seed API <a class="header-anchor" href="#seed-api" aria-hidden="true">#</a></h3><p><code>knex.seed</code> is the class utilized by the knex seed CLI.</p><p>Each method takes an optional <code>config</code> object, which may specify the following properties:</p><ul><li><code>directory</code>: a relative path to the directory containing the seed files. Can be an array of paths (default <code>./seeds</code>)</li><li><code>loadExtensions</code>: array of file extensions which knex will treat as seeds. For example, if you have typescript transpiled into javascript in the same folder, you want to execute only javascript seeds. In this case, set <code>loadExtensions</code> to <code>[&#39;.js&#39;]</code> (Notice the dot!) (default <code>[&#39;.co&#39;, &#39;.coffee&#39;, &#39;.eg&#39;, &#39;.iced&#39;, &#39;.js&#39;, &#39;.litcoffee&#39;, &#39;.ls&#39;, &#39;.ts&#39;]</code>)</li><li><code>recursive</code>: if true, will find seed files recursively in the directory / directories specified</li><li><code>specific</code>: a specific seed file or an array of seed files to run from the seeds directory, if its value is <code>undefined</code> it will run all the seeds (default <code>undefined</code>). If an array is specified, seed files will be run in the same order as the array</li><li><code>sortDirsSeparately</code>: if true and multiple directories are specified, all seeds from a single directory will be executed before executing seeds in the next folder (default <code>false</code>)</li><li><code>seedSource</code>: specify a custom seed source, see <a href="#custom-seed-sources">Custom Seed Source</a> for more info (default filesystem)</li><li><code>extension</code>: extension to be used for newly generated seeds (default <code>js</code>)</li><li><code>timestampFilenamePrefix</code>: whether timestamp should be added as a prefix for newly generated seeds (default <code>false</code>)</li></ul><h4 id="methods" tabindex="-1">Methods <a class="header-anchor" href="#methods" aria-hidden="true">#</a></h4><h2 id="make-1" tabindex="-1">make <a class="header-anchor" href="#make-1" aria-hidden="true">#</a></h2><p><strong>knex.seed.make(name, [config])</strong></p><p>Creates a new seed file, with the name of the seed file being added. If the seed directory config is an array of paths, the seed file will be generated in the latest specified.</p><h2 id="run" tabindex="-1">run <a class="header-anchor" href="#run" aria-hidden="true">#</a></h2><p><strong>knex.seed.run([config])</strong></p><p>Runs all seed files for the current environment.</p><h3 id="custom-seed-sources" tabindex="-1">Custom seed sources <a class="header-anchor" href="#custom-seed-sources" aria-hidden="true">#</a></h3><p>Knex supports custom seed sources, allowing you full control of where your seeds come from. This can be useful for custom folder structures, when bundling with webpack/browserify and other scenarios.</p><pre><code>// Create a custom seed source class
class MySeedSource {
  // Must return a Promise containing a list of seeds. 
  // Seeds can be whatever you want, they will be passed as
  // arguments to getSeed
  getSeeds() {
    // In this example we are just returning seed names
    return Promise.resolve([&#39;seed1&#39;])
  }

  getSeed(seed) {
    switch(seed) {
      case &#39;seed1&#39;:
        return (knex) =&gt; { /* ... */ }
    }
  }
}

// pass an instance of your seed source as knex config
knex.seed.run({ seedSource: new MySeedSource() })
</code></pre>`,104),r=[a];function s(d,c,l,u,h,p){return t(),n("div",null,r)}var g=e(i,[["render",s]]);export{f as __pageData,g as default};
