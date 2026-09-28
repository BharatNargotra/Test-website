import React from "react";
import { BrowserRouter, Routes, Route, Link, useParams } from "react-router-dom";
import { pages } from "./data";
import "./styles.css";

const nav = pages.slice(0, 8);

function Layout({ children }) {
  return (
    <div className="site">
      <header>
        <div className="container nav">
          <Link className="logo" to="/">Caira AI Knowledge Base</Link>
          <nav>
            <Link to="/">Home</Link>
            <Link to="/ai-overview">AI Overview</Link>
            <Link to="/generative-ai">Generative AI</Link>
            <Link to="/rag">RAG</Link>
            <Link to="/ai-agents">AI Agents</Link>
          </nav>
        </div>
      </header>
      {children}
      <footer>
        <div className="container footer-grid">
          <div><strong>Caira AI Knowledge Base</strong><p>Large crawlable demo site for search, retrieval, citations, and highlighting tests.</p></div>
          <div><strong>Topics</strong>{nav.slice(0,4).map(p => <Link key={p.slug} to={"/"+p.slug}>{p.title}</Link>)}</div>
          <div><strong>Testing</strong><a href="/sitemap.xml">Sitemap</a><a href="/robots.txt">Robots.txt</a></div>
        </div>
      </footer>
    </div>
  );
}

function Home() {
  return <Layout>
    <main>
      <section className="hero">
        <div className="container">
          <span className="badge">AI RESEARCH & ENGINEERING</span>
          <h1>Artificial Intelligence<br/><span>Knowledge Base</span></h1>
          <p>Explore a large collection of interconnected AI topics designed for testing semantic search, crawling, source citations, and exact passage highlighting.</p>
          <div className="hero-actions">
            <Link className="button" to="/ai-overview">Start exploring</Link>
            <a className="button secondary" href="/sitemap.xml">View sitemap</a>
          </div>
        </div>
      </section>
      <section className="container section">
        <div className="section-head"><div><span className="eyebrow">KNOWLEDGE LIBRARY</span><h2>AI topics</h2></div><span className="count">{pages.length} pages</span></div>
        <div className="grid">{pages.map((p, i) =>
          <Link className="card" key={p.slug} to={"/"+p.slug}>
            <span className="number">{String(i+1).padStart(2,"0")}</span>
            <h3>{p.title}</h3><p>{p.description}</p><span className="read">Read topic →</span>
          </Link>
        )}</div>
      </section>
      <section className="container section">
        <div className="callout"><div><span className="eyebrow">SEARCH TEST DATA</span><h2>Built for retrieval testing</h2><p>Try exact terms such as “RRF”, “HNSW”, “transformer attention”, “intent classification”, “embedding dimensions”, “agent memory”, “hallucination”, and “vector similarity”.</p></div><div className="chips">{["RRF","HNSW","transformer attention","embeddings","hallucination","agent memory","semantic search","evaluation"].map(x=><span key={x}>{x}</span>)}</div></div>
      </section>
    </main>
  </Layout>;
}

function Topic() {
  const { slug } = useParams();
  const p = pages.find(x => x.slug === slug);
  if (!p) return <Layout><main className="container section"><h1>Page not found</h1></main></Layout>;

  const related = pages.filter(x => x.slug !== slug).slice((pages.findIndex(x=>x.slug===slug)+1)%pages.length, (pages.findIndex(x=>x.slug===slug)+4)%pages.length || undefined);

  return <Layout>
    <main className="container article-layout">
      <article className="article">
        <div className="breadcrumbs"><Link to="/">Home</Link> / {p.title}</div>
        <span className="eyebrow">AI KNOWLEDGE BASE</span>
        <h1>{p.title}</h1>
        <p className="lead">{p.description}</p>
        {p.sections.map((section, i) =>
          <section key={section} id={"section-"+(i+1)}>
            <h2>{section}</h2>
            <p>{section} is best understood as part of a larger engineering workflow. Teams typically begin by defining the task, collecting representative data, choosing an architecture, and creating an evaluation set that reflects real user behavior.</p>
            <p>In practical systems, <strong>{p.title}</strong> interacts with data pipelines, APIs, databases, observability, and application interfaces. Performance depends on both model quality and the surrounding system. Latency, context size, indexing strategy, failure handling, and user feedback all influence the final experience.</p>
            <p>For example, a production pipeline may normalize incoming records, split documents into chunks, generate embeddings, retrieve candidates, rerank them, and then pass the selected context to a generation model. Each stage creates useful diagnostic signals for debugging search quality.</p>
            {i === 2 && <div className="quote"><strong>Engineering note:</strong> Retrieval quality should be evaluated separately from generation quality. A strong generator cannot reliably answer a question when the correct source material was never retrieved.</div>}
          </section>
        )}
        <section>
          <h2>Frequently asked questions</h2>
          <h3>What data is useful for this topic?</h3>
          <p>Representative documents, structured metadata, examples of successful queries, and difficult edge cases are useful. Stable URLs and descriptive headings make the material easier for both humans and search systems to navigate.</p>
          <h3>How should it be evaluated?</h3>
          <p>Use a mixture of exact-match questions, paraphrases, multi-hop questions, ambiguous queries, and questions where the correct response is that the available information is insufficient.</p>
          <h3>What can go wrong?</h3>
          <p>Common problems include stale data, duplicate content, poor chunk boundaries, incorrect metadata, missing links, irrelevant retrieval, and generated answers that are more specific than the available evidence.</p>
        </section>
      </article>
      <aside>
        <div className="toc"><strong>On this page</strong>{p.sections.map((s,i)=><a key={s} href={"#section-"+(i+1)}>{i+1}. {s}</a>)}</div>
        <div className="side-card"><strong>Related topics</strong>{pages.filter(x=>x.slug!==slug).slice(0,7).map(x=><Link key={x.slug} to={"/"+x.slug}>{x.title} →</Link>)}</div>
      </aside>
    </main>
  </Layout>;
}

function App() {
  return <Routes><Route path="/" element={<Home/>}/>{pages.map(p=><Route key={p.slug} path={"/"+p.slug} element={<Topic/>}/>)}</Routes>;
}

export default function Root() {
  return <BrowserRouter><App/></BrowserRouter>;
}
