import{_ as e,c as i,o as a,a as n}from"./app.eb3a0253.js";const u='{"title":"Migrations","description":"","frontmatter":{},"headers":[{"level":2,"title":"Migration CLI","slug":"migration-cli"}],"relativePath":"guide/migrations.md"}',t={},o=n(`<h1 id="migrations" tabindex="-1">Migrations <a class="header-anchor" href="#migrations" aria-hidden="true">#</a></h1><p>Migrations allow for you to define sets of schema changes so upgrading a database is a breeze.</p><h2 id="migration-cli" tabindex="-1">Migration CLI <a class="header-anchor" href="#migration-cli" aria-hidden="true">#</a></h2><p>The migration CLI is bundled with the knex install, and is driven by the <a href="https://github.com/tkellen/node-liftoff" target="_blank" rel="noopener noreferrer">node-liftoff</a> module. To install globally, run:</p><div class="language-bash"><pre><code>$ <span class="token function">npm</span> <span class="token function">install</span> knex -g
</code></pre></div><p>The migration CLI accepts the following general command-line options. You can view help text and additional options for each command using <code>--help</code>. E.g. <code>knex migrate:latest --help</code>.</p><ul><li><code>--debug</code>: Run with debugging</li><li><code>--knexfile [path]</code>: Specify the knexfile path</li><li><code>--knexpath [path]</code>: Specify the path to the knex instance</li><li><code>--cwd [path]</code>: Specify the working directory</li><li><code>--client [name]</code>: Set the DB client</li><li><code>--connection [address]</code>: Set the DB connection</li><li><code>--migrations-table-name</code>: Set the migration table name</li><li><code>--migrations-directory</code>: Set the migrations directory</li><li><code>--env</code>: environment, default: <code>process.<wbr>env.NODE\\_ENV || development</code></li><li><code>--esm</code>: <a href="#esm-interop">Enables ESM module interoperability</a></li><li><code>--help</code>: Display help text for a particular command and exit.</li></ul><p>Migrations use a <strong>knexfile</strong>, which specify various configuration settings for the module. To create a new knexfile, run the following:</p><div class="language-bash"><pre><code>$ knex init

<span class="token comment"># or for .ts</span>

$ knex init -x ts
</code></pre></div><p>will create a sample knexfile.js - the file which contains our various database configurations. Once you have a knexfile.js, you can use the migration tool to create migration files to the specified directory (default migrations). Creating new migration files can be achieved by running:</p><div class="language-bash"><pre><code>$ knex migrate:make migration_name 

<span class="token comment"># or for .ts</span>

$ knex migrate:make migration_name -x ts
</code></pre></div><ul><li>you can also create your migration using a specific stub file, this serves as a migration template to speed up development for common migration operations</li><li>if the --stub option is not passed, the CLI will use either the knex default stub for the chosen extension, or the config.stub file</li></ul><div class="language-bash"><pre><code>$ knex migrate:make --stub 

<span class="token comment"># or</span>

$ knex migrate:make --stub 
</code></pre></div><ul><li>if a stub path is provided, it must be relative to the knexfile.[js, ts, etc] location</li><li>if a is used, the stub is selected by its file name. The CLI will look for this file in the config.migrations.directory folder. If the config.migrations.directory is not defined, this operation will fail</li></ul><p>Once you have finished writing the migrations, you can update the database matching your <code>NODE_ENV</code> by running:</p><div class="language-bash"><pre><code>$ knex migrate:latest
</code></pre></div><p>You can also pass the <code>--env</code> flag or set <code>NODE_ENV</code> to select an alternative environment:</p><div class="language-bash"><pre><code>$ knex migrate:latest --env production

<span class="token comment"># or</span>

$ <span class="token assign-left variable">NODE_ENV</span><span class="token operator">=</span>production knex migrate:latest
</code></pre></div><p>To rollback the last batch of migrations:</p><div class="language-bash"><pre><code>$ knex migrate:rollback
</code></pre></div><p>To rollback all the completed migrations:</p><div class="language-bash"><pre><code>$ knex migrate:rollback --all
</code></pre></div><p>To run the next migration that has not yet been run</p><div class="language-bash"><pre><code>$ knex migrate:up
</code></pre></div><p>To run the specified migration that has not yet been run</p><div class="language-bash"><pre><code>$ knex migrate:up 001_migration_name.js
</code></pre></div><p>To undo the last migration that was run</p><div class="language-bash"><pre><code>$ knex migrate:down
</code></pre></div><p>To undo the specified migration that was run</p><div class="language-bash"><pre><code>$ knex migrate:down 001_migration_name.js
</code></pre></div><p>To list both completed and pending migrations:</p><div class="language-bash"><pre><code>$ knex migrate:list
</code></pre></div>`,32),s=[o];function r(l,c,d,p,g,h){return a(),i("div",null,s)}var f=e(t,[["render",r]]);export{u as __pageData,f as default};
