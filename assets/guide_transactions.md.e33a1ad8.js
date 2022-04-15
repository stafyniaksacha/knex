import{_ as n,c as a,o as s,a as t}from"./app.553ae145.js";const h='{"title":"Transactions","description":"","frontmatter":{},"headers":[],"relativePath":"guide/transactions.md"}',o={},e=t(`<h1 id="transactions" tabindex="-1">Transactions <a class="header-anchor" href="#transactions" aria-hidden="true">#</a></h1><p>Transactions are an important feature of relational databases, as they allow correct recovery from failures and keep a database consistent even in cases of system failure. All queries within a transaction are executed on the same database connection, and run the entire set of queries as a single unit of work. Any failure will mean the database will rollback any queries executed on that connection to the pre-transaction state.</p><p>Transactions are handled by passing a handler function into <code>knex.transaction</code>. The handler function accepts a single argument, an object which may be used in two ways:</p><ol><li>As the &quot;promise aware&quot; knex connection</li><li>As an object passed into a query with <a href="#Builder-transacting"></a>and eventually call commit or rollback.</li></ol><p>Consider these two examples:</p><div class="language-js"><pre><code><span class="token comment">// Using trx as a query builder:</span>
knex<span class="token punctuation">.</span><span class="token function">transaction</span><span class="token punctuation">(</span><span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">trx</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>

  <span class="token keyword">const</span> books <span class="token operator">=</span> <span class="token punctuation">[</span>
    <span class="token punctuation">{</span><span class="token literal-property property">title</span><span class="token operator">:</span> <span class="token string">&#39;Canterbury Tales&#39;</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">{</span><span class="token literal-property property">title</span><span class="token operator">:</span> <span class="token string">&#39;Moby Dick&#39;</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">{</span><span class="token literal-property property">title</span><span class="token operator">:</span> <span class="token string">&#39;Hamlet&#39;</span><span class="token punctuation">}</span>
  <span class="token punctuation">]</span><span class="token punctuation">;</span>

  <span class="token keyword">return</span> trx
    <span class="token punctuation">.</span><span class="token function">insert</span><span class="token punctuation">(</span><span class="token punctuation">{</span><span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&#39;Old Books&#39;</span><span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token string">&#39;id&#39;</span><span class="token punctuation">)</span>
    <span class="token punctuation">.</span><span class="token function">into</span><span class="token punctuation">(</span><span class="token string">&#39;catalogues&#39;</span><span class="token punctuation">)</span>
    <span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">ids</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      books<span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">book</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> book<span class="token punctuation">.</span>catalogue_id <span class="token operator">=</span> ids<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token keyword">return</span> <span class="token function">trx</span><span class="token punctuation">(</span><span class="token string">&#39;books&#39;</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">insert</span><span class="token punctuation">(</span>books<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">inserts</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>inserts<span class="token punctuation">.</span>length <span class="token operator">+</span> <span class="token string">&#39; new books saved.&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token punctuation">.</span><span class="token function">catch</span><span class="token punctuation">(</span><span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">error</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">// If we get here, that means that neither the &#39;Old Books&#39; catalogues insert,</span>
  <span class="token comment">// nor any of the books inserts will have taken place.</span>
  console<span class="token punctuation">.</span><span class="token function">error</span><span class="token punctuation">(</span>error<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre></div><p>And then this example:</p><div class="language-js"><pre><code><span class="token comment">// Using trx as a transaction object:</span>
knex<span class="token punctuation">.</span><span class="token function">transaction</span><span class="token punctuation">(</span><span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">trx</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>

  <span class="token keyword">const</span> books <span class="token operator">=</span> <span class="token punctuation">[</span>
    <span class="token punctuation">{</span><span class="token literal-property property">title</span><span class="token operator">:</span> <span class="token string">&#39;Canterbury Tales&#39;</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">{</span><span class="token literal-property property">title</span><span class="token operator">:</span> <span class="token string">&#39;Moby Dick&#39;</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">{</span><span class="token literal-property property">title</span><span class="token operator">:</span> <span class="token string">&#39;Hamlet&#39;</span><span class="token punctuation">}</span>
  <span class="token punctuation">]</span><span class="token punctuation">;</span>

  knex<span class="token punctuation">.</span><span class="token function">insert</span><span class="token punctuation">(</span><span class="token punctuation">{</span><span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&#39;Old Books&#39;</span><span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token string">&#39;id&#39;</span><span class="token punctuation">)</span>
    <span class="token punctuation">.</span><span class="token function">into</span><span class="token punctuation">(</span><span class="token string">&#39;catalogues&#39;</span><span class="token punctuation">)</span>
    <span class="token punctuation">.</span><span class="token function">transacting</span><span class="token punctuation">(</span>trx<span class="token punctuation">)</span>
    <span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">ids</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      books<span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">book</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> book<span class="token punctuation">.</span>catalogue_id <span class="token operator">=</span> ids<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token keyword">return</span> <span class="token function">knex</span><span class="token punctuation">(</span><span class="token string">&#39;books&#39;</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">insert</span><span class="token punctuation">(</span>books<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">transacting</span><span class="token punctuation">(</span>trx<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
    <span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span>trx<span class="token punctuation">.</span>commit<span class="token punctuation">)</span>
    <span class="token punctuation">.</span><span class="token function">catch</span><span class="token punctuation">(</span>trx<span class="token punctuation">.</span>rollback<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">inserts</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>inserts<span class="token punctuation">.</span>length <span class="token operator">+</span> <span class="token string">&#39; new books saved.&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token punctuation">.</span><span class="token function">catch</span><span class="token punctuation">(</span><span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">error</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">// If we get here, that means that neither the &#39;Old Books&#39; catalogues insert,</span>
  <span class="token comment">// nor any of the books inserts will have taken place.</span>
  console<span class="token punctuation">.</span><span class="token function">error</span><span class="token punctuation">(</span>error<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre></div><p>Same example as above using await/async:</p><div class="language-mjs"><pre><code>try {
  await knex.transaction(async trx =&gt; {

    const books = [
      {title: &#39;Canterbury Tales&#39;},
      {title: &#39;Moby Dick&#39;},
      {title: &#39;Hamlet&#39;}
    ];
    
    const ids = await trx(&#39;catalogues&#39;)
      .insert({
        name: &#39;Old Books&#39;
      }, &#39;id&#39;)

    books.forEach((book) =&gt; book.catalogue_id = ids[0])
    const inserts = await trx(&#39;books&#39;).insert(books)
    
    console.log(inserts.length + &#39; new books saved.&#39;)
  })
} catch (error) {
  // If we get here, that means that neither the &#39;Old Books&#39; catalogues insert,
  // nor any of the books inserts will have taken place.
  console.error(error);
}
</code></pre></div><p>Same example as above using another await/async approach:</p><div class="language-mjs"><pre><code>try {
  await knex.transaction(async trx =&gt; {

    const books = [
      {title: &#39;Canterbury Tales&#39;},
      {title: &#39;Moby Dick&#39;},
      {title: &#39;Hamlet&#39;}
    ];

    const ids = await knex(&#39;catalogues&#39;)
      .insert({
        name: &#39;Old Books&#39;
      }, &#39;id&#39;)
      .transacting(trx)

    books.forEach(book =&gt; book.catalogue_id = ids[0])
    await knex(&#39;books&#39;)
      .insert(books)
      .transacting(trx)

    console.log(inserts.length + &#39; new books saved.&#39;)
  })
} catch (error) {
  console.error(error);
}
</code></pre></div><p>Throwing an error directly from the transaction handler function automatically rolls back the transaction, same as returning a rejected promise.</p><p>Notice that if a promise is not returned within the handler, it is up to you to ensure <code>trx.commit</code>, or <code>trx.rollback</code> are called, otherwise the transaction connection will hang.</p><p>Calling <code>trx.rollback</code> will return a rejected Promise. If you don&#39;t pass any argument to <code>trx.rollback</code>, a generic <code>Error</code> object will be created and passed in to ensure the Promise always rejects with something.</p><p>Note that Amazon Redshift does not support savepoints in transactions.</p><p>In some cases you may prefer to create transaction but only execute statements in it later. In such case call method <code>transaction</code> without a handler function:</p><div class="language-mjs"><pre><code>// Using trx as a transaction object:
const trx = await knex.transaction();

const books = [
  {title: &#39;Canterbury Tales&#39;},
  {title: &#39;Moby Dick&#39;},
  {title: &#39;Hamlet&#39;}
];

trx(&#39;catalogues&#39;)
  .insert({name: &#39;Old Books&#39;}, &#39;id&#39;)
  .then(function(ids) {
    books.forEach((book) =&gt; book.catalogue_id = ids[0]);
    return trx(&#39;books&#39;).insert(books);
  })
  .then(trx.commit)
  .catch(trx.rollback);
</code></pre></div><p>If you want to create a reusable transaction instance, but do not want to actually start it until it is used, you can create a transaction provider instance. It will start transaction after being called for the first time, and return same transaction on subsequent calls:</p><div class="language-mjs"><pre><code>// Does not start a transaction yet
const trxProvider = knex.transactionProvider();

const books = [
  {title: &#39;Canterbury Tales&#39;},
  {title: &#39;Moby Dick&#39;},
  {title: &#39;Hamlet&#39;}
];

// Starts a transaction
const trx = await trxProvider();
const ids = await trx(&#39;catalogues&#39;)
  .insert({name: &#39;Old Books&#39;}, &#39;id&#39;)
books.forEach((book) =&gt; book.catalogue_id = ids[0]);
await  trx(&#39;books&#39;).insert(books);

// Reuses same transaction
const sameTrx = await trxProvider();
const ids2 = await sameTrx(&#39;catalogues&#39;)
  .insert({name: &#39;New Books&#39;}, &#39;id&#39;)
books.forEach((book) =&gt; book.catalogue_id = ids2[0]);
await sameTrx(&#39;books&#39;).insert(books);
</code></pre></div><p>You can access the promise that gets resolved after transaction is rolled back explicitly by user or committed, or rejected if it gets rolled back by DB itself, when using either way of creating transaction, from field <code>executionPromise</code>:</p><div class="language-mjs"><pre><code>const trxProvider = knex.transactionProvider();
const trx = await trxProvider();
const trxPromise = trx.executionPromise;

const trx2 = await knex.transaction();
const trx2Promise = trx2.executionPromise;

const trxInitPromise = new Promise(async (resolve, reject) =&gt; {
  knex.transaction((transaction) =&gt; {
    resolve(transaction);
  });
});
const trx3 = await trxInitPromise;
const trx3Promise = trx3.executionPromise;
</code></pre></div><p>You can check if a transaction has been committed or rolled back with the method <code>isCompleted</code>:</p><div class="language-mjs"><pre><code>const trx = await knex.transaction();
trx.isCompleted(); // false
await trx.commit();
trx.isCompleted(); // true

const trx2 = knex.transactionProvider();
await trx2.rollback();
trx2.isCompleted(); // true
</code></pre></div><p>You can check the property <code>knex.isTransaction</code> to see if the current knex instance you are working with is a transaction.</p><p>In case you need to specify an isolation level for your transaction, you can use a config parameter <code>isolationLevel</code>. Not supported by oracle and sqlite, options are <code>read uncommitted</code>, <code>read committed</code>, <code>repeatable read</code>, <code>snapshot</code> (mssql only), <code>serializable</code>.</p><div class="language-mjs"><pre><code>// Simple read skew example
const isolationLevel = &#39;read committed&#39;;
const trx = await knex.transaction({isolationLevel});
const result1 = await trx(tableName).select();
await knex(tableName).insert({ id: 1, value: 1 });
const result2 = await trx(tableName).select();
await trx.commit();
// result1 may or may not deep equal result2 depending on isolation level
</code></pre></div>`,27),p=[e];function c(i,r,l,u,k,d){return s(),a("div",null,p)}var b=n(o,[["render",c]]);export{h as __pageData,b as default};
