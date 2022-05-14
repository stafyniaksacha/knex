import{_ as n,c as s,o as a,a as t}from"./app.6a99e5a5.js";const h='{"title":"Raw","description":"","frontmatter":{},"headers":[{"level":2,"title":"Raw Parameter Binding","slug":"raw-parameter-binding"},{"level":2,"title":"Raw Expressions","slug":"raw-expressions"},{"level":2,"title":"Raw Queries","slug":"raw-queries"},{"level":2,"title":"Wrapped Queries","slug":"wrapped-queries"}],"relativePath":"guide/raw.md"}',p={},e=t(`<h1 id="raw" tabindex="-1">Raw <a class="header-anchor" href="#raw" aria-hidden="true">#</a></h1><p>Sometimes you may need to use a raw expression in a query. Raw query object may be injected pretty much anywhere you want, and using proper bindings can ensure your values are escaped properly, preventing SQL-injection attacks.</p><h2 id="raw-parameter-binding" tabindex="-1">Raw Parameter Binding <a class="header-anchor" href="#raw-parameter-binding" aria-hidden="true">#</a></h2><p>One can paramterize sql given to <code>knex.raw(sql, bindings)</code>. Parameters can be positional named. One can also choose if parameter should be treated as value or as sql identifier e.g. in case of <code>&#39;TableName.ColumnName&#39;</code> reference.</p><div class="language-js"><pre><code><span class="token function">knex</span><span class="token punctuation">(</span><span class="token string">&#39;users&#39;</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">select</span><span class="token punctuation">(</span>knex<span class="token punctuation">.</span><span class="token function">raw</span><span class="token punctuation">(</span><span class="token string">&#39;count(*) as user_count, status&#39;</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">where</span><span class="token punctuation">(</span>knex<span class="token punctuation">.</span><span class="token function">raw</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">orWhere</span><span class="token punctuation">(</span>knex<span class="token punctuation">.</span><span class="token function">raw</span><span class="token punctuation">(</span><span class="token string">&#39;status &lt;&gt; ?&#39;</span><span class="token punctuation">,</span> <span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">groupBy</span><span class="token punctuation">(</span><span class="token string">&#39;status&#39;</span><span class="token punctuation">)</span>
</code></pre></div><p>Positional bindings <code>?</code> are interpreted as values and <code>??</code> are interpreted as identifiers.</p><div class="language-js"><pre><code><span class="token function">knex</span><span class="token punctuation">(</span><span class="token string">&#39;users&#39;</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">where</span><span class="token punctuation">(</span>knex<span class="token punctuation">.</span><span class="token function">raw</span><span class="token punctuation">(</span><span class="token string">&#39;?? = ?&#39;</span><span class="token punctuation">,</span> <span class="token punctuation">[</span><span class="token string">&#39;user.name&#39;</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
</code></pre></div><p>Named bindings such as <code>:name</code> are interpreted as values and <code>:name:</code> interpreted as identifiers. Named bindings are processed so long as the value is anything other than <code>undefined</code>.</p><div class="language-js"><pre><code><span class="token keyword">const</span> raw <span class="token operator">=</span> <span class="token string">&#39;:name: = :thisGuy or :name: = :otherGuy or :name: = :undefinedBinding&#39;</span>

<span class="token function">knex</span><span class="token punctuation">(</span><span class="token string">&#39;users&#39;</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">where</span><span class="token punctuation">(</span>
    knex<span class="token punctuation">.</span><span class="token function">raw</span><span class="token punctuation">(</span>raw<span class="token punctuation">,</span> <span class="token punctuation">{</span>
      <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&#39;users.name&#39;</span><span class="token punctuation">,</span>
      <span class="token literal-property property">thisGuy</span><span class="token operator">:</span> <span class="token string">&#39;Bob&#39;</span><span class="token punctuation">,</span>
      <span class="token literal-property property">otherGuy</span><span class="token operator">:</span> <span class="token string">&#39;Jay&#39;</span><span class="token punctuation">,</span>
      <span class="token literal-property property">undefinedBinding</span><span class="token operator">:</span> <span class="token keyword">undefined</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
</code></pre></div><p>For simpler queries where one only has a single binding, <code>.raw</code> can accept said binding as its second parameter.</p><div class="language-js"><pre><code><span class="token function">knex</span><span class="token punctuation">(</span><span class="token string">&#39;users&#39;</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">where</span><span class="token punctuation">(</span>
    knex<span class="token punctuation">.</span><span class="token function">raw</span><span class="token punctuation">(</span><span class="token string">&#39;LOWER(&quot;login&quot;) = ?&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;knex&#39;</span><span class="token punctuation">)</span>
  <span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">orWhere</span><span class="token punctuation">(</span>
    knex<span class="token punctuation">.</span><span class="token function">raw</span><span class="token punctuation">(</span><span class="token string">&#39;accesslevel = ?&#39;</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">)</span>
  <span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">orWhere</span><span class="token punctuation">(</span>
    knex<span class="token punctuation">.</span><span class="token function">raw</span><span class="token punctuation">(</span><span class="token string">&#39;updtime = ?&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;01-01-2016&#39;</span><span class="token punctuation">)</span>
  <span class="token punctuation">)</span>
</code></pre></div><p>Since there is no unified syntax for array bindings, instead you need to treat them as multiple values by adding <code>?</code> directly in your query.</p><div class="language-js"><pre><code><span class="token keyword">const</span> myArray <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span><span class="token number">2</span><span class="token punctuation">,</span><span class="token number">3</span><span class="token punctuation">]</span>
knex<span class="token punctuation">.</span><span class="token function">raw</span><span class="token punctuation">(</span><span class="token string">&#39;select * from users where id in (&#39;</span> <span class="token operator">+</span> myArray<span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span><span class="token parameter">_</span> <span class="token operator">=&gt;</span> <span class="token string">&#39;?&#39;</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">join</span><span class="token punctuation">(</span><span class="token string">&#39;,&#39;</span><span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token string">&#39;)&#39;</span><span class="token punctuation">,</span> <span class="token punctuation">[</span><span class="token operator">...</span>myArray<span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

</code></pre></div><p>query will become:</p><div class="language-sql"><pre><code><span class="token keyword">select</span> <span class="token operator">*</span> <span class="token keyword">from</span> users <span class="token keyword">where</span> id <span class="token operator">in</span> <span class="token punctuation">(</span>?<span class="token punctuation">,</span> ?<span class="token punctuation">,</span> ?<span class="token punctuation">)</span> <span class="token comment">/* with bindings [1,2,3] */</span>
</code></pre></div><p>To prevent replacement of <code>?</code> one can use the escape sequence <code>\\\\?</code>.</p><div class="language-js"><pre><code>knex<span class="token punctuation">.</span><span class="token function">select</span><span class="token punctuation">(</span><span class="token string">&#39;*&#39;</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">from</span><span class="token punctuation">(</span><span class="token string">&#39;users&#39;</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">where</span><span class="token punctuation">(</span><span class="token string">&#39;id&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;=&#39;</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">whereRaw</span><span class="token punctuation">(</span><span class="token string">&#39;?? \\\\? ?&#39;</span><span class="token punctuation">,</span> <span class="token punctuation">[</span><span class="token string">&#39;jsonColumn&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;jsonKey&#39;</span><span class="token punctuation">]</span><span class="token punctuation">)</span>
</code></pre></div><p>To prevent replacement of named bindings one can use the escape sequence <code>\\\\:</code>.</p><div class="language-js"><pre><code>knex<span class="token punctuation">.</span><span class="token function">select</span><span class="token punctuation">(</span><span class="token string">&#39;*&#39;</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">from</span><span class="token punctuation">(</span><span class="token string">&#39;users&#39;</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">whereRaw</span><span class="token punctuation">(</span><span class="token string">&quot;:property: = &#39;\\\\:value&#39; OR \\\\:property: = :value&quot;</span><span class="token punctuation">,</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">property</span><span class="token operator">:</span> <span class="token string">&#39;name&#39;</span><span class="token punctuation">,</span>
    <span class="token literal-property property">value</span><span class="token operator">:</span> <span class="token string">&#39;Bob&#39;</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre></div><h2 id="raw-expressions" tabindex="-1">Raw Expressions <a class="header-anchor" href="#raw-expressions" aria-hidden="true">#</a></h2><p>Raw expressions are created by using <code>knex.raw(sql, [bindings])</code> and passing this as a value for any value in the query chain.</p><div class="language-js"><pre><code><span class="token function">knex</span><span class="token punctuation">(</span><span class="token string">&#39;users&#39;</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">select</span><span class="token punctuation">(</span>knex<span class="token punctuation">.</span><span class="token function">raw</span><span class="token punctuation">(</span><span class="token string">&#39;count(*) as user_count, status&#39;</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">where</span><span class="token punctuation">(</span>knex<span class="token punctuation">.</span><span class="token function">raw</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">orWhere</span><span class="token punctuation">(</span>knex<span class="token punctuation">.</span><span class="token function">raw</span><span class="token punctuation">(</span><span class="token string">&#39;status &lt;&gt; ?&#39;</span><span class="token punctuation">,</span> <span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">groupBy</span><span class="token punctuation">(</span><span class="token string">&#39;status&#39;</span><span class="token punctuation">)</span>
</code></pre></div><h2 id="raw-queries" tabindex="-1">Raw Queries <a class="header-anchor" href="#raw-queries" aria-hidden="true">#</a></h2><p>The <code>knex.raw</code> may also be used to build a full query and execute it, as a standard query builder query would be executed. The benefit of this is that it uses the connection pool and provides a standard interface for the different client libraries.</p><div class="language-js"><pre><code>knex<span class="token punctuation">.</span><span class="token function">raw</span><span class="token punctuation">(</span><span class="token string">&#39;select * from users where id = ?&#39;</span><span class="token punctuation">,</span> <span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">resp</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token comment">/*...*/</span> <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre></div><p>Note that the response will be whatever the underlying sql library would typically return on a normal query, so you may need to look at the documentation for the base library the queries are executing against to determine how to handle the response.</p><h2 id="wrapped-queries" tabindex="-1">Wrapped Queries <a class="header-anchor" href="#wrapped-queries" aria-hidden="true">#</a></h2><p>The raw query builder also comes with a <code>wrap</code> method, which allows wrapping the query in a value:</p><div class="language-js"><pre><code><span class="token keyword">const</span> subcolumn <span class="token operator">=</span> knex<span class="token punctuation">.</span><span class="token function">raw</span><span class="token punctuation">(</span>
    <span class="token string">&#39;select avg(salary) from employee where dept_no = e.dept_no&#39;</span>
  <span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">wrap</span><span class="token punctuation">(</span><span class="token string">&#39;(&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;) avg_sal_dept&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

knex<span class="token punctuation">.</span><span class="token function">select</span><span class="token punctuation">(</span><span class="token string">&#39;e.lastname&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;e.salary&#39;</span><span class="token punctuation">,</span> subcolumn<span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">from</span><span class="token punctuation">(</span><span class="token string">&#39;employee as e&#39;</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">whereRaw</span><span class="token punctuation">(</span><span class="token string">&#39;dept_no = e.dept_no&#39;</span><span class="token punctuation">)</span>
</code></pre></div><p>Note that the example above be achieved more easily using the <a href="#Builder-as">as</a> method.</p><div class="language-js"><pre><code><span class="token keyword">const</span> subcolumn <span class="token operator">=</span> knex<span class="token punctuation">.</span><span class="token function">avg</span><span class="token punctuation">(</span><span class="token string">&#39;salary&#39;</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">from</span><span class="token punctuation">(</span><span class="token string">&#39;employee&#39;</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">whereRaw</span><span class="token punctuation">(</span><span class="token string">&#39;dept_no = e.dept_no&#39;</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">as</span><span class="token punctuation">(</span><span class="token string">&#39;avg_sal_dept&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

knex<span class="token punctuation">.</span><span class="token function">select</span><span class="token punctuation">(</span><span class="token string">&#39;e.lastname&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;e.salary&#39;</span><span class="token punctuation">,</span> subcolumn<span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">from</span><span class="token punctuation">(</span><span class="token string">&#39;employee as e&#39;</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">whereRaw</span><span class="token punctuation">(</span><span class="token string">&#39;dept_no = e.dept_no&#39;</span><span class="token punctuation">)</span>
</code></pre></div>`,31),o=[e];function c(u,i,l,r,k,d){return a(),s("div",null,o)}var f=n(p,[["render",c]]);export{h as __pageData,f as default};