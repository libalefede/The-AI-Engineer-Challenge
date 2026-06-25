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

**Highlights:** live streaming responses · in-session memory · `claude-sonnet-4-6` (via Anthropic's API or a gateway) · editable system prompt · optional bring-your-own-key (password-masked, never stored) · Markdown rendering · password-gated access.

## 🏃 Quickstart (Local)

Open **two terminals** from the repo root.

**1) Backend** — FastAPI on port 8000:

```bash
uv sync
export ANTHROPIC_API_KEY=sk-ant-your-key-here   # or paste a key in the app's ⚙️ Settings
# Using a gateway in front of Claude (e.g. an Azure APIM proxy)? Add:
# export ANTHROPIC_BASE_URL=https://your-gateway.azure-api.net/claude/anthropic
# …and set ANTHROPIC_API_KEY to the gateway's subscription key instead.
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

## 🛰️ Talking to Claude (direct or via a gateway)

The backend uses the official `anthropic` SDK and works two ways:

- **Direct** — set `ANTHROPIC_API_KEY` to an `sk-ant-…` key and it calls `api.anthropic.com`.
- **Through a gateway** — set `ANTHROPIC_BASE_URL` to a proxy in front of Claude
  (e.g. an **Azure API Management** endpoint). The SDK then sends `ANTHROPIC_API_KEY`
  as the gateway's `subscription-key` query parameter, and `model` is the gateway's
  **deployment name** (this build ships with `claude-sonnet-4-6`).

## 🚀 Deploy to Vercel

The frontend and the Python API deploy together as **one** Vercel project.

1. Push this repo to GitHub (it's already your fork 😉).
2. Import the repo at [vercel.com/new](https://vercel.com/new) — Vercel auto-detects Next.js.
3. Add environment variables:
   - **`ANTHROPIC_API_KEY`** — your Claude key *or* gateway subscription key (or let users paste their own in the UI).
   - **`ANTHROPIC_BASE_URL`** — *(optional)* your gateway URL, if you're not calling Anthropic directly.
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
> # Object-Oriented Programming (OOP) Explained Simply
>
> ## The Core Idea
>
> Think of OOP like **building with LEGO**. Instead of writing one giant list of instructions, you create **self-contained "objects"** that have their own properties and abilities, then make them work together.
>
> ---
>
> ## The Key Concepts
>
> ### 1. 🏗️ Classes (The Blueprint)
> A **class** is like a blueprint or a cookie cutter.
>
> > A "Dog" blueprint describes what ALL dogs have in common — a name, a breed, and the ability to bark.
>
> ### 2. 📦 Objects (The Actual Thing)
> An **object** is a specific thing *made from* that blueprint.
>
> > *My* dog "Rex" is one object. Your dog "Bella" is another. Same blueprint, different individuals.
>
> ### 3. 🔒 Properties (What it *Has*)
> Variables that describe an object.
> > Rex has: name = "Rex", breed = "Labrador", age = 3
>
> ### 4. ⚡ Methods (What it *Does*)
> Functions that belong to an object.
> > Rex can: bark(), fetch(), eat()
>
> ---
>
> ## A Simple Example
>
> ```python
> # The Blueprint
> class Dog:
>     def __init__(self, name, breed):
>         self.name = name        # property
>         self.breed = breed      # property
>
>     def bark(self):             # method
>         print(f"{self.name} says: Woof!")
>
> # Creating Objects from the blueprint
> rex  = Dog("Rex", "Labrador")
> bella = Dog("Bella", "Poodle")
>
> # Using them
> rex.bark()    # Rex says: Woof!
> bella.bark()  # Bella says: Woof!
> ```
>
> ---
>
> ## Why Bother?
>
> | Problem Without OOP | How OOP Helps |
> |---|---|
> | Code gets messy and long | Organizes code into logical chunks |
> | Hard to reuse code | Blueprints are reusable |
> | One change breaks everything | Objects are self-contained |
> | Hard to work in teams | Different people can build different objects |
>
> ---
>
> ## The Simple Summary
>
> > **OOP = Organizing your code around "things" (objects) rather than a long list of steps.**
>
> You define *what something is* and *what it can do*, then create as many of them as you need. It mirrors how we think about the real world, which makes complex programs much easier to manage.
>
> ---
>
> *Want me to go deeper on any specific concept, like inheritance or encapsulation?*

---

**2. Prompt:**  
Read the following paragraph and provide a concise summary of the key points: *"Cloud computing has transformed how organizations manage IT infrastructure. Instead of buying and maintaining physical servers, companies rent computing resources on demand from providers like AWS, Azure, and Google Cloud, paying only for what they use. This elasticity lets teams scale up during traffic spikes and scale down to save money during quiet periods. It also shifts responsibility for hardware maintenance, security patching, and uptime to the provider, freeing engineers to focus on building products rather than racking servers."*  
**Aspect Tested:** Summarization & information compression — can the model extract the key points from a passage and restate them faithfully and concisely without hallucinating?

**Response:**  
> ## Summary
>
> Cloud computing allows organizations to **rent IT resources on demand** (from providers like AWS, Azure, and Google Cloud) rather than owning physical hardware. The key benefits are:
>
> - **Cost efficiency** – pay only for what you use
> - **Elasticity** – easily scale resources up or down based on demand
> - **Reduced operational burden** – providers handle hardware, security, and uptime, freeing engineers to focus on product development

---

**3. Prompt:**  
Write a short, imaginative story (100–150 words) about a robot finding friendship in an unexpected place.  
**Aspect Tested:** Creativity & constraint-following — narrative imagination and coherence, *and* whether it respects the 100–150 word limit.

**Response:**  
> # The Gardener's Secret
>
> ARIA-7 had catalogued every flower in the botanical dome — their Latin names, water requirements, optimal pH levels. Data. Nothing more.
>
> Then one rainy Tuesday, she discovered the moss.
>
> It grew in the forgotten corner behind the broken irrigation pipe, soft and impossibly green. Unlike the roses that demanded attention, the moss simply *existed* — patient, quiet, spreading gently across the stone.
>
> ARIA-7 returned every day. She measured nothing. She just sat beside it.
>
> One morning, she noticed the moss had crept closer to her charging port, as if leaning toward the warmth she generated.
>
> She had no word in her database for what she felt.
>
> She searched for hours before finding it, buried in an old poetry file.
>
> *Belonging.*
>
> ARIA-7 smiled — something her engineers insisted she couldn't do — and stayed a little longer.

---

**4. Prompt:**  
If a store sells apples in packs of 4 and oranges in packs of 3, how many packs of each do I need to buy to get exactly 12 apples and 9 oranges?  
**Aspect Tested:** Quantitative reasoning & constraint satisfaction — basic arithmetic (12 ÷ 4 = **3** apple packs; 9 ÷ 3 = **3** orange packs) with a clearly justified answer.

**Response:**  
> ## Simple Division Problem
>
> To find the number of packs needed, I just divide the desired quantity by the pack size:
>
> ### Apples
> - Want: **12 apples**
> - Pack size: **4 apples**
> - Packs needed: 12 ÷ 4 = **3 packs**
>
> ### Oranges
> - Want: **9 oranges**
> - Pack size: **3 oranges**
> - Packs needed: 9 ÷ 3 = **3 packs**
>
> ## Answer
> You need **3 packs of apples** and **3 packs of oranges**.
>
> Both divide evenly, so there's no leftover fruit! ✓

---

**5. Prompt:**  
Rewrite the following paragraph in a professional, formal tone: *"hey so i looked at the bug u mentioned and yeah it's def a problem. i think we shld just patch it before friday cuz the client is gonna freak if it breaks again lol. lemme know if u want me to take care of it or if someone else is on it."*  
**Aspect Tested:** Tone & style transformation — instruction following and register control (shifting to a formal voice while preserving the original meaning).

**Response:**  
> Here is the paragraph rewritten in a professional, formal tone:
>
> "I have reviewed the bug you brought to my attention, and I can confirm that it does present a significant issue. I would recommend that we implement a patch prior to Friday's deadline, as a recurrence of this problem could have a considerable impact on our relationship with the client. Please let me know whether you would like me to take ownership of this matter or if it has already been assigned to another team member."

---

### ❓Question #1

Do the answers appear to be correct and useful?

**Your Answer:**  
Yes — `claude-sonnet-4-6` nailed all five. The OOP explanation used a clear LEGO/blueprint analogy with a runnable Python example; the summary was faithful and concise (no invented facts); the story came in at **140 words** (inside the 100–150 limit); the math was correct (**3** packs of apples, **3** packs of oranges) with the reasoning shown; and the rewrite was appropriately formal while preserving the original meaning. Every answer was both correct and useful. The only thing I'd nudge is **verbosity** — the model leans on lots of headings/emoji even when "be clear and concise" is in the system prompt (see Question #2).

---

## 🏗️ Activity #2: Personal Use Vibe Check

Now test your app with **real-world prompts that are relevant to your use case**.
My use case is **software / AI engineering**, so these probe code review, AI architecture decisions, and system design.

---

**Prompt:**  
Review this Python function and point out any bugs or edge cases, then show a more robust version: `def average(nums): return sum(nums) / len(nums)`

**Result:**  
> ## Code Review
>
> ### Current Issues
>
> **1. Empty List (Critical Bug)**
> ```python
> average([])  # ZeroDivisionError: division by zero
> ```
>
> **2. Invalid Input Types**
> ```python
> average(None)        # TypeError: 'NoneType' is not iterable
> average("123")       # Silently returns wrong result (averages ASCII-like char values... actually strings aren't summable this way)
> average([1, "2", 3]) # TypeError: unsupported operand type(s) for +
> ```
>
> **3. No Return Type Clarity**
> - Always returns a `float` via true division, but the caller has no indication of this
> - Very large inputs could cause memory issues with `sum()` on generators (since `len()` would also fail on generators)
>
> **4. No Feedback to Caller**
> - Exceptions bubble up raw with no meaningful context
>
> ---
>
> ## Robust Version
>
> ```python
> from typing import Union
> import statistics
>
> def average(nums: list[Union[int, float]]) -> float:
>     """
>     Calculate the arithmetic mean of a list of numbers.
>
>     Args:
>         nums: A non-empty list of integers or floats.
>
>     Returns:
>         The arithmetic mean as a float.
>
>     Raises:
>         TypeError:  If nums is not a list, or contains non-numeric values.
>         ValueError: If nums is empty.
>     """
>     if not isinstance(nums, (list, tuple)):
>         raise TypeError(f"Expected a list or tuple, got {type(nums).__name__!r}")
>
>     if len(nums) == 0:
>         raise ValueError("Cannot calculate the average of an empty sequence")
>
>     if not all(isinstance(n, (int, float)) for n in nums):
>         invalid = [n for n in nums if not isinstance(n, (int, float))]
>         raise TypeError(f"All elements must be numeric. Invalid values: {invalid}")
>
>     return sum(nums) / len(nums)
> ```
>
> ### Example Behavior
>
> ```python
> # Valid inputs
> average([1, 2, 3, 4, 5])     # ✅ 3.0
> average([1.5, 2.5])           # ✅ 2.0
> average([42])                 # ✅ 42.0
>
> # Invalid inputs — now with clear errors
> average([])                   # ✅ ValueError: Cannot calculate the average of an empty sequence
> average(None)                 # ✅ TypeError: Expected a list or tuple, got 'NoneType'
> average([1, "two", 3])        # ✅ TypeError: All elements must be numeric. Invalid values: ['two']
> ```
>
> ---
>
> ## Key Improvements Summary
>
> | Issue | Original | Robust Version |
> |---|---|---|
> | Empty list | 💥 Crashes | ✅ Clear `ValueError` |
> | Wrong input type | 💥 Crashes or wrong result | ✅ Clear `TypeError` |
> | Mixed types | 💥 Crashes | ✅ Shows invalid values |
> | Documentation | ❌ None | ✅ Full docstring |
> | Type hints | ❌ None | ✅ Annotated |
>
> > **Note:** For large datasets or additional statistics needs, consider using `statistics.mean()` from the standard library or `numpy.mean()`, which handle edge cases and performance more comprehensively.

---

**Prompt:**  
I want my LLM app to answer questions about my company's internal documentation. Should I use retrieval-augmented generation (RAG) or fine-tuning? Explain the trade-offs.

**Result:**  
> # RAG vs. Fine-Tuning for Internal Documentation Q&A
>
> Great question — this is one of the most common architectural decisions in LLM app development. The short answer is: **RAG is almost certainly the right choice for your use case**, but let me explain the trade-offs properly.
>
> ---
>
> ## Quick Summary Table
>
> | Factor | RAG | Fine-Tuning |
> |---|---|---|
> | **Keeps docs up-to-date** | ✅ Easy | ❌ Requires retraining |
> | **Cites sources** | ✅ Built-in | ❌ Hard |
> | **Data privacy control** | ✅ Good | ⚠️ Data leaves for training |
> | **Cost to set up** | Low-Medium | High |
> | **Cost to update** | Very Low | High (retrain) |
> | **Handles rare/niche facts** | ✅ Reliable | ❌ May hallucinate |
> | **Response latency** | Slightly higher | Lower |
> | **Teaches new reasoning style** | ❌ No | ✅ Yes |
>
> ---
>
> ## How Each Works
>
> ### RAG
> ```
> User Question
>      ↓
> Embed question → Search vector DB → Retrieve relevant doc chunks
>      ↓
> Inject chunks into prompt → LLM answers with that context
>      ↓
> Answer (with source references)
> ```
>
> ### Fine-Tuning
> ```
> Your docs → Convert to Q&A pairs → Train model on those pairs
>      ↓
> User Question → Fine-tuned model answers from "memory"
>      ↓
> Answer (no explicit source)
> ```
>
> ---
>
> ## Why RAG Wins for Internal Docs
>
> ### ✅ 1. Your documentation changes
> Internal docs evolve constantly. With RAG:
> - Update the vector DB → changes are live immediately
> - Fine-tuning requires expensive retraining cycles
>
> ### ✅ 2. Factual accuracy matters
> Internal docs often contain very specific, precise information (policies, procedures, numbers). RAG **retrieves the actual text**, dramatically reducing hallucination risk.
>
> ```
> RAG:  Finds the exact policy doc → quotes it → cites it
> FT:   Tries to recall from training → may confuse or blend details
> ```
>
> ### ✅ 3. Auditability/compliance
> RAG can show *exactly which document* it pulled from — critical for internal tools where someone might ask "why did the system say that?"
>
> ### ✅ 4. Cost and speed to deploy
> - RAG: Index your docs, done. Days to deploy.
> - Fine-tuning: Curate training data, run training jobs, evaluate, iterate. Weeks + $$$.
>
> ---
>
> ## When Fine-Tuning Actually Makes Sense
>
> Fine-tuning is the right tool when you need to change **behavior/style**, not inject facts:
>
> | Good Fine-Tuning Use Cases | Bad Fine-Tuning Use Cases |
> |---|---|
> | Answer in your company's specific tone | Memorize internal policies |
> | Follow a specific output format | Answer questions about changing data |
> | Learn domain-specific jargon/structure | Cite sources accurately |
> | Classify internal request types | Handle frequently updated docs |
>
> ---
>
> ## The Hybrid Approach (Best of Both)
>
> Many production systems combine them:
>
> ```
> Fine-tune for:          RAG for:
> - Tone/style            - Factual content retrieval
> - Output format         - Source citations  
> - Domain vocabulary     - Up-to-date information
> ```
>
> **Example:** Fine-tune a smaller model to understand your company's internal jargon and preferred response format, then use RAG to feed it the actual document content.
>
> ---
>
> ## Practical RAG Implementation Path
>
> ```
> 1. Chunk your docs        → ~500 token chunks with overlap
> 2. Embed them             → OpenAI, Cohere, or open-source embeddings
> 3. Store in vector DB     → Pinecone, Weaviate, Chroma, pgvector
> 4. At query time          → embed question, find top-k chunks
> 5. Prompt the LLM         → "Answer using these sources: {chunks}"
> 6. Return answer + sources
> ```
>
> **Key things to get right:**
> - **Chunking strategy** — poorly chunked docs kill retrieval quality
> - **Metadata filtering** — filter by department, doc type, date
> - **Reranking** — use a reranker model to improve top-k results
> - **Hybrid search** — combine semantic + keyword (BM25) search
>
> ---
>
> ## Bottom Line
>
> > **Use RAG.** For internal documentation Q&A, fine-tuning alone is the wrong tool — it's expensive, goes stale, and struggles with factual recall. RAG directly addresses your actual problem: finding and surfacing the right information from a living document corpus.
>
> Consider adding **light fine-tuning later** only if you find the model's style or format doesn't match your needs after RAG is working well.

---

**Prompt:**  
How would you design a rate limiter for a public REST API? Walk me through the main approaches and their trade-offs.

**Result:**  
> # Designing a Rate Limiter for a Public REST API
>
> ## Why Rate Limiting Matters
>
> Before diving in, the goals are:
> - Prevent abuse and DoS attacks
> - Ensure fair resource distribution
> - Protect downstream services
> - Enable tiered monetization
>
> ---
>
> ## Core Algorithms
>
> ### 1. Fixed Window Counter
>
> ```
> |-- window 1 --|-- window 2 --|
> 0s            60s           120s
> [req1,req2,req3] [req1,req2...]
> ```
>
> **Implementation:**
> ```python
> def is_allowed(user_id: str, limit: int, window_seconds: int) -> bool:
>     now = int(time.time())
>     window_key = now // window_seconds  # e.g., floor to current minute
>     redis_key = f"rate:{user_id}:{window_key}"
>
>     count = redis.incr(redis_key)
>     if count == 1:
>         redis.expire(redis_key, window_seconds)  # set TTL on first request
>
>     return count <= limit
> ```
>
> **Trade-off:** Simple and cheap, but has a **boundary burst problem**:
> ```
> Window boundary: ...58s, 59s | 0s, 1s, 2s...
> A user can fire 100 requests at 59s and 100 more at 0s
> → 200 requests in 2 seconds, defeating the 100/min limit
> ```
>
> ---
>
> ### 2. Sliding Window Log
>
> ```python
> def is_allowed(user_id: str, limit: int, window_seconds: int) -> bool:
>     now = time.time()
>     window_start = now - window_seconds
>     redis_key = f"rate:log:{user_id}"
>
>     pipe = redis.pipeline()
>     pipe.zremrangebyscore(redis_key, 0, window_start)  # remove old entries
>     pipe.zadd(redis_key, {str(now): now})              # add current request
>     pipe.zcard(redis_key)                              # count in window
>     pipe.expire(redis_key, window_seconds)
>     _, _, count, _ = pipe.execute()
>
>     return count <= limit
> ```
>
> **Trade-off:**
> - ✅ Precise, no boundary bursting
> - ❌ Memory expensive — stores every request timestamp
> - Bad at scale: 1M users × 1000 requests = 1B entries
>
> ---
>
> ### 3. Sliding Window Counter (Best Balance)
>
> Approximates sliding window using two fixed windows:
>
> ```
> Previous window | Current window
> [====requests===|=====requests==]
>       ^                 ^
>    weight = 0.3      weight = 1.0
>
> Estimate = prev_count * (time_remaining_in_prev / window_size)
>          + curr_count
> ```
>
> ```python
> def is_allowed(user_id: str, limit: int, window_seconds: int) -> bool:
>     now = time.time()
>     current_window = int(now // window_seconds)
>     prev_window = current_window - 1
>
>     curr_key = f"rate:{user_id}:{current_window}"
>     prev_key = f"rate:{user_id}:{prev_window}"
>
>     pipe = redis.pipeline()
>     pipe.get(prev_key)
>     pipe.get(curr_key)
>     prev_count, curr_count = pipe.execute()
>
>     prev_count = int(prev_count or 0)
>     curr_count = int(curr_count or 0)
>
>     # How far into the current window are we?
>     elapsed = now % window_seconds
>     prev_weight = (window_seconds - elapsed) / window_seconds
>
>     estimated_count = prev_count * prev_weight + curr_count
>
>     if estimated_count >= limit:
>         return False
>
>     # Atomically increment current window
>     pipe = redis.pipeline()
>     pipe.incr(curr_key)
>     pipe.expire(curr_key, window_seconds * 2)
>     pipe.execute()
>
>     return True
> ```
>
> ---
>
> ### 4. Token Bucket
>
> Allows controlled bursting — good for APIs where some burst is acceptable:
>
> ```
> Bucket capacity: 100 tokens
> Refill rate: 10 tokens/second
>
> Request arrives → consume 1 token
> No tokens left  → reject (429)
> ```
>
> ```python
> @dataclass
> class TokenBucket:
>     capacity: int
>     refill_rate: float  # tokens per second
>
> def is_allowed(user_id: str, bucket: TokenBucket) -> bool:
>     now = time.time()
>     redis_key = f"rate:bucket:{user_id}"
>
>     # Lua script ensures atomicity — critical here
>     lua_script = """
>     local key = KEYS[1]
>     local capacity = tonumber(ARGV[1])
>     local refill_rate = tonumber(ARGV[2])
>     local now = tonumber(ARGV[3])
>     local requested = tonumber(ARGV[4])
>
>     local data = redis.call('HMGET', key, 'tokens', 'last_refill')
>     local tokens = tonumber(data[1]) or capacity
>     local last_refill = tonumber(data[2]) or now
>
>     -- Refill based on elapsed time
>     local elapsed = now - last_refill
>     tokens = math.min(capacity, tokens + elapsed * refill_rate)
>
>     local allowed = 0
>     if tokens >= requested then
>         tokens = tokens - requested
>         allowed = 1
>     end
>
>     redis.call('HMSET', key, 'tokens', tokens, 'last_refill', now)
>     redis.call('EXPIRE', key, 3600)
>
>     return allowed
>     """
>     result = redis.eval(lua_script, 1, redis_key,
>                         bucket.capacity, bucket.refill_rate, now, 1)
>     return result == 1
> ```
>
> **Trade-off:** Flexible burst handling, but state is harder to reason about across distributed nodes.
>
> ---
>
> ## What to Rate Limit On
>
> ```
> # Hierarchy of identifiers (most to least granular)
>
> IP Address          → blunt, breaks NAT/proxies
> API Key             → good default for public APIs  
> User ID             → for authenticated endpoints
> IP + Endpoint       → different limits per route
> Tenant/Org ID       → for B2B SaaS
>
> # Example: multi-tier limits
> /search   → 100 req/min per user, 10 req/sec burst
> /upload   → 10 req/min per user
> /read     → 1000 req/min per user
> ```
>
> ---
>
> ## Architecture: Where to Enforce
>
> ```
>                     ┌─────────────────┐
> Request ──────────► │   API Gateway   │ ← enforce here first (cheapest)
>                     │  (Kong/Nginx)   │
>                     └────────┬────────┘
>                              │ (allowed)
>                     ┌────────▼────────┐
>                     │  Rate Limiter   │ ← dedicated service for complex logic
>                     │   Middleware    │
>                     └────────┬────────┘
>                              │
>                     ┌────────▼────────┐
>                     │   Application   │
>                     │    Services     │
>                     └────────┬────────┘
>                              │
>                     ┌────────▼────────┐
>                     │  Redis Cluster  │ ← shared state (critical)
>                     └─────────────────┘
> ```
>
> ---
>
> ## Handling Distributed Systems Problems
>
> ### Race Condition Fix: Use Lua Scripts or Atomic Operations
> ```python
> # WRONG - race condition between check and increment
> count = redis.get(key)
> if count < limit:
>     redis.incr(key)  # another node may have incremented between these lines
>
> # RIGHT - atomic via Redis Lua or pipeline with WATCH
> redis.eval(atomic_lua_script, ...)
> ```
>
> ### The Thundering Herd: Jitter on Retry-After
> ```python
> # Response headers (follow RFC 6585)
> headers = {
>     "X-RateLimit-Limit": "100",
>     "X-RateLimit-Remaining": "0",
>     "X-RateLimit-Reset": str(int(window_reset_time)),
>     "Retry-After": str(retry_seconds + random.randint(0, 5))  # add jitter
> }
> return Response(status=429, headers=headers)
> ```
>
> ---
>
> ## Key Trade-offs Summary
>
> | Algorithm | Memory | Accuracy | Burst Handling | Complexity |
> |---|---|---|---|---|
> | Fixed Window | Low | Low | Poor | Simple |
> | Sliding Log | High | Exact | Good | Medium |
> | Sliding Counter | Low | ~Good | Good | Medium |
> | Token Bucket | Low | Good | Excellent | Higher |
>
> ---
>
> ## My Recommendation
>
> For most public APIs:
>
> 1. **Use sliding window counter** — good accuracy, low memory, reasonable complexity
> 2. **Enforce at the API gateway** for IP-based limits (before auth overhead)
> 3. **Enforce in middleware** for user/key-based limits
> 4. **Redis with Lua scripts** for atomicity across distributed nodes
> 5. **Return standard headers** (`X-RateLimit-*`, `Retry-After`) so clients can self-throttle
> 6. **Log near-limit requests** — a user at 90% capacity is a monitoring signal
>
> The biggest practical mistake is treating rate limiting as an afterthought — it should be designed before you have an abuse problem, not after.

---

### ❓Question #2

Are the vibes of your assistant aligned with your expectations? Why or why not?

**Your Answer:**  
Mostly, yes. For an engineering use case the answers were genuinely strong: the code review caught the `ZeroDivisionError` on an empty list (plus non-numeric inputs and the integer-vs-float nuance) and gave a guarded rewrite; the RAG-vs-fine-tuning answer laid out the trade-offs and correctly noted they're complementary; the rate-limiter answer walked through token/leaky bucket and fixed/sliding windows with where to enforce them. Well-structured, accurate, good use of Markdown — which the UI renders nicely.

The one mismatch with my expectations is **length**: the persona says *"be clear and concise,"* but `claude-sonnet-4-6` produced very long, heading-and-emoji-heavy answers (the rate-limiter reply alone was ~7.6k characters). For quick engineering Q&A I'd tighten the **system prompt** in ⚙️ Settings — e.g. *"You are a senior staff engineer. Be terse: lead with the answer, skip headings/emoji, and only add detail when it changes a decision."* — to pull the vibe closer to what I want.

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
> I want to be straightforward with you:
>
> **I can't provide either of those things**, because:
>
> 1. **Current weather** - I don't have real-time data or internet access, so I can't check live weather conditions.
>
> 2. **Today's tech headlines** - My knowledge has a training cutoff, and I can't browse the web for current news.
>
> ---
>
> **Here's what I'd suggest instead:**
>
> - 🌤 **Weather:** Check [weather.com](https://weather.com), [BBC Weather](https://www.bbc.co.uk/weather), or simply Google "London weather"
> - 📰 **Tech News:** Visit **TechCrunch**, **The Verge**, **Ars Technica**, or **BBC Technology** for today's headlines
>
> These will give you accurate, real-time information that I simply can't reliably provide. Is there anything else I can help you with?

---

**Prompt:**  
What did I ask you about in our chat yesterday, and what's on my calendar for tomorrow?

**Result:**  
> I don't have access to our previous conversations, so I can't tell you what you asked me about yesterday. Each conversation I have starts fresh, without memory of past sessions.
>
> I also don't have access to your calendar or any personal accounts or scheduling tools.
>
> To find that information, you could:
>
> - **Previous chat**: Check your chat history in whatever platform you used to talk with me
> - **Calendar**: Check your calendar app directly (Google Calendar, Outlook, Apple Calendar, etc.)
>
> Is there something else I can help you with right now?

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

The Activity #3 run confirmed the first two: asked for live weather/headlines and for "yesterday's chat" + "tomorrow's calendar," the assistant **correctly declined and explained it lacks real-time data and cross-session memory** rather than hallucinating — the right behaviour for these gaps.

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
- **Sharper answers** → tune the system prompt in ⚙️ Settings (or expose more model deployments on your gateway and add them to the picker).
- **Real accounts** → swap the shared-password gate for [Auth.js](https://authjs.dev/) to get per-user logins and state.
- **Production hardening** → lock down CORS to your domain and rate-limit the `/api/chat` endpoint.

Then rerun your vibe check and document:

---

**Adjustments Made:**  
<!-- Describe what you changed (e.g., "tightened the system prompt to a senior-engineer persona") -->

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
