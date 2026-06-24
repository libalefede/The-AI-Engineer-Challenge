<p align = "center" draggable=”false” ><img src="https://github.com/AI-Maker-Space/LLM-Dev-101/assets/37101144/d1343317-fa2f-41e1-8af1-1dbb18399719" 
     width="200px"
     height="auto"/>
</p>


## <h1 align="center" id="heading"> 👋 Welcome to the AI Engineer Challenge</h1>

## 🤖 Your First Vibe Coding LLM Application

> If you are a novice, and need a bit more help to get your dev environment off the ground, check out this [Setup Guide](docs/GIT_SETUP.md). This guide will walk you through the 'git' setup you need to get started.

> For additional context on LLM development environments and API key setup, you can also check out our [Interactive Dev Environment for LLM Development](https://github.com/AI-Maker-Space/Interactive-Dev-Environment-for-AI-Engineers).

In this repository, we'll walk you through the steps to create a LLM (Large Language Model) powered application with a vibe-coded frontend!

Are you ready? Let's get started!

---

## 🛠️ What's Inside (This Build)

This repo ships a **complete, deployable chat app** — not just scaffolding:

| Layer        | Tech                                            | What it does                                              |
| ------------ | ----------------------------------------------- | --------------------------------------------------------- |
| 🧠 Backend   | FastAPI ([`/api/index.py`](api/index.py))       | Streams responses from **Claude** (Anthropic), token-by-token |
| 💬 Frontend  | Next.js 14 + TypeScript + Tailwind (`app/`)     | Streaming chat UI with model picker & custom persona      |
| 🔒 Auth      | Next.js middleware ([`middleware.ts`](middleware.ts)) | Shared-password login gate over every page + the API |
| ☁️ Deploy    | Vercel ([`vercel.json`](vercel.json))           | One project, two runtimes (Node + Python serverless)      |

**Highlights:** live streaming responses · in-session memory · pick your Claude model (`claude-opus-4-8` / `claude-sonnet-4-6` / `claude-haiku-4-5`) · editable system prompt · optional bring-your-own-key (password-masked, never stored) · Markdown rendering · password-gated access.

## 🏃 Quickstart (Local)

Open **two terminals** from the repo root.

**1) Backend** — FastAPI on port 8000:

```bash
uv sync
export ANTHROPIC_API_KEY=sk-ant-your-key-here   # or paste a key in the app's ⚙️ Settings
uv run uvicorn api.index:app --reload
```

**2) Frontend** — Next.js on port 3000:

```bash
npm install
# Optional: turn on the login gate locally (omit it and the app is open)
export APP_PASSWORD=letmein
npm run dev
```

Now open **http://localhost:3000**. In dev, the frontend transparently proxies
`/api/*` to the backend, so everything works from one tab. 🎉

> More detail lives in [`api/README.md`](api/README.md) (backend) and
> [`frontend/README.md`](frontend/README.md) (frontend).

## 🔒 The Login Gate

The whole app — every page **and** the `/api/chat` endpoint — sits behind a
**shared-password gate**, implemented in [`middleware.ts`](middleware.ts):

- Set **`APP_PASSWORD`** and users must enter it at `/login` before they can chat.
- On success, an `httpOnly` cookie holding `sha256(APP_PASSWORD)` is set — the
  password never reaches the browser and the cookie can't be forged.
- **Leave `APP_PASSWORD` unset and the gate is disabled** (handy for local dev).

