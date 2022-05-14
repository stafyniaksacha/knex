import{_ as o,c as p,b as s,t as d,d as e,w as t,a as l,e as n,r as u,o as i}from"./app.a1d2d01c.js";const z='{"title":"Ref","description":"","frontmatter":{},"headers":[{"level":2,"title":"Usage","slug":"usage"},{"level":3,"title":"withSchema","slug":"withschema"},{"level":3,"title":"alias","slug":"alias"}],"relativePath":"guide/ref.md"}',r={},k=l(`<h1 id="ref" tabindex="-1">Ref <a class="header-anchor" href="#ref" aria-hidden="true">#</a></h1><p>Can be used to create references in a query, such as column- or tablenames. This is a good and shorter alternative to using <code>knex.raw(&#39;??&#39;, &#39;tableName.columName&#39;)</code> which essentially does the same thing.</p><h2 id="usage" tabindex="-1">Usage <a class="header-anchor" href="#usage" aria-hidden="true">#</a></h2><p><code>knex.ref</code> can be used essentially anywhere in a build-chain. Here is an example:</p><div class="language-js"><pre><code><span class="token function">knex</span><span class="token punctuation">(</span>knex<span class="token punctuation">.</span><span class="token function">ref</span><span class="token punctuation">(</span><span class="token string">&#39;Users&#39;</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">withSchema</span><span class="token punctuation">(</span><span class="token string">&#39;TenantId&#39;</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">where</span><span class="token punctuation">(</span>knex<span class="token punctuation">.</span><span class="token function">ref</span><span class="token punctuation">(</span><span class="token string">&#39;Id&#39;</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">orWhere</span><span class="token punctuation">(</span>knex<span class="token punctuation">.</span><span class="token function">ref</span><span class="token punctuation">(</span><span class="token string">&#39;Name&#39;</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token string">&#39;Admin&#39;</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">select</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token string">&#39;Id&#39;</span><span class="token punctuation">,</span> knex<span class="token punctuation">.</span><span class="token function">ref</span><span class="token punctuation">(</span><span class="token string">&#39;Name&#39;</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">as</span><span class="token punctuation">(</span><span class="token string">&#39;Username&#39;</span><span class="token punctuation">)</span><span class="token punctuation">]</span><span class="token punctuation">)</span>
</code></pre></div>`,5),m=n("$dialect: "),h=s("div",{class:"language-sql","data-dialect":"better-sqlite3"},[s("pre",null,[s("code",null,[n("select "),s("code",null,"Id"),n(", "),s("code",null,"Name"),n(" as "),s("code",null,"Username"),n(" from "),s("code",null,"TenantId"),n("."),s("code",null,"Users"),n(" where "),s("code",null,"Id"),n(" = 1 or "),s("code",null,"Name"),n(" = 'Admin'")])])],-1),_=s("div",{class:"language-sql","data-dialect":"cockroachdb"},[s("pre",null,[s("code",null,`select "Id", "Name" as "Username" from "TenantId"."Users" where "Id" = 1 or "Name" = 'Admin'`)])],-1),g=s("div",{class:"language-sql","data-dialect":"mssql"},[s("pre",null,[s("code",null,"select [Id], [Name] as [Username] from [TenantId].[Users] where [Id] = 1 or [Name] = 'Admin'")])],-1),f=s("div",{class:"language-sql","data-dialect":"mysql"},[s("pre",null,[s("code",null,[n("select "),s("code",null,"Id"),n(", "),s("code",null,"Name"),n(" as "),s("code",null,"Username"),n(" from "),s("code",null,"TenantId"),n("."),s("code",null,"Users"),n(" where "),s("code",null,"Id"),n(" = 1 or "),s("code",null,"Name"),n(" = 'Admin'")])])],-1),I=s("div",{class:"language-sql","data-dialect":"mysql2"},[s("pre",null,[s("code",null,[n("select "),s("code",null,"Id"),n(", "),s("code",null,"Name"),n(" as "),s("code",null,"Username"),n(" from "),s("code",null,"TenantId"),n("."),s("code",null,"Users"),n(" where "),s("code",null,"Id"),n(" = 1 or "),s("code",null,"Name"),n(" = 'Admin'")])])],-1),U=s("div",{class:"language-sql","data-dialect":"oracledb"},[s("pre",null,[s("code",null,`select "Id", "Name" as "Username" from "TenantId"."Users" where "Id" = 1 or "Name" = 'Admin'`)])],-1),v=s("div",{class:"language-sql","data-dialect":"pgnative"},[s("pre",null,[s("code",null,`select "Id", "Name" as "Username" from "TenantId"."Users" where "Id" = 1 or "Name" = 'Admin'`)])],-1),q=s("div",{class:"language-sql","data-dialect":"postgres"},[s("pre",null,[s("code",null,`select "Id", "Name" as "Username" from "TenantId"."Users" where "Id" = 1 or "Name" = 'Admin'`)])],-1),N=s("div",{class:"language-sql","data-dialect":"redshift"},[s("pre",null,[s("code",null,`select "Id", "Name" as "Username" from "TenantId"."Users" where "Id" = 1 or "Name" = 'Admin'`)])],-1),T=s("div",{class:"language-sql","data-dialect":"sqlite3"},[s("pre",null,[s("code",null,[n("select "),s("code",null,"Id"),n(", "),s("code",null,"Name"),n(" as "),s("code",null,"Username"),n(" from "),s("code",null,"TenantId"),n("."),s("code",null,"Users"),n(" where "),s("code",null,"Id"),n(" = 1 or "),s("code",null,"Name"),n(" = 'Admin'")])])],-1),x=l(`<h3 id="withschema" tabindex="-1">withSchema <a class="header-anchor" href="#withschema" aria-hidden="true">#</a></h3><p>The Ref function supports schema using <code>.withSchema(string)</code>:</p><div class="language-js"><pre><code><span class="token function">knex</span><span class="token punctuation">(</span>knex<span class="token punctuation">.</span><span class="token function">ref</span><span class="token punctuation">(</span><span class="token string">&#39;users&#39;</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">withSchema</span><span class="token punctuation">(</span><span class="token string">&#39;TenantId&#39;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">select</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre></div><h3 id="alias" tabindex="-1">alias <a class="header-anchor" href="#alias" aria-hidden="true">#</a></h3><p>Alias is supported using <code>.alias(string)</code></p><div class="language-js"><pre><code><span class="token function">knex</span><span class="token punctuation">(</span><span class="token string">&#39;users&#39;</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">select</span><span class="token punctuation">(</span>knex<span class="token punctuation">.</span><span class="token function">ref</span><span class="token punctuation">(</span><span class="token string">&#39;Id&#39;</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">as</span><span class="token punctuation">(</span><span class="token string">&#39;UserId&#39;</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
</code></pre></div>`,6),w=s("div",{class:"language-sql","data-dialect":"better-sqlite3"},[s("pre",null,[s("code",null,"select `Id` as `UserId` from `users`")])],-1),A=s("div",{class:"language-sql","data-dialect":"cockroachdb"},[s("pre",null,[s("code",null,'select "Id" as "UserId" from "users"')])],-1),b=s("div",{class:"language-sql","data-dialect":"mssql"},[s("pre",null,[s("code",null,"select [Id] as [UserId] from [users]")])],-1),S=s("div",{class:"language-sql","data-dialect":"mysql"},[s("pre",null,[s("code",null,"select `Id` as `UserId` from `users`")])],-1),y=s("div",{class:"language-sql","data-dialect":"mysql2"},[s("pre",null,[s("code",null,"select `Id` as `UserId` from `users`")])],-1),V=s("div",{class:"language-sql","data-dialect":"oracledb"},[s("pre",null,[s("code",null,'select "Id" as "UserId" from "users"')])],-1),C=s("div",{class:"language-sql","data-dialect":"pgnative"},[s("pre",null,[s("code",null,'select "Id" as "UserId" from "users"')])],-1),$=s("div",{class:"language-sql","data-dialect":"postgres"},[s("pre",null,[s("code",null,'select "Id" as "UserId" from "users"')])],-1),P=s("div",{class:"language-sql","data-dialect":"redshift"},[s("pre",null,[s("code",null,'select "Id" as "UserId" from "users"')])],-1),R=s("div",{class:"language-sql","data-dialect":"sqlite3"},[s("pre",null,[s("code",null,"select `Id` as `UserId` from `users`")])],-1);function D(c,j,B,E,O,W){const a=u("SqlOutput");return i(),p("div",null,[k,s("p",null,[m,s("code",null,d(c.$dialect),1),e(a,{code:`knex(knex.ref('Users').withSchema('TenantId'))
  .where(knex.ref('Id'), 1)
  .orWhere(knex.ref('Name'), 'Admin')
  .select(['Id', knex.ref('Name').as('Username')])`},{default:t(()=>[h,_,g,f,I,U,v,q,N,T]),_:1})]),x,e(a,{code:`knex('users')
  .select(knex.ref('Id').as('UserId'))`},{default:t(()=>[w,A,b,S,y,V,C,$,P,R]),_:1})])}var F=o(r,[["render",D]]);export{z as __pageData,F as default};