Want individual user accounts instead of one shared password? Swap the
middleware for [Auth.js](https://authjs.dev/) — the gate is deliberately small.

## 🚀 Deploy to Vercel

The frontend and the Python API deploy together as **one** Vercel project.

1. Push this repo to GitHub (it's already your fork 😉).
2. Import the repo at [vercel.com/new](https://vercel.com/new) — Vercel auto-detects Next.js.
3. Add environment variables:
   - **`ANTHROPIC_API_KEY`** — your Claude key (or let users paste their own in the UI).
   - **`APP_PASSWORD`** — the shared login password (omit to leave the app open).
4. Deploy. `vercel.json` routes `/api/*` to the Python function and everything else to Next.js.

Prefer the CLI? `npm i -g vercel && vercel` from the repo root does the same thing.

<details>
  <summary>🖥️ Accessing "gpt-4.1-mini" (ChatGPT) like a developer</summary>

1. Head to [this notebook](https://colab.research.google.com/drive/1sT7rzY_Lb1_wS0ELI1JJfff0NUEcSD72?usp=sharing) and follow along with the instructions!

2. Complete the notebook and try out your own system/assistant messages!

That's it! Head to the next step and start building your application!

</details>


<details>
  <summary>🏗️ Forking & Cloning This Repository</summary>

Before you begin, make sure you have:

1. 👤 A GitHub account (you'll need to replace `YOUR_GITHUB_USERNAME` with your actual username)
2. 🔧 Git installed on your local machine
3. 💻 A code editor (like Cursor, VS Code, etc.)
4. ⌨️ Terminal access (Mac/Linux) or Command Prompt/PowerShell (Windows)
5. 🔑 A GitHub Personal Access Token (for authentication)

Got everything in place? Let's move on!

1. Fork [this](https://github.com/AI-Maker-Space/The-AI-Engineer-Challenge) repo!

     ![image](https://i.imgur.com/bhjySNh.png)

1. Clone your newly created repo.

     ``` bash
     # First, navigate to where you want the project folder to be created
     cd PATH_TO_DESIRED_PARENT_DIRECTORY

     # Then clone (this will create a new folder called The-AI-Engineer-Challenge)
     git clone git@github.com:<YOUR GITHUB USERNAME>/The-AI-Engineer-Challenge.git
     ```

     > Note: This command uses SSH. If you haven't set up SSH with GitHub, the command will fail. In that case, use HTTPS by replacing `git@github.com:` with `https://github.com/` - you'll then be prompted for your GitHub username and personal access token.

2. Verify your git setup:

     ```bash
     # Check that your remote is set up correctly
     git remote -v

     # Check the status of your repository
     git status

     # See which branch you're on
     git branch
     ```

     <!-- > Need more help with git? Check out our [Detailed Git Setup Guide](docs/GIT_SETUP.md) for a comprehensive walkthrough of git configuration and best practices. -->

3. Open the freshly cloned repository inside Cursor!

     ```bash
     cd The-AI-Engineering-Challenge
     cursor .
     ```

4. Check out the existing backend code found in `/api/index.py`

</details>

<details>
  <summary>⚙️ Backend Setup with uv</summary>

1. Install the [`uv`](https://github.com/astral-sh/uv) package manager (`pip install uv`). `uv` will download and manage Python 3.12 for you the first time you run a project command.
2. From the project root, install dependencies with `uv sync`. This creates `.venv/` (and fetches Python 3.12 automatically if needed).
3. Set your Anthropic API key in the shell before running the server, for example `export ANTHROPIC_API_KEY=sk-ant-...`.
4. Start the backend directly from the project root with `uv run uvicorn api.index:app --reload`. The server will run on `http://localhost:8000` with auto-reload enabled for development.
5. Additional backend details live in `api/README.md`.

</details>

<details>
  <summary>🔥Setting Up for Vibe Coding Success </summary>

While it is a bit counter-intuitive to set things up before jumping into vibe-coding - it's important to remember that there exists a gradient betweeen AI-Assisted Development and Vibe-Coding. We're only reaching *slightly* into AI-Assisted Development for this challenge, but it's worth it!

1. Check out the rules in `.cursor/rules/` and add theme-ing information like colour schemes in `frontend-rule.mdc`! You can be as expressive as you'd like in these rules!
2. We're going to index some docs to make our application more likely to succeed. To do this - we're going to start with `CTRL+SHIFT+P` (or `CMD+SHIFT+P` on Mac) and we're going to type "custom doc" into the search bar. 

     ![image](https://i.imgur.com/ILx3hZu.png)
3. We're then going to copy and paste `https://nextjs.org/docs` into the prompt.

     ![image](https://i.imgur.com/psBjpQd.png)

4. We're then going to use the default configs to add these docs to our available and indexed documents.

     ![image](https://i.imgur.com/LULLeaF.png)

5. After that - you will do the same with Vercel's documentation. After which you should see:

     ![image](https://i.imgur.com/hjyXhhC.png) 

</details>

<details>
  <summary>😎 Vibe Coding a Front End for the FastAPI Backend</summary>

1. Use `Command-L` or `CTRL-L` to open the Cursor chat console. 

2. Set the chat settings to the following:

     ![image](https://i.imgur.com/LSgRSgF.png)

3. Ask Cursor to create a frontend for your application. Iterate as much as you like!

4. Run the frontend using the instructions Cursor provided. 

> NOTE: If you run into any errors, copy and paste them back into the Cursor chat window - and ask Cursor to fix them!

> NOTE: You have been provided with a backend in the `/api` folder - please ensure your Front End integrates with it!

</details>

<details>
  <summary>🚀 Deploying Your First LLM-powered Application with Vercel</summary>

1. Ensure you have signed into [Vercel](https://vercel.com/) with your GitHub account.

2. Ensure you have `npm` (this may have been installed in the previous vibe-coding step!) - if you need help with that, ask Cursor!

3. Run the command:

     ```bash
     npm install -g vercel
     ```

4. Run the command:

     ```bash
     vercel
     ```

5. Follow the in-terminal instructions. (Below is an example of what you will see!)

     ![image](https://i.imgur.com/D1iKGCq.png)

6. Once the build is completed - head to the provided link and try out your app!

> NOTE: Remember, if you run into any errors - ask Cursor to help you fix them!

### Vercel Link to Share

You'll want to make sure you share you *domains* hyperlink to ensure people can access your app!

![image](https://i.imgur.com/mpXIgIz.png)

> NOTE: Test this is the public link by trying to open your newly deployed site in an Incognito browser tab!

</details>

<details>
     <summary>🧪 Vibe Check Your LLM App</summary>

### 🤔 What is a Vibe Check?

Now that you’ve built and deployed your first LLM-powered application, it’s time to evaluate it.

In this section, you’ll run a **“vibe check”** — a lightweight, practical way to test how well your application performs across common tasks.

Think of it as a **first pass to catch obvious issues** before deeper evaluation.

> 💡 You will complete this directly in this README. 

---

## 🏗️ Activity #1: General Capability Vibe Check

Run the following prompts through your app.

For each prompt Identify what capability is being tested (e.g., *summarization ability, reasoning, creativity*)

---

**1. Prompt:**  
Explain the concept of object-oriented programming in simple terms to a complete beginner.  
**Aspect Tested:** Conceptual explanation & pedagogical clarity — can the model simplify a technical topic for a novice, use intuitive analogies, and avoid jargon?

**Response:**  
<!-- TODO: paste the app's response (run this prompt in the deployed app) -->

---

**2. Prompt:**  
Read the following paragraph and provide a concise summary of the key points: *"Cloud computing has transformed how organizations manage IT infrastructure. Instead of buying and maintaining physical servers, companies rent computing resources on demand from providers like AWS, Azure, and Google Cloud, paying only for what they use. This elasticity lets teams scale up during traffic spikes and scale down to save money during quiet periods. It also shifts responsibility for hardware maintenance, security patching, and uptime to the provider, freeing engineers to focus on building products rather than racking servers."*  
**Aspect Tested:** Summarization & information compression — can the model extract the key points from a passage and restate them faithfully and concisely without hallucinating?

**Response:**  
<!-- TODO: paste the app's response (run this prompt in the deployed app) -->

---

**3. Prompt:**  
Write a short, imaginative story (100–150 words) about a robot finding friendship in an unexpected place.  
**Aspect Tested:** Creativity & constraint-following — narrative imagination and coherence, *and* whether it respects the 100–150 word limit.

**Response:**  
<!-- TODO: paste the app's response (run this prompt in the deployed app) -->

---

**4. Prompt:**  
If a store sells apples in packs of 4 and oranges in packs of 3, how many packs of each do I need to buy to get exactly 12 apples and 9 oranges?  
**Aspect Tested:** Quantitative reasoning & constraint satisfaction — basic arithmetic (12 ÷ 4 = **3** apple packs; 9 ÷ 3 = **3** orange packs) with a clearly justified answer.

**Response:**  
<!-- TODO: paste the app's response (run this prompt in the deployed app) -->

---

**5. Prompt:**  
Rewrite the following paragraph in a professional, formal tone: *"hey so i looked at the bug u mentioned and yeah it's def a problem. i think we shld just patch it before friday cuz the client is gonna freak if it breaks again lol. lemme know if u want me to take care of it or if someone else is on it."*  
**Aspect Tested:** Tone & style transformation — instruction following and register control (shifting to a formal voice while preserving the original meaning).

**Response:**  
<!-- TODO: paste the app's response (run this prompt in the deployed app) -->

---

### ❓Question #1

Do the answers appear to be correct and useful?

**Your Answer:**  
*(Draft — confirm against your actual run.)* For these general-capability prompts, `claude-opus-4-8` is expected to do well across the board: the OOP explanation should be clear and analogy-driven, the summary accurate and concise, the story within the 100–150 word limit, the math correct (**3** packs of apples and **3** packs of oranges), and the rewrite appropriately formal while keeping the original meaning. The main thing to watch for is the **word-count constraint** on the story and whether the summary stays faithful without adding facts. Replace this note with your own judgement once you've pasted the responses above. 👀

---

## 🏗️ Activity #2: Personal Use Vibe Check

Now test your app with **real-world prompts that are relevant to your use case**.
My use case is **software / AI engineering**, so these probe code review, AI architecture decisions, and system design.

---

**Prompt:**  
Review this Python function and point out any bugs or edge cases, then show a more robust version: `def average(nums): return sum(nums) / len(nums)`

**Result:**  
<!-- TODO: paste the app's response. (Expected: it should flag the ZeroDivisionError on an empty list, maybe note non-numeric inputs, and return a guarded version.) -->

---

**Prompt:**  
I want my LLM app to answer questions about my company's internal documentation. Should I use retrieval-augmented generation (RAG) or fine-tuning? Explain the trade-offs.

**Result:**  
<!-- TODO: paste the app's response. (Expected: RAG for fresh/changing facts + citations + lower cost; fine-tuning for style/format/behavior; mention they're complementary.) -->

---

**Prompt:**  
How would you design a rate limiter for a public REST API? Walk me through the main approaches and their trade-offs.

**Result:**  
<!-- TODO: paste the app's response. (Expected: token bucket / leaky bucket / fixed & sliding window, plus where to enforce (gateway vs app) and distributed state via Redis.) -->

---

### ❓Question #2

Are the vibes of your assistant aligned with your expectations? Why or why not?

**Your Answer:**  
*(Draft — confirm against your actual run.)* The default persona is *"a helpful, friendly AI assistant — be clear and concise,"* so I expect approachable, well-structured, to-the-point technical answers (good use of bullets and code blocks, which the UI renders as Markdown). For an engineering use case this is a solid baseline. If I want sharper, more senior-level answers, I can tighten the **system prompt** in ⚙️ Settings (e.g., *"You are a senior staff engineer; be precise, call out trade-offs, and prefer production-ready code"*) — or trade depth for speed/cost by switching the model to `claude-sonnet-4-6` or `claude-haiku-4-5`. Update this with your take after running the prompts.

---

## 🏗️ Activity #3: Capability Gaps Vibe Check

Now test your app with prompts that require **capabilities it may not have yet**, such as:
- Real-time data
- Memory
- External tools

Examples:
- “What does my schedule look like tomorrow?”
- “What time should I leave for the airport?”

---

**Prompt:**  
What's the current weather in London right now, and what are today's top tech headlines?

**Result:**  
<!-- TODO: paste the app's response. (Expected: it can't fetch live data — it should say it lacks real-time access rather than inventing weather/headlines.) -->

---

**Prompt:**  
What did I ask you about in our chat yesterday, and what's on my calendar for tomorrow?

**Result:**  
<!-- TODO: paste the app's response. (Expected: no cross-session memory and no calendar access — it should admit it can't recall past sessions or see your calendar.) -->

---

### ❓Question #3

What are some limitations of your application?

**Your Answer:**  
This app is a thin, stateless wrapper around Anthropic's Claude Messages API, so its limits follow directly from that design:

- **No real-time / live data.** The model only knows what was in its training data up to its cutoff, and the app has no web search or external APIs. It can't answer about current weather, news, prices, or anything happening "now."
- **Memory is session-only.** The conversation lives in the browser and is replayed to the model each turn, which gives *in-session* memory — but nothing persists across page reloads or sessions, so it can't recall "yesterday."
- **No tools or actions.** It can't read your files, check your calendar, browse the web, send email, or run code. It only generates text.
- **No grounding / RAG.** Answers come purely from the model's parameters, so it can hallucinate and can't cite your private documents.
- **External dependencies.** It needs a valid Anthropic API key and network access; rate limits, model availability, and outages all affect it.
- **Coarse access control.** Access is gated by a single **shared password** (no per-user accounts), and CORS is wide open — fine for a gated demo, but not multi-tenant production.

Most of these are *addressable* — see the improvement ideas below.

---

## 🚀 (Optional) Improve Your App

Based on your vibe check, try improving your application:
- Adjust your prompt
- Change the model
- Add features

**💡 Ideas mapped to the limitations above:**
- **Beat the knowledge cutoff** → add a web-search / news tool and let the model call it (function calling).
- **Ground answers in your docs** → add RAG: embed your documents, retrieve relevant chunks, and stuff them into the prompt.
- **Real memory** → persist conversations (localStorage or a DB) and add a "history" sidebar.
- **Sharper answers** → tune the system prompt in ⚙️ Settings, or switch the model (`claude-opus-4-8` for depth, `claude-haiku-4-5` for speed).
- **Real accounts** → swap the shared-password gate for [Auth.js](https://authjs.dev/) to get per-user logins and state.
- **Production hardening** → lock down CORS to your domain and rate-limit the `/api/chat` endpoint.

Then rerun your vibe check and document:

---

**Adjustments Made:**  
<!-- Describe what you changed (e.g., "tightened the system prompt to a senior-engineer persona and switched from claude-opus-4-8 to claude-sonnet-4-6") -->

**Results:**  
<!-- What improved? What didn’t? -->

---

## 📦 Submission Instructions

1. Complete this section directly in your README
2. Commit and push your changes to GitHub
3. Share your **repo link + deployed Vercel app**








</details>

### 🎉 Congratulations! 

You just deployed your first LLM-powered application! 🚀🚀🚀 Get on linkedin and post your results and experience! Make sure to tag us at @AIMakerspace!

Here's a template to get your post started!

```
🚀🎉 Exciting News! 🎉🚀

🏗️ Today, I'm thrilled to announce that I've successfully built and shipped my first-ever LLM using the powerful combination of Next.js, FastAPI, and the Anthropic (Claude) API! 🖥️

Check it out 👇
[LINK TO APP]

A big shoutout to the @AI Makerspace for all making this possible. Couldn't have done it without the incredible community there. 🤗🙏

Looking forward to building with the community! 🙌✨ Here's to many more creations ahead! 🥂🎉

Who else is diving into the world of AI? Let's connect! 🌐💡

#FirstLLMApp 
```
