import type { Term, SpecialModes, CrossRefInfo, TimelineItem } from '../types/almanac';

export const terms: Term[] = [
  {
    "word": "agentic",
    "part": "adjective",
    "pron": "/ā-ˈjen-tik/",
    "definition": "Describing AI that can pursue a goal through multiple steps, choosing actions and using tools with some degree of autonomy rather than returning a single passive answer.",
    "example": "“The prototype became agentic once it could inspect errors, edit files, and rerun the build on its own.”",
    "origin": "From “agent,” sharpened by the rise of tool-using AI systems.",
    "note": "Use this when the system is acting, not merely answering.",
    "related": [
      "tool calling",
      "reasoning loop",
      "workflow"
    ],
    "aliases": [
      "autonomous ai",
      "ai acts on its own",
      "multi step ai"
    ],
    "category": "Agents, Tools & MCP"
  },
  {
    "word": "alignment",
    "part": "noun",
    "pron": "/ə-ˈlīn-mənt/",
    "definition": "The work of making an AI system behave in ways that are consistent with intended goals, constraints, human preferences, and safety requirements.",
    "example": "“The model was capable, but alignment determined whether that capability was useful in the product.”",
    "origin": "Borrowed from the idea of bringing goals or systems into agreement.",
    "note": "Capability answers “can it?” Alignment asks “should it, and how?”",
    "related": [
      "guardrail",
      "policy",
      "eval"
    ],
    "aliases": [
      "ai safety",
      "human values",
      "safe ai"
    ],
    "category": "Safety, Security & Alignment"
  },
  {
    "word": "benchmark",
    "part": "noun",
    "pron": "/ˈbench-ˌmärk/",
    "definition": "A standardized task or collection of tasks used to compare AI systems on a defined capability, often under controlled conditions.",
    "example": "“The benchmark improved, but users did not notice the difference.”",
    "origin": "An old measurement term adopted broadly in computing and machine learning.",
    "note": "A benchmark is evidence, not the product experience itself.",
    "related": [
      "eval",
      "reasoning",
      "regression"
    ],
    "aliases": [
      "model test",
      "compare models",
      "score ai"
    ],
    "category": "Evaluation & Metrics"
  },
  {
    "word": "chain of thought",
    "part": "noun",
    "pron": "/chān əv thȯt/",
    "definition": "A sequence of intermediate reasoning steps associated with solving a problem; in product interfaces, the useful focus is usually on concise explanations and verifiable work rather than exposing private internal reasoning.",
    "example": "“The app showed the sources and calculation, not a wall of hidden reasoning.”",
    "origin": "A reasoning metaphor popularized in language-model research.",
    "note": "Prefer evidence and useful explanation over performative verbosity.",
    "related": [
      "reasoning",
      "verification",
      "trace"
    ],
    "aliases": [
      "reasoning steps",
      "thinking steps"
    ],
    "category": "Language Models & Prompting"
  },
  {
    "word": "context window",
    "part": "noun",
    "pron": "/ˈkän-tekst ˈwin-dō/",
    "definition": "The amount of text, code, images, instructions, and prior conversation an AI model can consider at one time while producing its next response.",
    "example": "“Paste the relevant files, not the whole repository, unless the context window can handle it cleanly.”",
    "origin": "Borrowed from computing language around active working context.",
    "note": "More context is not automatically better context. Relevance still matters.",
    "related": [
      "token",
      "prompt",
      "retrieval"
    ],
    "aliases": [
      "memory limit",
      "how much ai can read",
      "context length"
    ],
    "category": "Language Models & Prompting"
  },
  {
    "word": "diff",
    "part": "noun",
    "pron": "/dif/",
    "definition": "A representation of what changed between two versions of code or text, especially useful when reviewing AI-generated edits.",
    "example": "“Don’t judge the explanation; inspect the diff.”",
    "origin": "Long-standing developer shorthand for “difference.”",
    "note": "For vibe coding, the diff is where confidence becomes evidence.",
    "related": [
      "vibe coding",
      "ship loop",
      "verification"
    ],
    "aliases": [
      "code changes",
      "patch",
      "difference"
    ],
    "category": "AI Product, Coding & Culture"
  },
  {
    "word": "embedding",
    "part": "noun",
    "pron": "/em-ˈbe-diŋ/",
    "definition": "A numeric representation that places text, images, or other data in a space where similar meanings tend to be near one another.",
    "example": "“Embeddings let the app find documents that meant the same thing even when they used different words.”",
    "origin": "From mathematical and machine-learning representations.",
    "note": "Think “meaning coordinates,” not a human-readable summary.",
    "related": [
      "retrieval",
      "vector database",
      "semantic search"
    ],
    "aliases": [
      "meaning vector",
      "semantic vector"
    ],
    "category": "Retrieval & Knowledge"
  },
  {
    "word": "eval",
    "part": "noun",
    "pron": "/ē-val/",
    "definition": "A repeatable test used to measure whether an AI system behaves well on defined tasks, edge cases, quality dimensions, or safety constraints.",
    "example": "“Before changing the prompt, we ran the eval suite to see what actually improved.”",
    "origin": "Short for evaluation; common in machine-learning and AI product work.",
    "note": "Without evals, iteration can become a contest between anecdotes.",
    "related": [
      "benchmark",
      "regression",
      "prompt debt"
    ],
    "aliases": [
      "evaluation",
      "ai test",
      "quality test"
    ],
    "category": "Evaluation & Metrics"
  },
  {
    "word": "few-shot",
    "part": "adjective",
    "pron": "/fyü shät/",
    "definition": "Describing a prompting approach that includes a small number of examples to demonstrate the desired pattern before asking the model to handle a new case.",
    "example": "“Three clean examples made the formatter more reliable than another paragraph of instructions.”",
    "origin": "From machine-learning terminology about learning from few examples.",
    "note": "Examples often communicate structure more precisely than prose.",
    "related": [
      "prompt",
      "system prompt",
      "in-context learning"
    ],
    "aliases": [
      "examples in prompt",
      "few examples"
    ],
    "category": "Language Models & Prompting"
  },
  {
    "word": "grounding",
    "part": "noun",
    "pron": "/ˈgrau̇n-diŋ/",
    "definition": "Connecting an AI response to trusted evidence such as documents, databases, live tools, citations, or retrieved source material rather than relying only on model memory.",
    "example": "“Grounding the answer in the current docs eliminated the made-up API options.”",
    "origin": "Adapted from research language around linking symbols and claims to evidence.",
    "note": "Grounding reduces guesswork; it does not guarantee perfect interpretation.",
    "related": [
      "retrieval",
      "verification",
      "tool calling"
    ],
    "aliases": [
      "use sources",
      "citations",
      "trusted evidence"
    ],
    "category": "Retrieval & Knowledge"
  },
  {
    "word": "guardrail",
    "part": "noun",
    "pron": "/ˈgärd-ˌrāl/",
    "definition": "A product or system constraint intended to prevent undesirable AI behavior, unsafe actions, invalid outputs, or violations of policy.",
    "example": "“The guardrail blocked destructive actions until the user explicitly confirmed them.”",
    "origin": "A physical safety metaphor borrowed into software and AI product design.",
    "note": "Good guardrails shape behavior without making the product unusable.",
    "related": [
      "alignment",
      "policy",
      "tool calling"
    ],
    "aliases": [
      "safety rule",
      "constraint",
      "block unsafe actions"
    ],
    "category": "Safety, Security & Alignment"
  },
  {
    "word": "hallucination",
    "part": "noun",
    "pron": "/hə-ˌlü-sə-ˈnā-shən/",
    "definition": "A confident-looking AI output that contains invented, unsupported, or incorrect information. Fluency can hide the error, which is why verification matters.",
    "example": "“The package name sounded plausible, but it was a hallucination.”",
    "origin": "An imperfect but widely used metaphor from early generative-AI discourse.",
    "note": "A polished answer and a verified answer are different things.",
    "related": [
      "grounding",
      "verification",
      "confidence"
    ],
    "aliases": [
      "ai makes things up",
      "made up answer",
      "false information",
      "fabrication"
    ],
    "category": "Safety, Security & Alignment"
  },
  {
    "word": "inference",
    "part": "noun",
    "pron": "/ˈin-f(ə-)rən(t)s/",
    "definition": "The process of running a trained AI model on an input to produce an output, as distinct from training the model itself.",
    "example": "“Training happened once; inference happens every time a user asks the model something.”",
    "origin": "From statistics and machine learning.",
    "note": "Latency and cost conversations often refer to inference, not training.",
    "related": [
      "latency",
      "token",
      "model"
    ],
    "aliases": [
      "run the model",
      "model generation"
    ],
    "category": "Foundations"
  },
  {
    "word": "latency",
    "part": "noun",
    "pron": "/ˈlā-tᵊn-sē/",
    "definition": "The delay between a user action and an AI system producing or beginning to produce a useful response.",
    "example": "“The smarter workflow felt worse because tool calls pushed latency past the point of flow.”",
    "origin": "A general systems-performance term.",
    "note": "Perceived speed matters as much as raw model speed.",
    "related": [
      "inference",
      "streaming",
      "tool calling"
    ],
    "aliases": [
      "slow response",
      "response time",
      "delay"
    ],
    "category": "Generation & Decoding"
  },
  {
    "word": "model",
    "part": "noun",
    "pron": "/ˈmä-dᵊl/",
    "definition": "A trained computational system that maps inputs to outputs according to patterns learned from data; in modern AI products, it may generate text, images, audio, code, or actions.",
    "example": "“Choose the model for the job, not for the leaderboard.”",
    "origin": "An old scientific term with a specialized machine-learning meaning.",
    "note": "The model is one component of an AI product, not the whole product.",
    "related": [
      "inference",
      "training",
      "benchmark"
    ],
    "aliases": [
      "llm",
      "ai model",
      "language model"
    ],
    "category": "Foundations"
  },
  {
    "word": "multimodal",
    "part": "adjective",
    "pron": "/ˌməl-tē-ˈmō-dᵊl/",
    "definition": "Able to understand or generate more than one kind of information, such as text, images, audio, video, or structured data.",
    "example": "“The multimodal model could inspect the screenshot and then edit the code that produced it.”",
    "origin": "From “multiple modalities,” long used in perception and machine learning.",
    "note": "The interesting part is cross-modal reasoning, not merely accepting files.",
    "related": [
      "vision",
      "model",
      "tool calling"
    ],
    "aliases": [
      "text and images",
      "vision model",
      "multiple inputs"
    ],
    "category": "Foundations"
  },
  {
    "word": "prompt",
    "part": "noun",
    "pron": "/prämpt/",
    "definition": "The instruction, context, examples, constraints, or question given to an AI model to shape what it produces.",
    "example": "“The best prompt specified the goal, the constraints, and what a good output should look like.”",
    "origin": "An existing computing term that became a mainstream creative verb and noun.",
    "note": "Prompts are closer to briefs than magic spells.",
    "related": [
      "system prompt",
      "few-shot",
      "context window"
    ],
    "aliases": [
      "instruction",
      "ask ai",
      "message to ai"
    ],
    "category": "Language Models & Prompting"
  },
  {
    "word": "prompt debt",
    "part": "noun",
    "pron": "/prämpt det/",
    "definition": "The hidden maintenance burden created when a product depends on an accumulation of brittle prompt instructions instead of clear product logic, tests, tools, and structured data.",
    "example": "“We kept adding another sentence to the prompt until prompt debt made every change risky.”",
    "origin": "Modeled after “technical debt.”",
    "note": "If a prompt reads like a patchwork legal contract, the architecture may be asking for help.",
    "related": [
      "prompt",
      "guardrail",
      "eval"
    ],
    "aliases": [
      "messy prompt",
      "prompt maintenance",
      "brittle instructions"
    ],
    "category": "AI Product, Coding & Culture"
  },
  {
    "word": "reasoning",
    "part": "noun",
    "pron": "/ˈrē-zᵊn-iŋ/",
    "definition": "The process of working through relationships, constraints, intermediate decisions, or evidence to arrive at a useful answer or action.",
    "example": "“The task required reasoning across the logs, not just matching a keyword.”",
    "origin": "An ordinary human concept applied cautiously to AI behavior.",
    "note": "Judge reasoning by the quality of decisions and evidence, not theatrical “thinking.”",
    "related": [
      "agentic",
      "verification",
      "benchmark"
    ],
    "aliases": [
      "thinking",
      "problem solving",
      "logic"
    ],
    "category": "Language Models & Prompting"
  },
  {
    "word": "retrieval",
    "part": "noun",
    "pron": "/ri-ˈtrē-vᵊl/",
    "definition": "Finding relevant information from an external collection—such as documents, databases, or search results—so an AI system can use fresher or more specific evidence.",
    "example": "“Retrieval found the current policy before the model drafted the answer.”",
    "origin": "From information retrieval, a field older than modern generative AI.",
    "note": "Search first, generate second, when freshness matters.",
    "related": [
      "grounding",
      "embedding",
      "RAG"
    ],
    "aliases": [
      "look up documents",
      "search documents",
      "external knowledge"
    ],
    "category": "Retrieval & Knowledge"
  },
  {
    "word": "RAG",
    "part": "noun",
    "pron": "/rag/",
    "definition": "Retrieval-augmented generation: a pattern where an AI system retrieves relevant external information and gives it to a generative model as context before producing an answer.",
    "example": "“RAG let the assistant answer from the company handbook instead of guessing from training data.”",
    "origin": "An acronym for retrieval-augmented generation.",
    "note": "RAG is an architecture pattern, not a guarantee of truth.",
    "related": [
      "retrieval",
      "grounding",
      "embedding"
    ],
    "aliases": [
      "retrieval augmented generation",
      "search before answering",
      "documents before answer"
    ],
    "category": "Retrieval & Knowledge"
  },
  {
    "word": "ship loop",
    "part": "noun",
    "pron": "/ship lüp/",
    "definition": "A tight cycle of describe → generate → inspect → test → refine → release, commonly used when building software with AI coding tools.",
    "example": "“Keep the ship loop small enough that you can tell which change caused the regression.”",
    "origin": "A practical synthesis of iterative software and AI-assisted generation.",
    "note": "Speed comes from short feedback cycles, not from skipping feedback.",
    "related": [
      "vibe coding",
      "eval",
      "diff"
    ],
    "aliases": [
      "iterate fast",
      "build test refine",
      "feedback loop"
    ],
    "category": "AI Product, Coding & Culture"
  },
  {
    "word": "system prompt",
    "part": "noun",
    "pron": "/ˈsis-təm prämt/",
    "definition": "A high-priority instruction layer that sets an AI assistant’s role, behavior, constraints, tone, and tool-use expectations before ordinary user messages are considered.",
    "example": "“The system prompt defined the assistant as a strict code reviewer.”",
    "origin": "A practical term from chat-model application design.",
    "note": "It is product policy and behavior design, not just hidden copy.",
    "related": [
      "prompt",
      "guardrail",
      "policy"
    ],
    "aliases": [
      "hidden instructions",
      "assistant rules",
      "top level prompt"
    ],
    "category": "Language Models & Prompting"
  },
  {
    "word": "taste",
    "part": "noun",
    "pron": "/tāst/",
    "definition": "The human ability to recognize what feels coherent, useful, elegant, appropriate, or high-quality when AI can generate many plausible options quickly.",
    "example": "“The model produced twenty layouts; taste was choosing the one worth refining.”",
    "origin": "An old creative concept with renewed importance in AI-assisted work.",
    "note": "As generation gets cheaper, selection and direction become more valuable.",
    "related": [
      "vibe coding",
      "critique",
      "iteration"
    ],
    "aliases": [
      "judgment",
      "creative direction",
      "good design sense"
    ],
    "category": "AI Product, Coding & Culture"
  },
  {
    "word": "token",
    "part": "noun",
    "pron": "/ˈtō-kən/",
    "definition": "A small unit of text processed by a language model. Tokens are not always whole words; punctuation and word fragments may each count separately.",
    "example": "“The answer was short in words but expensive in tokens because the input context was huge.”",
    "origin": "From computational linguistics and text processing.",
    "note": "Token count affects context limits, latency, and often cost.",
    "related": [
      "context window",
      "latency",
      "prompt"
    ],
    "aliases": [
      "text unit",
      "model unit",
      "context cost"
    ],
    "category": "Language Models & Prompting"
  },
  {
    "word": "tool calling",
    "part": "noun",
    "pron": "/tül ˈkô-liŋ/",
    "definition": "A pattern where an AI model chooses and invokes an external function, API, database, browser, or other capability to obtain information or perform an action.",
    "example": "“Tool calling let the assistant read the live issue tracker instead of guessing.”",
    "origin": "From function-calling interfaces in modern AI platforms.",
    "note": "The model chooses what to ask for; the tool provides the real-world capability.",
    "related": [
      "agentic",
      "workflow",
      "grounding"
    ],
    "aliases": [
      "function calling",
      "use api",
      "ai tools"
    ],
    "category": "Agents, Tools & MCP"
  },
  {
    "word": "vector database",
    "part": "noun",
    "pron": "/ˈvek-tər ˈdā-tə-ˌbās/",
    "definition": "A database optimized to store and search vector representations such as embeddings, often used for semantic retrieval in AI applications.",
    "example": "“The vector database returned conceptually similar support articles, not just keyword matches.”",
    "origin": "From vector mathematics and database engineering.",
    "note": "Useful when similarity is semantic rather than exact-text matching.",
    "related": [
      "embedding",
      "retrieval",
      "RAG"
    ],
    "aliases": [
      "vector db",
      "semantic database",
      "embedding store"
    ],
    "category": "Retrieval & Knowledge"
  },
  {
    "word": "vibe coding",
    "part": "noun",
    "pron": "/vīb ˈkō-diŋ/",
    "definition": "A style of software creation where a person steers an AI coding system through natural-language intent, rapid feedback, and visual or behavioral judgment instead of manually authoring every line.",
    "example": "“We vibe coded the landing page, then tightened the data model and tests by hand.”",
    "origin": "Internet-native slang for AI-assisted programming by conversational direction.",
    "note": "Fast generation does not remove the need for judgment, debugging, security, or maintainability.",
    "related": [
      "ship loop",
      "diff",
      "taste"
    ],
    "aliases": [
      "ai coding",
      "coding with ai",
      "natural language coding",
      "vibe coder"
    ],
    "category": "AI Product, Coding & Culture"
  },
  {
    "word": "workflow",
    "part": "noun",
    "pron": "/ˈwərk-ˌflō/",
    "definition": "A defined sequence of steps, tools, decisions, and handoffs that turns an input into a useful outcome; AI may automate some steps without replacing the workflow itself.",
    "example": "“The winning feature was the workflow around the model, not the model call.”",
    "origin": "A long-standing operations and software term.",
    "note": "If the workflow is unclear, adding an agent usually makes the confusion faster.",
    "related": [
      "agentic",
      "tool calling",
      "ship loop"
    ],
    "aliases": [
      "process",
      "steps",
      "automation flow"
    ],
    "category": "AI Product, Coding & Culture"
  },
  {
    "word": "artificial intelligence",
    "part": "noun",
    "pron": "",
    "definition": "The field of building machines or software that perform tasks associated with perception, reasoning, learning, generation, or decision-making.",
    "example": "“The team used artificial intelligence while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in foundations and modern AI practice.",
    "note": "Use the term precisely; broad AI concepts are often conflated in casual discussion.",
    "related": [
      "machine learning",
      "human-AI collaboration",
      "deep learning"
    ],
    "aliases": [
      "ai"
    ],
    "category": "Foundations"
  },
  {
    "word": "machine learning",
    "part": "noun",
    "pron": "",
    "definition": "A branch of AI in which systems learn patterns from data instead of relying only on hand-written rules.",
    "example": "“The team used machine learning while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in foundations and modern AI practice.",
    "note": "Use the term precisely; broad AI concepts are often conflated in casual discussion.",
    "related": [
      "deep learning",
      "artificial intelligence",
      "neural network"
    ],
    "aliases": [
      "ml"
    ],
    "category": "Foundations"
  },
  {
    "word": "deep learning",
    "part": "noun",
    "pron": "",
    "definition": "Machine learning based on neural networks with many processing layers.",
    "example": "“The team used deep learning while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in foundations and modern AI practice.",
    "note": "Use the term precisely; broad AI concepts are often conflated in casual discussion.",
    "related": [
      "neural network",
      "machine learning",
      "foundation model"
    ],
    "aliases": [
      "dl"
    ],
    "category": "Foundations"
  },
  {
    "word": "neural network",
    "part": "noun",
    "pron": "",
    "definition": "A parameterized computational model made of connected layers that transform inputs into outputs.",
    "example": "“The team used neural network while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in foundations and modern AI practice.",
    "note": "Use the term precisely; broad AI concepts are often conflated in casual discussion.",
    "related": [
      "foundation model",
      "deep learning",
      "base model"
    ],
    "aliases": [
      "artificial neural network",
      "ann"
    ],
    "category": "Foundations"
  },
  {
    "word": "foundation model",
    "part": "noun",
    "pron": "",
    "definition": "A broadly trained model that can be adapted or prompted for many downstream tasks.",
    "example": "“The team used foundation model while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in foundations and modern AI practice.",
    "note": "Use the term precisely; broad AI concepts are often conflated in casual discussion.",
    "related": [
      "base model",
      "neural network",
      "frontier model"
    ],
    "aliases": [
      "general-purpose model"
    ],
    "category": "Foundations"
  },
  {
    "word": "base model",
    "part": "noun",
    "pron": "",
    "definition": "A model after broad pretraining but before task-specific instruction tuning or other post-training.",
    "example": "“The team used base model while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in foundations and modern AI practice.",
    "note": "Use the term precisely; broad AI concepts are often conflated in casual discussion.",
    "related": [
      "frontier model",
      "foundation model",
      "large language model"
    ],
    "aliases": [
      "pretrained model"
    ],
    "category": "Foundations"
  },
  {
    "word": "frontier model",
    "part": "noun",
    "pron": "",
    "definition": "An informal term for a model near the leading edge of general AI capability at a given time.",
    "example": "“The team used frontier model while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in foundations and modern AI practice.",
    "note": "Use the term precisely; broad AI concepts are often conflated in casual discussion.",
    "related": [
      "large language model",
      "base model",
      "small language model"
    ],
    "aliases": [
      "frontier ai"
    ],
    "category": "Foundations"
  },
  {
    "word": "large language model",
    "part": "noun",
    "pron": "",
    "definition": "A language model trained at large scale to predict and generate sequences of tokens.",
    "example": "“The team used large language model while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in foundations and modern AI practice.",
    "note": "Use the term precisely; broad AI concepts are often conflated in casual discussion.",
    "related": [
      "small language model",
      "frontier model",
      "vision-language model"
    ],
    "aliases": [
      "llm"
    ],
    "category": "Foundations"
  },
  {
    "word": "small language model",
    "part": "noun",
    "pron": "",
    "definition": "A comparatively compact language model designed for lower cost, lower latency, local use, or specialized tasks.",
    "example": "“The team used small language model while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in foundations and modern AI practice.",
    "note": "Use the term precisely; broad AI concepts are often conflated in casual discussion.",
    "related": [
      "vision-language model",
      "large language model",
      "large multimodal model"
    ],
    "aliases": [
      "slm"
    ],
    "category": "Foundations"
  },
  {
    "word": "vision-language model",
    "part": "noun",
    "pron": "",
    "definition": "A multimodal model that jointly processes visual information and language.",
    "example": "“The team used vision-language model while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in foundations and modern AI practice.",
    "note": "Use the term precisely; broad AI concepts are often conflated in casual discussion.",
    "related": [
      "large multimodal model",
      "small language model",
      "parameter"
    ],
    "aliases": [
      "vlm"
    ],
    "category": "Foundations"
  },
  {
    "word": "large multimodal model",
    "part": "noun",
    "pron": "",
    "definition": "A large model designed to work across multiple modalities such as text, image, audio, or video.",
    "example": "“The team used large multimodal model while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in foundations and modern AI practice.",
    "note": "Use the term precisely; broad AI concepts are often conflated in casual discussion.",
    "related": [
      "parameter",
      "vision-language model",
      "weight"
    ],
    "aliases": [
      "lmm"
    ],
    "category": "Foundations"
  },
  {
    "word": "parameter",
    "part": "noun",
    "pron": "",
    "definition": "A learned numeric value inside a model that helps determine how inputs are transformed into outputs.",
    "example": "“The team used parameter while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in foundations and modern AI practice.",
    "note": "Use the term precisely; broad AI concepts are often conflated in casual discussion.",
    "related": [
      "weight",
      "large multimodal model",
      "bias parameter"
    ],
    "aliases": [
      "model parameter"
    ],
    "category": "Foundations"
  },
  {
    "word": "weight",
    "part": "noun",
    "pron": "",
    "definition": "A model parameter, commonly represented as a number in a tensor, that is adjusted during training.",
    "example": "“The team used weight while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in foundations and modern AI practice.",
    "note": "Use the term precisely; broad AI concepts are often conflated in casual discussion.",
    "related": [
      "bias parameter",
      "parameter",
      "activation"
    ],
    "aliases": [
      "model weight"
    ],
    "category": "Foundations"
  },
  {
    "word": "bias parameter",
    "part": "noun",
    "pron": "",
    "definition": "A learned additive parameter that shifts the activation of a model unit.",
    "example": "“The team used bias parameter while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in foundations and modern AI practice.",
    "note": "Use the term precisely; broad AI concepts are often conflated in casual discussion.",
    "related": [
      "activation",
      "weight",
      "feature"
    ],
    "aliases": [
      "bias term"
    ],
    "category": "Foundations"
  },
  {
    "word": "activation",
    "part": "noun",
    "pron": "",
    "definition": "The numeric output of a neuron or layer after applying its transformation and activation function.",
    "example": "“The team used activation while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in foundations and modern AI practice.",
    "note": "Use the term precisely; broad AI concepts are often conflated in casual discussion.",
    "related": [
      "feature",
      "bias parameter",
      "representation"
    ],
    "aliases": [
      "hidden activation"
    ],
    "category": "Foundations"
  },
  {
    "word": "feature",
    "part": "noun",
    "pron": "",
    "definition": "A measurable input property or learned representation used by a model to make predictions.",
    "example": "“The team used feature while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in foundations and modern AI practice.",
    "note": "Use the term precisely; broad AI concepts are often conflated in casual discussion.",
    "related": [
      "representation",
      "activation",
      "latent space"
    ],
    "aliases": [
      "attribute"
    ],
    "category": "Foundations"
  },
  {
    "word": "representation",
    "part": "noun",
    "pron": "",
    "definition": "An internal encoding of information used by a model, often distributed across many activations.",
    "example": "“The team used representation while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in foundations and modern AI practice.",
    "note": "Use the term precisely; broad AI concepts are often conflated in casual discussion.",
    "related": [
      "latent space",
      "feature",
      "latent variable"
    ],
    "aliases": [
      "internal representation"
    ],
    "category": "Foundations"
  },
  {
    "word": "latent space",
    "part": "noun",
    "pron": "",
    "definition": "A learned vector space in which data is represented through hidden features or variables.",
    "example": "“The team used latent space while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in foundations and modern AI practice.",
    "note": "Use the term precisely; broad AI concepts are often conflated in casual discussion.",
    "related": [
      "latent variable",
      "representation",
      "objective"
    ],
    "aliases": [
      "latent representation"
    ],
    "category": "Foundations"
  },
  {
    "word": "latent variable",
    "part": "noun",
    "pron": "",
    "definition": "A hidden variable inferred from observed data rather than directly measured.",
    "example": "“The team used latent variable while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in foundations and modern AI practice.",
    "note": "Use the term precisely; broad AI concepts are often conflated in casual discussion.",
    "related": [
      "objective",
      "latent space",
      "loss function"
    ],
    "aliases": [
      "hidden variable"
    ],
    "category": "Foundations"
  },
  {
    "word": "objective",
    "part": "noun",
    "pron": "",
    "definition": "The quantity a training or optimization process is designed to improve.",
    "example": "“The team used objective while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in foundations and modern AI practice.",
    "note": "Use the term precisely; broad AI concepts are often conflated in casual discussion.",
    "related": [
      "loss function",
      "latent variable",
      "inference"
    ],
    "aliases": [
      "training objective"
    ],
    "category": "Foundations"
  },
  {
    "word": "loss function",
    "part": "noun",
    "pron": "",
    "definition": "A function that measures how far model outputs are from the desired training behavior.",
    "example": "“The team used loss function while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in foundations and modern AI practice.",
    "note": "Use the term precisely; broad AI concepts are often conflated in casual discussion.",
    "related": [
      "inference",
      "objective",
      "training"
    ],
    "aliases": [
      "loss"
    ],
    "category": "Foundations"
  },
  {
    "word": "training",
    "part": "noun",
    "pron": "",
    "definition": "The process of adjusting model parameters using data and an optimization objective.",
    "example": "“The team used training while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in foundations and modern AI practice.",
    "note": "Use the term precisely; broad AI concepts are often conflated in casual discussion.",
    "related": [
      "pretraining",
      "inference",
      "post-training"
    ],
    "aliases": [
      "model training"
    ],
    "category": "Foundations"
  },
  {
    "word": "pretraining",
    "part": "noun",
    "pron": "",
    "definition": "Large-scale training that teaches a model broad statistical patterns before later adaptation or instruction tuning.",
    "example": "“The team used pretraining while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in foundations and modern AI practice.",
    "note": "Use the term precisely; broad AI concepts are often conflated in casual discussion.",
    "related": [
      "post-training",
      "training",
      "generalization"
    ],
    "aliases": [
      "pre-training"
    ],
    "category": "Foundations"
  },
  {
    "word": "post-training",
    "part": "noun",
    "pron": "",
    "definition": "Training and alignment steps applied after base pretraining to make a model more useful, controllable, or specialized.",
    "example": "“The team used post-training while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in foundations and modern AI practice.",
    "note": "Use the term precisely; broad AI concepts are often conflated in casual discussion.",
    "related": [
      "generalization",
      "pretraining",
      "overfitting"
    ],
    "aliases": [
      "posttraining"
    ],
    "category": "Foundations"
  },
  {
    "word": "generalization",
    "part": "noun",
    "pron": "",
    "definition": "A model's ability to perform well on new data rather than only memorizing its training examples.",
    "example": "“The team used generalization while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in foundations and modern AI practice.",
    "note": "Use the term precisely; broad AI concepts are often conflated in casual discussion.",
    "related": [
      "overfitting",
      "post-training",
      "underfitting"
    ],
    "aliases": [
      "generalisation"
    ],
    "category": "Foundations"
  },
  {
    "word": "overfitting",
    "part": "noun",
    "pron": "",
    "definition": "When a model learns training data too specifically and performs worse on unseen examples.",
    "example": "“The team used overfitting while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in foundations and modern AI practice.",
    "note": "Use the term precisely; broad AI concepts are often conflated in casual discussion.",
    "related": [
      "underfitting",
      "generalization",
      "distribution"
    ],
    "aliases": [
      "overfit"
    ],
    "category": "Foundations"
  },
  {
    "word": "underfitting",
    "part": "noun",
    "pron": "",
    "definition": "When a model is too simple or insufficiently trained to capture important patterns in the data.",
    "example": "“The team used underfitting while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in foundations and modern AI practice.",
    "note": "Use the term precisely; broad AI concepts are often conflated in casual discussion.",
    "related": [
      "distribution",
      "overfitting",
      "distribution shift"
    ],
    "aliases": [
      "underfit"
    ],
    "category": "Foundations"
  },
  {
    "word": "distribution",
    "part": "noun",
    "pron": "",
    "definition": "The statistical pattern describing how values or examples occur in a dataset or environment.",
    "example": "“The team used distribution while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in foundations and modern AI practice.",
    "note": "Use the term precisely; broad AI concepts are often conflated in casual discussion.",
    "related": [
      "distribution shift",
      "underfitting",
      "domain"
    ],
    "aliases": [
      "data distribution"
    ],
    "category": "Foundations"
  },
  {
    "word": "distribution shift",
    "part": "noun",
    "pron": "",
    "definition": "A change between the data distribution used for training and the distribution encountered later.",
    "example": "“The team used distribution shift while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in foundations and modern AI practice.",
    "note": "Use the term precisely; broad AI concepts are often conflated in casual discussion.",
    "related": [
      "domain",
      "distribution",
      "capability"
    ],
    "aliases": [
      "dataset shift"
    ],
    "category": "Foundations"
  },
  {
    "word": "domain",
    "part": "noun",
    "pron": "",
    "definition": "A particular subject area, environment, or data distribution in which a model is used.",
    "example": "“The team used domain while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in foundations and modern AI practice.",
    "note": "Use the term precisely; broad AI concepts are often conflated in casual discussion.",
    "related": [
      "capability",
      "distribution shift",
      "emergent behavior"
    ],
    "aliases": [
      "task domain"
    ],
    "category": "Foundations"
  },
  {
    "word": "capability",
    "part": "noun",
    "pron": "",
    "definition": "A behavior or class of tasks an AI system can perform with useful reliability.",
    "example": "“The team used capability while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in foundations and modern AI practice.",
    "note": "Use the term precisely; broad AI concepts are often conflated in casual discussion.",
    "related": [
      "emergent behavior",
      "domain",
      "scaling law"
    ],
    "aliases": [
      "model capability"
    ],
    "category": "Foundations"
  },
  {
    "word": "emergent behavior",
    "part": "noun",
    "pron": "",
    "definition": "A capability or pattern that becomes noticeable as a system changes in scale, training, tools, or composition.",
    "example": "“The team used emergent behavior while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in foundations and modern AI practice.",
    "note": "Use the term precisely; broad AI concepts are often conflated in casual discussion.",
    "related": [
      "scaling law",
      "capability",
      "compute-optimal training"
    ],
    "aliases": [
      "emergent capability"
    ],
    "category": "Foundations"
  },
  {
    "word": "scaling law",
    "part": "noun",
    "pron": "",
    "definition": "An empirical relationship describing how model performance changes with factors such as compute, data, or parameter count.",
    "example": "“The team used scaling law while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in foundations and modern AI practice.",
    "note": "Use the term precisely; broad AI concepts are often conflated in casual discussion.",
    "related": [
      "compute-optimal training",
      "emergent behavior",
      "AGI"
    ],
    "aliases": [
      "neural scaling law"
    ],
    "category": "Foundations"
  },
  {
    "word": "compute-optimal training",
    "part": "noun",
    "pron": "",
    "definition": "Choosing model size, data quantity, and compute allocation to achieve strong performance for a fixed training budget.",
    "example": "“The team used compute-optimal training while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in foundations and modern AI practice.",
    "note": "Use the term precisely; broad AI concepts are often conflated in casual discussion.",
    "related": [
      "AGI",
      "scaling law",
      "ANI"
    ],
    "aliases": [
      "chinchilla scaling"
    ],
    "category": "Foundations"
  },
  {
    "word": "AGI",
    "part": "noun",
    "pron": "",
    "definition": "Artificial general intelligence; a contested term for AI with broad, flexible competence across many cognitive tasks.",
    "example": "“The team used AGI while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in foundations and modern AI practice.",
    "note": "Use the term precisely; broad AI concepts are often conflated in casual discussion.",
    "related": [
      "ANI",
      "compute-optimal training",
      "ASI"
    ],
    "aliases": [
      "artificial general intelligence"
    ],
    "category": "Foundations"
  },
  {
    "word": "ANI",
    "part": "noun",
    "pron": "",
    "definition": "Artificial narrow intelligence; AI specialized for a limited set of tasks rather than broad general competence.",
    "example": "“The team used ANI while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in foundations and modern AI practice.",
    "note": "Use the term precisely; broad AI concepts are often conflated in casual discussion.",
    "related": [
      "ASI",
      "AGI",
      "augmented intelligence"
    ],
    "aliases": [
      "artificial narrow intelligence"
    ],
    "category": "Foundations"
  },
  {
    "word": "ASI",
    "part": "noun",
    "pron": "",
    "definition": "Artificial superintelligence; a hypothetical system that greatly exceeds human capability across many domains.",
    "example": "“The team used ASI while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in foundations and modern AI practice.",
    "note": "Use the term precisely; broad AI concepts are often conflated in casual discussion.",
    "related": [
      "augmented intelligence",
      "ANI",
      "human-AI collaboration"
    ],
    "aliases": [
      "artificial superintelligence"
    ],
    "category": "Foundations"
  },
  {
    "word": "augmented intelligence",
    "part": "noun",
    "pron": "",
    "definition": "A framing in which AI is used to extend human capability rather than simply replace human work.",
    "example": "“The team used augmented intelligence while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in foundations and modern AI practice.",
    "note": "Use the term precisely; broad AI concepts are often conflated in casual discussion.",
    "related": [
      "human-AI collaboration",
      "ASI",
      "artificial intelligence"
    ],
    "aliases": [
      "intelligence augmentation"
    ],
    "category": "Foundations"
  },
  {
    "word": "human-AI collaboration",
    "part": "noun",
    "pron": "",
    "definition": "A workflow in which people and AI systems divide, share, or iteratively refine work.",
    "example": "“The team used human-AI collaboration while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in foundations and modern AI practice.",
    "note": "Use the term precisely; broad AI concepts are often conflated in casual discussion.",
    "related": [
      "artificial intelligence",
      "augmented intelligence",
      "machine learning"
    ],
    "aliases": [
      "human machine collaboration"
    ],
    "category": "Foundations"
  },
  {
    "word": "transformer",
    "part": "noun",
    "pron": "",
    "definition": "A neural-network architecture built around attention mechanisms and widely used for modern language and multimodal models.",
    "example": "“The team used transformer while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in architectures and modern AI practice.",
    "note": "Architecture describes how a model is built, not necessarily how a finished product behaves.",
    "related": [
      "attention",
      "world model",
      "self-attention"
    ],
    "aliases": [],
    "category": "Architectures"
  },
  {
    "word": "attention",
    "part": "noun",
    "pron": "",
    "definition": "A mechanism that lets a model weight some input positions or features more strongly when computing a representation.",
    "example": "“The team used attention while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in architectures and modern AI practice.",
    "note": "Architecture describes how a model is built, not necessarily how a finished product behaves.",
    "related": [
      "self-attention",
      "transformer",
      "cross-attention"
    ],
    "aliases": [],
    "category": "Architectures"
  },
  {
    "word": "self-attention",
    "part": "noun",
    "pron": "",
    "definition": "Attention in which queries, keys, and values come from the same sequence or set of representations.",
    "example": "“The team used self-attention while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in architectures and modern AI practice.",
    "note": "Architecture describes how a model is built, not necessarily how a finished product behaves.",
    "related": [
      "cross-attention",
      "attention",
      "multi-head attention"
    ],
    "aliases": [],
    "category": "Architectures"
  },
  {
    "word": "cross-attention",
    "part": "noun",
    "pron": "",
    "definition": "Attention that lets one sequence or modality attend to a different sequence or modality.",
    "example": "“The team used cross-attention while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in architectures and modern AI practice.",
    "note": "Architecture describes how a model is built, not necessarily how a finished product behaves.",
    "related": [
      "multi-head attention",
      "self-attention",
      "query"
    ],
    "aliases": [],
    "category": "Architectures"
  },
  {
    "word": "multi-head attention",
    "part": "noun",
    "pron": "",
    "definition": "Attention computed through several parallel heads so the model can represent different relationships at once.",
    "example": "“The team used multi-head attention while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in architectures and modern AI practice.",
    "note": "Architecture describes how a model is built, not necessarily how a finished product behaves.",
    "related": [
      "query",
      "cross-attention",
      "key"
    ],
    "aliases": [
      "mha"
    ],
    "category": "Architectures"
  },
  {
    "word": "query",
    "part": "noun",
    "pron": "",
    "definition": "In attention, the vector used to ask which keys are relevant to the current position.",
    "example": "“The team used query while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in architectures and modern AI practice.",
    "note": "Architecture describes how a model is built, not necessarily how a finished product behaves.",
    "related": [
      "key",
      "multi-head attention",
      "value"
    ],
    "aliases": [
      "q vector"
    ],
    "category": "Architectures"
  },
  {
    "word": "key",
    "part": "noun",
    "pron": "",
    "definition": "In attention, a vector compared with a query to determine relevance.",
    "example": "“The team used key while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in architectures and modern AI practice.",
    "note": "Architecture describes how a model is built, not necessarily how a finished product behaves.",
    "related": [
      "value",
      "query",
      "attention head"
    ],
    "aliases": [
      "k vector"
    ],
    "category": "Architectures"
  },
  {
    "word": "value",
    "part": "noun",
    "pron": "",
    "definition": "In attention, the vector whose information is combined according to attention weights.",
    "example": "“The team used value while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in architectures and modern AI practice.",
    "note": "Architecture describes how a model is built, not necessarily how a finished product behaves.",
    "related": [
      "attention head",
      "key",
      "attention mask"
    ],
    "aliases": [
      "v vector"
    ],
    "category": "Architectures"
  },
  {
    "word": "attention head",
    "part": "noun",
    "pron": "",
    "definition": "One parallel attention computation inside a multi-head attention layer.",
    "example": "“The team used attention head while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in architectures and modern AI practice.",
    "note": "Architecture describes how a model is built, not necessarily how a finished product behaves.",
    "related": [
      "attention mask",
      "value",
      "causal mask"
    ],
    "aliases": [
      "head"
    ],
    "category": "Architectures"
  },
  {
    "word": "attention mask",
    "part": "noun",
    "pron": "",
    "definition": "A mask that prevents or allows attention to selected token positions.",
    "example": "“The team used attention mask while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in architectures and modern AI practice.",
    "note": "Architecture describes how a model is built, not necessarily how a finished product behaves.",
    "related": [
      "causal mask",
      "attention head",
      "encoder"
    ],
    "aliases": [
      "mask"
    ],
    "category": "Architectures"
  },
  {
    "word": "causal mask",
    "part": "noun",
    "pron": "",
    "definition": "An attention mask that blocks access to future tokens during autoregressive generation.",
    "example": "“The team used causal mask while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in architectures and modern AI practice.",
    "note": "Architecture describes how a model is built, not necessarily how a finished product behaves.",
    "related": [
      "encoder",
      "attention mask",
      "decoder"
    ],
    "aliases": [
      "look-ahead mask"
    ],
    "category": "Architectures"
  },
  {
    "word": "encoder",
    "part": "noun",
    "pron": "",
    "definition": "A network component that converts input data into contextual representations.",
    "example": "“The team used encoder while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in architectures and modern AI practice.",
    "note": "Architecture describes how a model is built, not necessarily how a finished product behaves.",
    "related": [
      "decoder",
      "causal mask",
      "encoder-decoder"
    ],
    "aliases": [
      "transformer encoder"
    ],
    "category": "Architectures"
  },
  {
    "word": "decoder",
    "part": "noun",
    "pron": "",
    "definition": "A network component that generates or reconstructs outputs from internal representations.",
    "example": "“The team used decoder while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in architectures and modern AI practice.",
    "note": "Architecture describes how a model is built, not necessarily how a finished product behaves.",
    "related": [
      "encoder-decoder",
      "encoder",
      "sequence-to-sequence"
    ],
    "aliases": [
      "transformer decoder"
    ],
    "category": "Architectures"
  },
  {
    "word": "encoder-decoder",
    "part": "noun",
    "pron": "",
    "definition": "An architecture with separate encoding and decoding stages, common in translation and sequence-to-sequence tasks.",
    "example": "“The team used encoder-decoder while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in architectures and modern AI practice.",
    "note": "Architecture describes how a model is built, not necessarily how a finished product behaves.",
    "related": [
      "sequence-to-sequence",
      "decoder",
      "autoregressive model"
    ],
    "aliases": [
      "seq2seq"
    ],
    "category": "Architectures"
  },
  {
    "word": "sequence-to-sequence",
    "part": "noun",
    "pron": "",
    "definition": "A modeling setup that maps one sequence to another, such as text-to-text translation or summarization.",
    "example": "“The team used sequence-to-sequence while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in architectures and modern AI practice.",
    "note": "Architecture describes how a model is built, not necessarily how a finished product behaves.",
    "related": [
      "autoregressive model",
      "encoder-decoder",
      "causal language model"
    ],
    "aliases": [
      "seq2seq"
    ],
    "category": "Architectures"
  },
  {
    "word": "autoregressive model",
    "part": "noun",
    "pron": "",
    "definition": "A model that generates a sequence one element at a time conditioned on earlier elements.",
    "example": "“The team used autoregressive model while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in architectures and modern AI practice.",
    "note": "Architecture describes how a model is built, not necessarily how a finished product behaves.",
    "related": [
      "causal language model",
      "sequence-to-sequence",
      "masked language model"
    ],
    "aliases": [
      "causal model"
    ],
    "category": "Architectures"
  },
  {
    "word": "causal language model",
    "part": "noun",
    "pron": "",
    "definition": "A language model trained to predict the next token using only earlier tokens in the sequence.",
    "example": "“The team used causal language model while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in architectures and modern AI practice.",
    "note": "Architecture describes how a model is built, not necessarily how a finished product behaves.",
    "related": [
      "masked language model",
      "autoregressive model",
      "bidirectional model"
    ],
    "aliases": [
      "clm"
    ],
    "category": "Architectures"
  },
  {
    "word": "masked language model",
    "part": "noun",
    "pron": "",
    "definition": "A model trained to reconstruct tokens hidden from an input sequence.",
    "example": "“The team used masked language model while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in architectures and modern AI practice.",
    "note": "Architecture describes how a model is built, not necessarily how a finished product behaves.",
    "related": [
      "bidirectional model",
      "causal language model",
      "mixture of experts"
    ],
    "aliases": [
      "mlm"
    ],
    "category": "Architectures"
  },
  {
    "word": "bidirectional model",
    "part": "noun",
    "pron": "",
    "definition": "A model that can use context from both sides of an input position when forming representations.",
    "example": "“The team used bidirectional model while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in architectures and modern AI practice.",
    "note": "Architecture describes how a model is built, not necessarily how a finished product behaves.",
    "related": [
      "mixture of experts",
      "masked language model",
      "expert"
    ],
    "aliases": [],
    "category": "Architectures"
  },
  {
    "word": "mixture of experts",
    "part": "noun",
    "pron": "",
    "definition": "An architecture that routes each token or input to a subset of specialized parameter blocks called experts.",
    "example": "“The team used mixture of experts while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in architectures and modern AI practice.",
    "note": "Architecture describes how a model is built, not necessarily how a finished product behaves.",
    "related": [
      "expert",
      "bidirectional model",
      "router"
    ],
    "aliases": [
      "moe"
    ],
    "category": "Architectures"
  },
  {
    "word": "expert",
    "part": "noun",
    "pron": "",
    "definition": "A specialized subnetwork inside a mixture-of-experts model.",
    "example": "“The team used expert while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in architectures and modern AI practice.",
    "note": "Architecture describes how a model is built, not necessarily how a finished product behaves.",
    "related": [
      "router",
      "mixture of experts",
      "sparse model"
    ],
    "aliases": [],
    "category": "Architectures"
  },
  {
    "word": "router",
    "part": "noun",
    "pron": "",
    "definition": "The component in a mixture-of-experts model that selects which experts should process a token.",
    "example": "“The team used router while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in architectures and modern AI practice.",
    "note": "Architecture describes how a model is built, not necessarily how a finished product behaves.",
    "related": [
      "sparse model",
      "expert",
      "dense model"
    ],
    "aliases": [
      "gating network"
    ],
    "category": "Architectures"
  },
  {
    "word": "sparse model",
    "part": "noun",
    "pron": "",
    "definition": "A model that activates only a subset of parameters or connections for a given input.",
    "example": "“The team used sparse model while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in architectures and modern AI practice.",
    "note": "Architecture describes how a model is built, not necessarily how a finished product behaves.",
    "related": [
      "dense model",
      "router",
      "feed-forward network"
    ],
    "aliases": [
      "sparse network"
    ],
    "category": "Architectures"
  },
  {
    "word": "dense model",
    "part": "noun",
    "pron": "",
    "definition": "A model that generally uses the same main set of parameters for every token or input.",
    "example": "“The team used dense model while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in architectures and modern AI practice.",
    "note": "Architecture describes how a model is built, not necessarily how a finished product behaves.",
    "related": [
      "feed-forward network",
      "sparse model",
      "multilayer perceptron"
    ],
    "aliases": [
      "dense network"
    ],
    "category": "Architectures"
  },
  {
    "word": "feed-forward network",
    "part": "noun",
    "pron": "",
    "definition": "A layer that applies learned transformations independently to each token after attention in many transformer blocks.",
    "example": "“The team used feed-forward network while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in architectures and modern AI practice.",
    "note": "Architecture describes how a model is built, not necessarily how a finished product behaves.",
    "related": [
      "multilayer perceptron",
      "dense model",
      "residual connection"
    ],
    "aliases": [
      "ffn",
      "mlp"
    ],
    "category": "Architectures"
  },
  {
    "word": "multilayer perceptron",
    "part": "noun",
    "pron": "",
    "definition": "A feed-forward neural network made from stacked fully connected layers.",
    "example": "“The team used multilayer perceptron while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in architectures and modern AI practice.",
    "note": "Architecture describes how a model is built, not necessarily how a finished product behaves.",
    "related": [
      "residual connection",
      "feed-forward network",
      "layer normalization"
    ],
    "aliases": [
      "mlp"
    ],
    "category": "Architectures"
  },
  {
    "word": "residual connection",
    "part": "noun",
    "pron": "",
    "definition": "A skip connection that adds an earlier representation to the output of a later transformation.",
    "example": "“The team used residual connection while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in architectures and modern AI practice.",
    "note": "Architecture describes how a model is built, not necessarily how a finished product behaves.",
    "related": [
      "layer normalization",
      "multilayer perceptron",
      "batch normalization"
    ],
    "aliases": [
      "skip connection"
    ],
    "category": "Architectures"
  },
  {
    "word": "layer normalization",
    "part": "noun",
    "pron": "",
    "definition": "A normalization method applied across features within an example, widely used in transformers.",
    "example": "“The team used layer normalization while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in architectures and modern AI practice.",
    "note": "Architecture describes how a model is built, not necessarily how a finished product behaves.",
    "related": [
      "batch normalization",
      "residual connection",
      "positional encoding"
    ],
    "aliases": [
      "layernorm"
    ],
    "category": "Architectures"
  },
  {
    "word": "batch normalization",
    "part": "noun",
    "pron": "",
    "definition": "A normalization method that uses statistics computed across a training batch.",
    "example": "“The team used batch normalization while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in architectures and modern AI practice.",
    "note": "Architecture describes how a model is built, not necessarily how a finished product behaves.",
    "related": [
      "positional encoding",
      "layer normalization",
      "rotary positional embedding"
    ],
    "aliases": [
      "batchnorm"
    ],
    "category": "Architectures"
  },
  {
    "word": "positional encoding",
    "part": "noun",
    "pron": "",
    "definition": "Information added to token representations so a model can distinguish positions in a sequence.",
    "example": "“The team used positional encoding while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in architectures and modern AI practice.",
    "note": "Architecture describes how a model is built, not necessarily how a finished product behaves.",
    "related": [
      "rotary positional embedding",
      "batch normalization",
      "relative position"
    ],
    "aliases": [
      "position encoding"
    ],
    "category": "Architectures"
  },
  {
    "word": "rotary positional embedding",
    "part": "noun",
    "pron": "",
    "definition": "A positional method that rotates query and key features according to token position.",
    "example": "“The team used rotary positional embedding while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in architectures and modern AI practice.",
    "note": "Architecture describes how a model is built, not necessarily how a finished product behaves.",
    "related": [
      "relative position",
      "positional encoding",
      "recurrent neural network"
    ],
    "aliases": [
      "rope"
    ],
    "category": "Architectures"
  },
  {
    "word": "relative position",
    "part": "noun",
    "pron": "",
    "definition": "A representation of how far positions are from each other rather than only their absolute indices.",
    "example": "“The team used relative position while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in architectures and modern AI practice.",
    "note": "Architecture describes how a model is built, not necessarily how a finished product behaves.",
    "related": [
      "recurrent neural network",
      "rotary positional embedding",
      "long short-term memory"
    ],
    "aliases": [
      "relative positional encoding"
    ],
    "category": "Architectures"
  },
  {
    "word": "recurrent neural network",
    "part": "noun",
    "pron": "",
    "definition": "A sequence model that carries a hidden state from one step to the next.",
    "example": "“The team used recurrent neural network while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in architectures and modern AI practice.",
    "note": "Architecture describes how a model is built, not necessarily how a finished product behaves.",
    "related": [
      "long short-term memory",
      "relative position",
      "gated recurrent unit"
    ],
    "aliases": [
      "rnn"
    ],
    "category": "Architectures"
  },
  {
    "word": "long short-term memory",
    "part": "noun",
    "pron": "",
    "definition": "A gated recurrent architecture designed to preserve information over longer sequences.",
    "example": "“The team used long short-term memory while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in architectures and modern AI practice.",
    "note": "Architecture describes how a model is built, not necessarily how a finished product behaves.",
    "related": [
      "gated recurrent unit",
      "recurrent neural network",
      "convolutional neural network"
    ],
    "aliases": [
      "lstm"
    ],
    "category": "Architectures"
  },
  {
    "word": "gated recurrent unit",
    "part": "noun",
    "pron": "",
    "definition": "A simplified gated recurrent architecture related to LSTM.",
    "example": "“The team used gated recurrent unit while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in architectures and modern AI practice.",
    "note": "Architecture describes how a model is built, not necessarily how a finished product behaves.",
    "related": [
      "convolutional neural network",
      "long short-term memory",
      "graph neural network"
    ],
    "aliases": [
      "gru"
    ],
    "category": "Architectures"
  },
  {
    "word": "convolutional neural network",
    "part": "noun",
    "pron": "",
    "definition": "A neural architecture using learned convolution filters, historically central to computer vision.",
    "example": "“The team used convolutional neural network while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in architectures and modern AI practice.",
    "note": "Architecture describes how a model is built, not necessarily how a finished product behaves.",
    "related": [
      "graph neural network",
      "gated recurrent unit",
      "vision transformer"
    ],
    "aliases": [
      "cnn"
    ],
    "category": "Architectures"
  },
  {
    "word": "graph neural network",
    "part": "noun",
    "pron": "",
    "definition": "A neural network designed to operate on nodes and edges in graph-structured data.",
    "example": "“The team used graph neural network while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in architectures and modern AI practice.",
    "note": "Architecture describes how a model is built, not necessarily how a finished product behaves.",
    "related": [
      "vision transformer",
      "convolutional neural network",
      "state space model"
    ],
    "aliases": [
      "gnn"
    ],
    "category": "Architectures"
  },
  {
    "word": "vision transformer",
    "part": "noun",
    "pron": "",
    "definition": "A transformer architecture adapted to image patches and visual tasks.",
    "example": "“The team used vision transformer while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in architectures and modern AI practice.",
    "note": "Architecture describes how a model is built, not necessarily how a finished product behaves.",
    "related": [
      "state space model",
      "graph neural network",
      "Mamba"
    ],
    "aliases": [
      "vit"
    ],
    "category": "Architectures"
  },
  {
    "word": "state space model",
    "part": "noun",
    "pron": "",
    "definition": "A sequence architecture based on learned state transitions rather than standard attention.",
    "example": "“The team used state space model while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in architectures and modern AI practice.",
    "note": "Architecture describes how a model is built, not necessarily how a finished product behaves.",
    "related": [
      "Mamba",
      "vision transformer",
      "autoencoder"
    ],
    "aliases": [
      "ssm"
    ],
    "category": "Architectures"
  },
  {
    "word": "Mamba",
    "part": "noun",
    "pron": "",
    "definition": "A family of selective state-space architectures designed for efficient long-sequence modeling.",
    "example": "“The team used Mamba while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in architectures and modern AI practice.",
    "note": "Architecture describes how a model is built, not necessarily how a finished product behaves.",
    "related": [
      "autoencoder",
      "state space model",
      "variational autoencoder"
    ],
    "aliases": [
      "selective state space model"
    ],
    "category": "Architectures"
  },
  {
    "word": "autoencoder",
    "part": "noun",
    "pron": "",
    "definition": "A model trained to compress input into a latent representation and reconstruct the original data.",
    "example": "“The team used autoencoder while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in architectures and modern AI practice.",
    "note": "Architecture describes how a model is built, not necessarily how a finished product behaves.",
    "related": [
      "variational autoencoder",
      "Mamba",
      "generative adversarial network"
    ],
    "aliases": [],
    "category": "Architectures"
  },
  {
    "word": "variational autoencoder",
    "part": "noun",
    "pron": "",
    "definition": "A probabilistic autoencoder that learns a structured latent distribution useful for generation.",
    "example": "“The team used variational autoencoder while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in architectures and modern AI practice.",
    "note": "Architecture describes how a model is built, not necessarily how a finished product behaves.",
    "related": [
      "generative adversarial network",
      "autoencoder",
      "diffusion model"
    ],
    "aliases": [
      "vae"
    ],
    "category": "Architectures"
  },
  {
    "word": "generative adversarial network",
    "part": "noun",
    "pron": "",
    "definition": "A generative setup in which a generator and discriminator compete during training.",
    "example": "“The team used generative adversarial network while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in architectures and modern AI practice.",
    "note": "Architecture describes how a model is built, not necessarily how a finished product behaves.",
    "related": [
      "diffusion model",
      "variational autoencoder",
      "energy-based model"
    ],
    "aliases": [
      "gan"
    ],
    "category": "Architectures"
  },
  {
    "word": "diffusion model",
    "part": "noun",
    "pron": "",
    "definition": "A generative model that learns to reverse a gradual noising process to create new samples.",
    "example": "“The team used diffusion model while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in architectures and modern AI practice.",
    "note": "Architecture describes how a model is built, not necessarily how a finished product behaves.",
    "related": [
      "energy-based model",
      "generative adversarial network",
      "world model"
    ],
    "aliases": [
      "denoising diffusion"
    ],
    "category": "Architectures"
  },
  {
    "word": "energy-based model",
    "part": "noun",
    "pron": "",
    "definition": "A model that assigns lower energy to preferred configurations and higher energy to less likely ones.",
    "example": "“The team used energy-based model while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in architectures and modern AI practice.",
    "note": "Architecture describes how a model is built, not necessarily how a finished product behaves.",
    "related": [
      "world model",
      "diffusion model",
      "transformer"
    ],
    "aliases": [
      "ebm"
    ],
    "category": "Architectures"
  },
  {
    "word": "world model",
    "part": "noun",
    "pron": "",
    "definition": "A model that predicts or represents how an environment changes, often for planning or simulation.",
    "example": "“The team used world model while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in architectures and modern AI practice.",
    "note": "Architecture describes how a model is built, not necessarily how a finished product behaves.",
    "related": [
      "transformer",
      "energy-based model",
      "attention"
    ],
    "aliases": [],
    "category": "Architectures"
  },
  {
    "word": "tokenization",
    "part": "noun",
    "pron": "",
    "definition": "The process of converting text or other inputs into discrete tokens for a model.",
    "example": "“The team used tokenization while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in language models & prompting and modern AI practice.",
    "note": "Prompting changes the model input and interaction pattern; it does not retrain the base model.",
    "related": [
      "tokenizer",
      "token",
      "byte pair encoding"
    ],
    "aliases": [
      "tokenisation"
    ],
    "category": "Language Models & Prompting"
  },
  {
    "word": "tokenizer",
    "part": "noun",
    "pron": "",
    "definition": "The component that maps raw text to token IDs and back to readable text.",
    "example": "“The team used tokenizer while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in language models & prompting and modern AI practice.",
    "note": "Prompting changes the model input and interaction pattern; it does not retrain the base model.",
    "related": [
      "byte pair encoding",
      "tokenization",
      "SentencePiece"
    ],
    "aliases": [],
    "category": "Language Models & Prompting"
  },
  {
    "word": "byte pair encoding",
    "part": "noun",
    "pron": "",
    "definition": "A tokenization algorithm that repeatedly merges common symbol pairs to build a subword vocabulary.",
    "example": "“The team used byte pair encoding while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in language models & prompting and modern AI practice.",
    "note": "Prompting changes the model input and interaction pattern; it does not retrain the base model.",
    "related": [
      "SentencePiece",
      "tokenizer",
      "vocabulary"
    ],
    "aliases": [
      "bpe"
    ],
    "category": "Language Models & Prompting"
  },
  {
    "word": "SentencePiece",
    "part": "noun",
    "pron": "",
    "definition": "A tokenization approach that learns subword units directly from raw text without requiring pre-tokenized words.",
    "example": "“The team used SentencePiece while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in language models & prompting and modern AI practice.",
    "note": "Prompting changes the model input and interaction pattern; it does not retrain the base model.",
    "related": [
      "vocabulary",
      "byte pair encoding",
      "context window"
    ],
    "aliases": [],
    "category": "Language Models & Prompting"
  },
  {
    "word": "vocabulary",
    "part": "noun",
    "pron": "",
    "definition": "The set of token IDs and token strings a tokenizer can represent directly.",
    "example": "“The team used vocabulary while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in language models & prompting and modern AI practice.",
    "note": "Prompting changes the model input and interaction pattern; it does not retrain the base model.",
    "related": [
      "context window",
      "SentencePiece",
      "context length"
    ],
    "aliases": [
      "token vocabulary"
    ],
    "category": "Language Models & Prompting"
  },
  {
    "word": "context length",
    "part": "noun",
    "pron": "",
    "definition": "The number of tokens or other units a model can consider within its active context.",
    "example": "“The team used context length while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in language models & prompting and modern AI practice.",
    "note": "Prompting changes the model input and interaction pattern; it does not retrain the base model.",
    "related": [
      "context engineering",
      "context window",
      "context management"
    ],
    "aliases": [
      "context window"
    ],
    "category": "Language Models & Prompting"
  },
  {
    "word": "context engineering",
    "part": "noun",
    "pron": "",
    "definition": "Designing, selecting, ordering, and compressing the information supplied to a model so it can perform a task well.",
    "example": "“The team used context engineering while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in language models & prompting and modern AI practice.",
    "note": "Prompting changes the model input and interaction pattern; it does not retrain the base model.",
    "related": [
      "context management",
      "context length",
      "context compaction"
    ],
    "aliases": [
      "context design"
    ],
    "category": "Language Models & Prompting"
  },
  {
    "word": "context management",
    "part": "noun",
    "pron": "",
    "definition": "The runtime process of deciding what information stays, leaves, or is summarized inside a model's working context.",
    "example": "“The team used context management while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in language models & prompting and modern AI practice.",
    "note": "Prompting changes the model input and interaction pattern; it does not retrain the base model.",
    "related": [
      "context compaction",
      "context engineering",
      "context rot"
    ],
    "aliases": [],
    "category": "Language Models & Prompting"
  },
  {
    "word": "context compaction",
    "part": "noun",
    "pron": "",
    "definition": "Reducing prior context into a smaller representation so a long-running agent or conversation can continue within context limits.",
    "example": "“The team used context compaction while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in language models & prompting and modern AI practice.",
    "note": "Prompting changes the model input and interaction pattern; it does not retrain the base model.",
    "related": [
      "context rot",
      "context management",
      "lost in the middle"
    ],
    "aliases": [
      "compaction"
    ],
    "category": "Language Models & Prompting"
  },
  {
    "word": "context rot",
    "part": "noun",
    "pron": "",
    "definition": "An informal term for quality degradation when a long context becomes noisy, stale, contradictory, or hard for the model to use effectively.",
    "example": "“The team used context rot while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in language models & prompting and modern AI practice.",
    "note": "Prompting changes the model input and interaction pattern; it does not retrain the base model.",
    "related": [
      "lost in the middle",
      "context compaction",
      "prompt"
    ],
    "aliases": [],
    "category": "Language Models & Prompting"
  },
  {
    "word": "lost in the middle",
    "part": "noun",
    "pron": "",
    "definition": "A tendency for models to use information near the beginning or end of long contexts more reliably than information buried in the middle.",
    "example": "“The team used lost in the middle while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in language models & prompting and modern AI practice.",
    "note": "Prompting changes the model input and interaction pattern; it does not retrain the base model.",
    "related": [
      "prompt",
      "context rot",
      "prompt engineering"
    ],
    "aliases": [],
    "category": "Language Models & Prompting"
  },
  {
    "word": "prompt engineering",
    "part": "noun",
    "pron": "",
    "definition": "The practice of designing and testing prompts to improve model behavior for a task.",
    "example": "“The team used prompt engineering while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in language models & prompting and modern AI practice.",
    "note": "Prompting changes the model input and interaction pattern; it does not retrain the base model.",
    "related": [
      "system prompt",
      "prompt",
      "developer message"
    ],
    "aliases": [],
    "category": "Language Models & Prompting"
  },
  {
    "word": "developer message",
    "part": "noun",
    "pron": "",
    "definition": "An instruction layer supplied by an application developer to steer model behavior below system-level rules and above ordinary user input.",
    "example": "“The team used developer message while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in language models & prompting and modern AI practice.",
    "note": "Prompting changes the model input and interaction pattern; it does not retrain the base model.",
    "related": [
      "user prompt",
      "system prompt",
      "prompt template"
    ],
    "aliases": [
      "developer prompt"
    ],
    "category": "Language Models & Prompting"
  },
  {
    "word": "user prompt",
    "part": "noun",
    "pron": "",
    "definition": "The request or content supplied by the end user to a model or assistant.",
    "example": "“The team used user prompt while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in language models & prompting and modern AI practice.",
    "note": "Prompting changes the model input and interaction pattern; it does not retrain the base model.",
    "related": [
      "prompt template",
      "developer message",
      "prompt library"
    ],
    "aliases": [
      "user message"
    ],
    "category": "Language Models & Prompting"
  },
  {
    "word": "prompt template",
    "part": "noun",
    "pron": "",
    "definition": "A reusable prompt structure with placeholders for task-specific values.",
    "example": "“The team used prompt template while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in language models & prompting and modern AI practice.",
    "note": "Prompting changes the model input and interaction pattern; it does not retrain the base model.",
    "related": [
      "prompt library",
      "user prompt",
      "prompt versioning"
    ],
    "aliases": [],
    "category": "Language Models & Prompting"
  },
  {
    "word": "prompt library",
    "part": "noun",
    "pron": "",
    "definition": "A maintained collection of reusable prompts, patterns, and examples.",
    "example": "“The team used prompt library while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in language models & prompting and modern AI practice.",
    "note": "Prompting changes the model input and interaction pattern; it does not retrain the base model.",
    "related": [
      "prompt versioning",
      "prompt template",
      "prompt chaining"
    ],
    "aliases": [],
    "category": "Language Models & Prompting"
  },
  {
    "word": "prompt versioning",
    "part": "noun",
    "pron": "",
    "definition": "Tracking changes to prompts so behavior can be compared, reproduced, and rolled back.",
    "example": "“The team used prompt versioning while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in language models & prompting and modern AI practice.",
    "note": "Prompting changes the model input and interaction pattern; it does not retrain the base model.",
    "related": [
      "prompt chaining",
      "prompt library",
      "zero-shot"
    ],
    "aliases": [],
    "category": "Language Models & Prompting"
  },
  {
    "word": "prompt chaining",
    "part": "noun",
    "pron": "",
    "definition": "Breaking a larger task into a sequence of model calls where one result feeds the next.",
    "example": "“The team used prompt chaining while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in language models & prompting and modern AI practice.",
    "note": "Prompting changes the model input and interaction pattern; it does not retrain the base model.",
    "related": [
      "zero-shot",
      "prompt versioning",
      "one-shot"
    ],
    "aliases": [
      "prompt chain"
    ],
    "category": "Language Models & Prompting"
  },
  {
    "word": "zero-shot",
    "part": "noun",
    "pron": "",
    "definition": "Asking a model to perform a task without giving task-specific examples in the prompt.",
    "example": "“The team used zero-shot while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in language models & prompting and modern AI practice.",
    "note": "Prompting changes the model input and interaction pattern; it does not retrain the base model.",
    "related": [
      "one-shot",
      "prompt chaining",
      "few-shot"
    ],
    "aliases": [],
    "category": "Language Models & Prompting"
  },
  {
    "word": "one-shot",
    "part": "noun",
    "pron": "",
    "definition": "Prompting with exactly one demonstration example before the target task.",
    "example": "“The team used one-shot while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in language models & prompting and modern AI practice.",
    "note": "Prompting changes the model input and interaction pattern; it does not retrain the base model.",
    "related": [
      "few-shot",
      "zero-shot",
      "in-context learning"
    ],
    "aliases": [],
    "category": "Language Models & Prompting"
  },
  {
    "word": "in-context learning",
    "part": "noun",
    "pron": "",
    "definition": "A model's ability to adapt its behavior from examples or instructions inside the current context without changing its weights.",
    "example": "“The team used in-context learning while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in language models & prompting and modern AI practice.",
    "note": "Prompting changes the model input and interaction pattern; it does not retrain the base model.",
    "related": [
      "instruction following",
      "few-shot",
      "instruction hierarchy"
    ],
    "aliases": [
      "icl"
    ],
    "category": "Language Models & Prompting"
  },
  {
    "word": "instruction following",
    "part": "noun",
    "pron": "",
    "definition": "A model's ability to interpret and obey natural-language directions while respecting higher-priority constraints.",
    "example": "“The team used instruction following while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in language models & prompting and modern AI practice.",
    "note": "Prompting changes the model input and interaction pattern; it does not retrain the base model.",
    "related": [
      "instruction hierarchy",
      "in-context learning",
      "role prompting"
    ],
    "aliases": [],
    "category": "Language Models & Prompting"
  },
  {
    "word": "instruction hierarchy",
    "part": "noun",
    "pron": "",
    "definition": "Rules describing which instruction sources take precedence when prompts conflict.",
    "example": "“The team used instruction hierarchy while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in language models & prompting and modern AI practice.",
    "note": "Prompting changes the model input and interaction pattern; it does not retrain the base model.",
    "related": [
      "role prompting",
      "instruction following",
      "chain of thought"
    ],
    "aliases": [
      "prompt hierarchy"
    ],
    "category": "Language Models & Prompting"
  },
  {
    "word": "role prompting",
    "part": "noun",
    "pron": "",
    "definition": "Prompting that assigns the model a role, perspective, or operating frame to influence its response.",
    "example": "“The team used role prompting while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in language models & prompting and modern AI practice.",
    "note": "Prompting changes the model input and interaction pattern; it does not retrain the base model.",
    "related": [
      "chain of thought",
      "instruction hierarchy",
      "reasoning trace"
    ],
    "aliases": [
      "persona prompting"
    ],
    "category": "Language Models & Prompting"
  },
  {
    "word": "reasoning trace",
    "part": "noun",
    "pron": "",
    "definition": "A record or summary of intermediate decisions, tool calls, or steps taken while solving a task.",
    "example": "“The team used reasoning trace while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in language models & prompting and modern AI practice.",
    "note": "Prompting changes the model input and interaction pattern; it does not retrain the base model.",
    "related": [
      "scratchpad",
      "chain of thought",
      "reasoning token"
    ],
    "aliases": [
      "trace"
    ],
    "category": "Language Models & Prompting"
  },
  {
    "word": "scratchpad",
    "part": "noun",
    "pron": "",
    "definition": "Temporary working information used during problem solving, either explicitly represented or internally managed.",
    "example": "“The team used scratchpad while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in language models & prompting and modern AI practice.",
    "note": "Prompting changes the model input and interaction pattern; it does not retrain the base model.",
    "related": [
      "reasoning token",
      "reasoning trace",
      "reasoning effort"
    ],
    "aliases": [],
    "category": "Language Models & Prompting"
  },
  {
    "word": "reasoning token",
    "part": "noun",
    "pron": "",
    "definition": "A token budget used by some reasoning models for internal computation before producing a final answer.",
    "example": "“The team used reasoning token while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in language models & prompting and modern AI practice.",
    "note": "Prompting changes the model input and interaction pattern; it does not retrain the base model.",
    "related": [
      "reasoning effort",
      "scratchpad",
      "reasoning summary"
    ],
    "aliases": [
      "thinking token"
    ],
    "category": "Language Models & Prompting"
  },
  {
    "word": "reasoning effort",
    "part": "noun",
    "pron": "",
    "definition": "A control or concept describing how much inference-time computation a reasoning model should spend on a problem.",
    "example": "“The team used reasoning effort while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in language models & prompting and modern AI practice.",
    "note": "Prompting changes the model input and interaction pattern; it does not retrain the base model.",
    "related": [
      "reasoning summary",
      "reasoning token",
      "self-consistency"
    ],
    "aliases": [
      "thinking effort"
    ],
    "category": "Language Models & Prompting"
  },
  {
    "word": "reasoning summary",
    "part": "noun",
    "pron": "",
    "definition": "A concise user-facing summary of the approach or factors involved in a model's reasoning, rather than a raw private chain of thought.",
    "example": "“The team used reasoning summary while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in language models & prompting and modern AI practice.",
    "note": "Prompting changes the model input and interaction pattern; it does not retrain the base model.",
    "related": [
      "self-consistency",
      "reasoning effort",
      "ReAct"
    ],
    "aliases": [],
    "category": "Language Models & Prompting"
  },
  {
    "word": "self-consistency",
    "part": "noun",
    "pron": "",
    "definition": "A reasoning technique that samples multiple candidate solution paths and chooses an answer supported by several paths.",
    "example": "“The team used self-consistency while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in language models & prompting and modern AI practice.",
    "note": "Prompting changes the model input and interaction pattern; it does not retrain the base model.",
    "related": [
      "ReAct",
      "reasoning summary",
      "reflection"
    ],
    "aliases": [],
    "category": "Language Models & Prompting"
  },
  {
    "word": "ReAct",
    "part": "noun",
    "pron": "",
    "definition": "A prompting and agent pattern that interleaves reasoning with actions such as tool calls.",
    "example": "“The team used ReAct while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in language models & prompting and modern AI practice.",
    "note": "Prompting changes the model input and interaction pattern; it does not retrain the base model.",
    "related": [
      "reflection",
      "self-consistency",
      "verifier"
    ],
    "aliases": [
      "reason and act"
    ],
    "category": "Language Models & Prompting"
  },
  {
    "word": "reflection",
    "part": "noun",
    "pron": "",
    "definition": "A pattern where a model reviews its own output or prior steps and attempts to correct weaknesses.",
    "example": "“The team used reflection while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in language models & prompting and modern AI practice.",
    "note": "Prompting changes the model input and interaction pattern; it does not retrain the base model.",
    "related": [
      "verifier",
      "ReAct",
      "best-of-N"
    ],
    "aliases": [],
    "category": "Language Models & Prompting"
  },
  {
    "word": "verifier",
    "part": "noun",
    "pron": "",
    "definition": "A model or component that checks candidate answers, plans, code, or reasoning for correctness.",
    "example": "“The team used verifier while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in language models & prompting and modern AI practice.",
    "note": "Prompting changes the model input and interaction pattern; it does not retrain the base model.",
    "related": [
      "best-of-N",
      "reflection",
      "prompt caching"
    ],
    "aliases": [
      "critic model"
    ],
    "category": "Language Models & Prompting"
  },
  {
    "word": "best-of-N",
    "part": "noun",
    "pron": "",
    "definition": "Generating several candidate outputs and selecting the best one using a scorer, reward model, or judge.",
    "example": "“The team used best-of-N while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in language models & prompting and modern AI practice.",
    "note": "Prompting changes the model input and interaction pattern; it does not retrain the base model.",
    "related": [
      "prompt caching",
      "verifier",
      "semantic cache"
    ],
    "aliases": [
      "best of n"
    ],
    "category": "Language Models & Prompting"
  },
  {
    "word": "prompt caching",
    "part": "noun",
    "pron": "",
    "definition": "Reusing previously processed prompt prefixes or context so repeated requests can be faster or cheaper.",
    "example": "“The team used prompt caching while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in language models & prompting and modern AI practice.",
    "note": "Prompting changes the model input and interaction pattern; it does not retrain the base model.",
    "related": [
      "semantic cache",
      "best-of-N",
      "token"
    ],
    "aliases": [
      "prefix caching"
    ],
    "category": "Language Models & Prompting"
  },
  {
    "word": "semantic cache",
    "part": "noun",
    "pron": "",
    "definition": "A cache that reuses prior outputs when a new request is semantically similar enough to an earlier request.",
    "example": "“The team used semantic cache while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in language models & prompting and modern AI practice.",
    "note": "Prompting changes the model input and interaction pattern; it does not retrain the base model.",
    "related": [
      "token",
      "prompt caching",
      "tokenization"
    ],
    "aliases": [],
    "category": "Language Models & Prompting"
  },
  {
    "word": "logit",
    "part": "noun",
    "pron": "",
    "definition": "An unnormalized score produced by a model before converting scores into probabilities.",
    "example": "“The team used logit while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in generation & decoding and modern AI practice.",
    "note": "Decoding controls how model probabilities become an actual output.",
    "related": [
      "softmax",
      "assisted generation",
      "probability distribution"
    ],
    "aliases": [],
    "category": "Generation & Decoding"
  },
  {
    "word": "softmax",
    "part": "noun",
    "pron": "",
    "definition": "A function that converts a vector of scores into a probability distribution that sums to one.",
    "example": "“The team used softmax while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in generation & decoding and modern AI practice.",
    "note": "Decoding controls how model probabilities become an actual output.",
    "related": [
      "probability distribution",
      "logit",
      "sampling"
    ],
    "aliases": [],
    "category": "Generation & Decoding"
  },
  {
    "word": "probability distribution",
    "part": "noun",
    "pron": "",
    "definition": "A set of probabilities describing how likely different outcomes are under a model.",
    "example": "“The team used probability distribution while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in generation & decoding and modern AI practice.",
    "note": "Decoding controls how model probabilities become an actual output.",
    "related": [
      "sampling",
      "softmax",
      "greedy decoding"
    ],
    "aliases": [],
    "category": "Generation & Decoding"
  },
  {
    "word": "sampling",
    "part": "noun",
    "pron": "",
    "definition": "Choosing an output from a model's probability distribution rather than always taking the highest-probability option.",
    "example": "“The team used sampling while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in generation & decoding and modern AI practice.",
    "note": "Decoding controls how model probabilities become an actual output.",
    "related": [
      "greedy decoding",
      "probability distribution",
      "beam search"
    ],
    "aliases": [],
    "category": "Generation & Decoding"
  },
  {
    "word": "greedy decoding",
    "part": "noun",
    "pron": "",
    "definition": "Generating by choosing the highest-probability next token at every step.",
    "example": "“The team used greedy decoding while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in generation & decoding and modern AI practice.",
    "note": "Decoding controls how model probabilities become an actual output.",
    "related": [
      "beam search",
      "sampling",
      "temperature"
    ],
    "aliases": [
      "greedy search"
    ],
    "category": "Generation & Decoding"
  },
  {
    "word": "beam search",
    "part": "noun",
    "pron": "",
    "definition": "A decoding method that keeps several high-scoring partial sequences and expands them in parallel.",
    "example": "“The team used beam search while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in generation & decoding and modern AI practice.",
    "note": "Decoding controls how model probabilities become an actual output.",
    "related": [
      "temperature",
      "greedy decoding",
      "top-k"
    ],
    "aliases": [],
    "category": "Generation & Decoding"
  },
  {
    "word": "temperature",
    "part": "noun",
    "pron": "",
    "definition": "A decoding control that changes how peaked or flat the token probability distribution is before sampling.",
    "example": "“The team used temperature while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in generation & decoding and modern AI practice.",
    "note": "Decoding controls how model probabilities become an actual output.",
    "related": [
      "top-k",
      "beam search",
      "top-p"
    ],
    "aliases": [],
    "category": "Generation & Decoding"
  },
  {
    "word": "top-k",
    "part": "noun",
    "pron": "",
    "definition": "A sampling method that limits candidate next tokens to the k highest-probability options.",
    "example": "“The team used top-k while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in generation & decoding and modern AI practice.",
    "note": "Decoding controls how model probabilities become an actual output.",
    "related": [
      "top-p",
      "temperature",
      "typical sampling"
    ],
    "aliases": [
      "top k"
    ],
    "category": "Generation & Decoding"
  },
  {
    "word": "top-p",
    "part": "noun",
    "pron": "",
    "definition": "Nucleus sampling; a method that keeps the smallest set of tokens whose cumulative probability exceeds a threshold.",
    "example": "“The team used top-p while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in generation & decoding and modern AI practice.",
    "note": "Decoding controls how model probabilities become an actual output.",
    "related": [
      "typical sampling",
      "top-k",
      "min-p"
    ],
    "aliases": [
      "nucleus sampling"
    ],
    "category": "Generation & Decoding"
  },
  {
    "word": "typical sampling",
    "part": "noun",
    "pron": "",
    "definition": "A decoding method that favors tokens whose information content is close to the distribution's typical information content.",
    "example": "“The team used typical sampling while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in generation & decoding and modern AI practice.",
    "note": "Decoding controls how model probabilities become an actual output.",
    "related": [
      "min-p",
      "top-p",
      "repetition penalty"
    ],
    "aliases": [],
    "category": "Generation & Decoding"
  },
  {
    "word": "min-p",
    "part": "noun",
    "pron": "",
    "definition": "A sampling rule that removes tokens whose probability falls below a fraction of the most likely token's probability.",
    "example": "“The team used min-p while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in generation & decoding and modern AI practice.",
    "note": "Decoding controls how model probabilities become an actual output.",
    "related": [
      "repetition penalty",
      "typical sampling",
      "frequency penalty"
    ],
    "aliases": [
      "min p"
    ],
    "category": "Generation & Decoding"
  },
  {
    "word": "repetition penalty",
    "part": "noun",
    "pron": "",
    "definition": "A decoding adjustment that discourages repeating tokens or phrases already generated.",
    "example": "“The team used repetition penalty while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in generation & decoding and modern AI practice.",
    "note": "Decoding controls how model probabilities become an actual output.",
    "related": [
      "frequency penalty",
      "min-p",
      "presence penalty"
    ],
    "aliases": [],
    "category": "Generation & Decoding"
  },
  {
    "word": "frequency penalty",
    "part": "noun",
    "pron": "",
    "definition": "A decoding adjustment that penalizes tokens according to how often they have already appeared.",
    "example": "“The team used frequency penalty while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in generation & decoding and modern AI practice.",
    "note": "Decoding controls how model probabilities become an actual output.",
    "related": [
      "presence penalty",
      "repetition penalty",
      "stop sequence"
    ],
    "aliases": [],
    "category": "Generation & Decoding"
  },
  {
    "word": "presence penalty",
    "part": "noun",
    "pron": "",
    "definition": "A decoding adjustment that penalizes tokens simply for having appeared at least once.",
    "example": "“The team used presence penalty while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in generation & decoding and modern AI practice.",
    "note": "Decoding controls how model probabilities become an actual output.",
    "related": [
      "stop sequence",
      "frequency penalty",
      "end-of-sequence token"
    ],
    "aliases": [],
    "category": "Generation & Decoding"
  },
  {
    "word": "stop sequence",
    "part": "noun",
    "pron": "",
    "definition": "A token sequence that causes generation to end when encountered.",
    "example": "“The team used stop sequence while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in generation & decoding and modern AI practice.",
    "note": "Decoding controls how model probabilities become an actual output.",
    "related": [
      "end-of-sequence token",
      "presence penalty",
      "maximum output tokens"
    ],
    "aliases": [
      "stop token"
    ],
    "category": "Generation & Decoding"
  },
  {
    "word": "end-of-sequence token",
    "part": "noun",
    "pron": "",
    "definition": "A special token used to mark the end of generated content.",
    "example": "“The team used end-of-sequence token while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in generation & decoding and modern AI practice.",
    "note": "Decoding controls how model probabilities become an actual output.",
    "related": [
      "maximum output tokens",
      "stop sequence",
      "structured output"
    ],
    "aliases": [
      "eos"
    ],
    "category": "Generation & Decoding"
  },
  {
    "word": "maximum output tokens",
    "part": "noun",
    "pron": "",
    "definition": "A limit on how many tokens a model may generate in a response.",
    "example": "“The team used maximum output tokens while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in generation & decoding and modern AI practice.",
    "note": "Decoding controls how model probabilities become an actual output.",
    "related": [
      "structured output",
      "end-of-sequence token",
      "constrained decoding"
    ],
    "aliases": [
      "max tokens"
    ],
    "category": "Generation & Decoding"
  },
  {
    "word": "structured output",
    "part": "noun",
    "pron": "",
    "definition": "Model output constrained to a specified structure such as JSON that conforms to a schema.",
    "example": "“The team used structured output while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in generation & decoding and modern AI practice.",
    "note": "Decoding controls how model probabilities become an actual output.",
    "related": [
      "constrained decoding",
      "maximum output tokens",
      "JSON schema"
    ],
    "aliases": [
      "structured generation"
    ],
    "category": "Generation & Decoding"
  },
  {
    "word": "constrained decoding",
    "part": "noun",
    "pron": "",
    "definition": "Restricting token choices during generation so the output follows a grammar, schema, or other formal constraint.",
    "example": "“The team used constrained decoding while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in generation & decoding and modern AI practice.",
    "note": "Decoding controls how model probabilities become an actual output.",
    "related": [
      "JSON schema",
      "structured output",
      "streaming"
    ],
    "aliases": [
      "guided decoding"
    ],
    "category": "Generation & Decoding"
  },
  {
    "word": "JSON schema",
    "part": "noun",
    "pron": "",
    "definition": "A machine-readable description of allowed JSON structure, types, and required fields, often used to constrain model output.",
    "example": "“The team used JSON schema while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in generation & decoding and modern AI practice.",
    "note": "Decoding controls how model probabilities become an actual output.",
    "related": [
      "streaming",
      "constrained decoding",
      "time to first token"
    ],
    "aliases": [],
    "category": "Generation & Decoding"
  },
  {
    "word": "streaming",
    "part": "noun",
    "pron": "",
    "definition": "Returning generated output incrementally as tokens or events become available instead of waiting for the full response.",
    "example": "“The team used streaming while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in generation & decoding and modern AI practice.",
    "note": "Decoding controls how model probabilities become an actual output.",
    "related": [
      "time to first token",
      "JSON schema",
      "throughput"
    ],
    "aliases": [],
    "category": "Generation & Decoding"
  },
  {
    "word": "time to first token",
    "part": "noun",
    "pron": "",
    "definition": "The delay between sending a request and receiving the first generated token.",
    "example": "“The team used time to first token while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in generation & decoding and modern AI practice.",
    "note": "Decoding controls how model probabilities become an actual output.",
    "related": [
      "throughput",
      "streaming",
      "latency"
    ],
    "aliases": [
      "ttft"
    ],
    "category": "Generation & Decoding"
  },
  {
    "word": "throughput",
    "part": "noun",
    "pron": "",
    "definition": "The amount of model work completed per unit time, often measured in tokens per second or requests per second.",
    "example": "“The team used throughput while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in generation & decoding and modern AI practice.",
    "note": "Decoding controls how model probabilities become an actual output.",
    "related": [
      "latency",
      "time to first token",
      "speculative decoding"
    ],
    "aliases": [],
    "category": "Generation & Decoding"
  },
  {
    "word": "speculative decoding",
    "part": "noun",
    "pron": "",
    "definition": "An inference technique in which a smaller draft model proposes tokens that a larger model verifies in batches.",
    "example": "“The team used speculative decoding while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in generation & decoding and modern AI practice.",
    "note": "Decoding controls how model probabilities become an actual output.",
    "related": [
      "assisted generation",
      "latency",
      "logit"
    ],
    "aliases": [
      "speculative sampling"
    ],
    "category": "Generation & Decoding"
  },
  {
    "word": "assisted generation",
    "part": "noun",
    "pron": "",
    "definition": "Generation accelerated by using another model or heuristic to propose candidate tokens for verification.",
    "example": "“The team used assisted generation while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in generation & decoding and modern AI practice.",
    "note": "Decoding controls how model probabilities become an actual output.",
    "related": [
      "logit",
      "speculative decoding",
      "softmax"
    ],
    "aliases": [],
    "category": "Generation & Decoding"
  },
  {
    "word": "supervised learning",
    "part": "noun",
    "pron": "",
    "definition": "Learning from labeled examples that pair inputs with desired outputs.",
    "example": "“The team used supervised learning while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in training & adaptation and modern AI practice.",
    "note": "Training terms describe how model behavior is learned, specialized, or updated.",
    "related": [
      "unsupervised learning",
      "Bayesian optimization",
      "self-supervised learning"
    ],
    "aliases": [],
    "category": "Training & Adaptation"
  },
  {
    "word": "unsupervised learning",
    "part": "noun",
    "pron": "",
    "definition": "Learning structure or patterns from data without explicit target labels.",
    "example": "“The team used unsupervised learning while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in training & adaptation and modern AI practice.",
    "note": "Training terms describe how model behavior is learned, specialized, or updated.",
    "related": [
      "self-supervised learning",
      "supervised learning",
      "semi-supervised learning"
    ],
    "aliases": [],
    "category": "Training & Adaptation"
  },
  {
    "word": "self-supervised learning",
    "part": "noun",
    "pron": "",
    "definition": "Learning from labels or prediction targets derived automatically from the data itself.",
    "example": "“The team used self-supervised learning while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in training & adaptation and modern AI practice.",
    "note": "Training terms describe how model behavior is learned, specialized, or updated.",
    "related": [
      "semi-supervised learning",
      "unsupervised learning",
      "transfer learning"
    ],
    "aliases": [],
    "category": "Training & Adaptation"
  },
  {
    "word": "semi-supervised learning",
    "part": "noun",
    "pron": "",
    "definition": "Training that combines a smaller labeled dataset with a larger unlabeled dataset.",
    "example": "“The team used semi-supervised learning while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in training & adaptation and modern AI practice.",
    "note": "Training terms describe how model behavior is learned, specialized, or updated.",
    "related": [
      "transfer learning",
      "self-supervised learning",
      "fine-tuning"
    ],
    "aliases": [],
    "category": "Training & Adaptation"
  },
  {
    "word": "transfer learning",
    "part": "noun",
    "pron": "",
    "definition": "Adapting knowledge learned on one task or dataset to another task.",
    "example": "“The team used transfer learning while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in training & adaptation and modern AI practice.",
    "note": "Training terms describe how model behavior is learned, specialized, or updated.",
    "related": [
      "fine-tuning",
      "semi-supervised learning",
      "full fine-tuning"
    ],
    "aliases": [
      "transfer learning"
    ],
    "category": "Training & Adaptation"
  },
  {
    "word": "fine-tuning",
    "part": "noun",
    "pron": "",
    "definition": "Continuing training on a pretrained model to specialize its behavior for a dataset or task.",
    "example": "“The team used fine-tuning while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in training & adaptation and modern AI practice.",
    "note": "Training terms describe how model behavior is learned, specialized, or updated.",
    "related": [
      "full fine-tuning",
      "transfer learning",
      "parameter-efficient fine-tuning"
    ],
    "aliases": [
      "finetuning"
    ],
    "category": "Training & Adaptation"
  },
  {
    "word": "full fine-tuning",
    "part": "noun",
    "pron": "",
    "definition": "Fine-tuning in which most or all model parameters are updated.",
    "example": "“The team used full fine-tuning while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in training & adaptation and modern AI practice.",
    "note": "Training terms describe how model behavior is learned, specialized, or updated.",
    "related": [
      "parameter-efficient fine-tuning",
      "fine-tuning",
      "LoRA"
    ],
    "aliases": [
      "full parameter fine tuning"
    ],
    "category": "Training & Adaptation"
  },
  {
    "word": "parameter-efficient fine-tuning",
    "part": "noun",
    "pron": "",
    "definition": "Adapting a model by training a small set of added or selected parameters instead of updating the entire model.",
    "example": "“The team used parameter-efficient fine-tuning while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in training & adaptation and modern AI practice.",
    "note": "Training terms describe how model behavior is learned, specialized, or updated.",
    "related": [
      "LoRA",
      "full fine-tuning",
      "QLoRA"
    ],
    "aliases": [
      "peft"
    ],
    "category": "Training & Adaptation"
  },
  {
    "word": "LoRA",
    "part": "noun",
    "pron": "",
    "definition": "Low-rank adaptation; a parameter-efficient method that learns low-rank weight updates while keeping the base weights mostly frozen.",
    "example": "“The team used LoRA while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in training & adaptation and modern AI practice.",
    "note": "Training terms describe how model behavior is learned, specialized, or updated.",
    "related": [
      "QLoRA",
      "parameter-efficient fine-tuning",
      "adapter"
    ],
    "aliases": [
      "low rank adaptation"
    ],
    "category": "Training & Adaptation"
  },
  {
    "word": "QLoRA",
    "part": "noun",
    "pron": "",
    "definition": "A memory-efficient adaptation method that combines low-rank adapters with a quantized frozen base model.",
    "example": "“The team used QLoRA while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in training & adaptation and modern AI practice.",
    "note": "Training terms describe how model behavior is learned, specialized, or updated.",
    "related": [
      "adapter",
      "LoRA",
      "prefix tuning"
    ],
    "aliases": [
      "quantized lora"
    ],
    "category": "Training & Adaptation"
  },
  {
    "word": "adapter",
    "part": "noun",
    "pron": "",
    "definition": "A small trainable module inserted into or attached to a pretrained model for efficient specialization.",
    "example": "“The team used adapter while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in training & adaptation and modern AI practice.",
    "note": "Training terms describe how model behavior is learned, specialized, or updated.",
    "related": [
      "prefix tuning",
      "QLoRA",
      "prompt tuning"
    ],
    "aliases": [],
    "category": "Training & Adaptation"
  },
  {
    "word": "prefix tuning",
    "part": "noun",
    "pron": "",
    "definition": "A parameter-efficient method that learns task-specific virtual prefix representations while keeping most model weights frozen.",
    "example": "“The team used prefix tuning while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in training & adaptation and modern AI practice.",
    "note": "Training terms describe how model behavior is learned, specialized, or updated.",
    "related": [
      "prompt tuning",
      "adapter",
      "instruction tuning"
    ],
    "aliases": [],
    "category": "Training & Adaptation"
  },
  {
    "word": "prompt tuning",
    "part": "noun",
    "pron": "",
    "definition": "A parameter-efficient method that learns continuous prompt embeddings rather than editing the model's main weights.",
    "example": "“The team used prompt tuning while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in training & adaptation and modern AI practice.",
    "note": "Training terms describe how model behavior is learned, specialized, or updated.",
    "related": [
      "instruction tuning",
      "prefix tuning",
      "supervised fine-tuning"
    ],
    "aliases": [
      "soft prompt tuning"
    ],
    "category": "Training & Adaptation"
  },
  {
    "word": "instruction tuning",
    "part": "noun",
    "pron": "",
    "definition": "Fine-tuning on instruction-response examples so a model becomes better at following natural-language tasks.",
    "example": "“The team used instruction tuning while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in training & adaptation and modern AI practice.",
    "note": "Training terms describe how model behavior is learned, specialized, or updated.",
    "related": [
      "supervised fine-tuning",
      "prompt tuning",
      "preference tuning"
    ],
    "aliases": [
      "instruction fine tuning"
    ],
    "category": "Training & Adaptation"
  },
  {
    "word": "supervised fine-tuning",
    "part": "noun",
    "pron": "",
    "definition": "Post-training on curated input-output examples using a supervised learning objective.",
    "example": "“The team used supervised fine-tuning while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in training & adaptation and modern AI practice.",
    "note": "Training terms describe how model behavior is learned, specialized, or updated.",
    "related": [
      "preference tuning",
      "instruction tuning",
      "reward model"
    ],
    "aliases": [
      "sft"
    ],
    "category": "Training & Adaptation"
  },
  {
    "word": "preference tuning",
    "part": "noun",
    "pron": "",
    "definition": "Training a model using comparisons or preference signals so preferred responses become more likely.",
    "example": "“The team used preference tuning while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in training & adaptation and modern AI practice.",
    "note": "Training terms describe how model behavior is learned, specialized, or updated.",
    "related": [
      "reward model",
      "supervised fine-tuning",
      "RLHF"
    ],
    "aliases": [],
    "category": "Training & Adaptation"
  },
  {
    "word": "reward model",
    "part": "noun",
    "pron": "",
    "definition": "A model trained to score outputs according to human, model, or rule-based preferences.",
    "example": "“The team used reward model while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in training & adaptation and modern AI practice.",
    "note": "Training terms describe how model behavior is learned, specialized, or updated.",
    "related": [
      "RLHF",
      "preference tuning",
      "RLAIF"
    ],
    "aliases": [
      "rm"
    ],
    "category": "Training & Adaptation"
  },
  {
    "word": "RLHF",
    "part": "noun",
    "pron": "",
    "definition": "Reinforcement learning from human feedback; a family of methods that use human preference data to train or align models.",
    "example": "“The team used RLHF while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in training & adaptation and modern AI practice.",
    "note": "Training terms describe how model behavior is learned, specialized, or updated.",
    "related": [
      "RLAIF",
      "reward model",
      "DPO"
    ],
    "aliases": [
      "reinforcement learning from human feedback"
    ],
    "category": "Training & Adaptation"
  },
  {
    "word": "RLAIF",
    "part": "noun",
    "pron": "",
    "definition": "Reinforcement learning from AI feedback; using model-generated preference judgments or critiques as training signals.",
    "example": "“The team used RLAIF while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in training & adaptation and modern AI practice.",
    "note": "Training terms describe how model behavior is learned, specialized, or updated.",
    "related": [
      "DPO",
      "RLHF",
      "PPO"
    ],
    "aliases": [
      "reinforcement learning from ai feedback"
    ],
    "category": "Training & Adaptation"
  },
  {
    "word": "DPO",
    "part": "noun",
    "pron": "",
    "definition": "Direct preference optimization; a method that directly optimizes a language model from preference pairs without a separate online RL loop.",
    "example": "“The team used DPO while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in training & adaptation and modern AI practice.",
    "note": "Training terms describe how model behavior is learned, specialized, or updated.",
    "related": [
      "PPO",
      "RLAIF",
      "GRPO"
    ],
    "aliases": [
      "direct preference optimization"
    ],
    "category": "Training & Adaptation"
  },
  {
    "word": "PPO",
    "part": "noun",
    "pron": "",
    "definition": "Proximal policy optimization; a reinforcement-learning algorithm commonly used in earlier RLHF pipelines.",
    "example": "“The team used PPO while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in training & adaptation and modern AI practice.",
    "note": "Training terms describe how model behavior is learned, specialized, or updated.",
    "related": [
      "GRPO",
      "DPO",
      "constitutional AI"
    ],
    "aliases": [
      "proximal policy optimization"
    ],
    "category": "Training & Adaptation"
  },
  {
    "word": "GRPO",
    "part": "noun",
    "pron": "",
    "definition": "Group relative policy optimization; a policy-optimization method that compares rewards among groups of sampled outputs.",
    "example": "“The team used GRPO while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in training & adaptation and modern AI practice.",
    "note": "Training terms describe how model behavior is learned, specialized, or updated.",
    "related": [
      "constitutional AI",
      "PPO",
      "distillation"
    ],
    "aliases": [
      "group relative policy optimization"
    ],
    "category": "Training & Adaptation"
  },
  {
    "word": "constitutional AI",
    "part": "noun",
    "pron": "",
    "definition": "An alignment approach that uses explicit principles to guide critiques, revisions, or preference training.",
    "example": "“The team used constitutional AI while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in training & adaptation and modern AI practice.",
    "note": "Training terms describe how model behavior is learned, specialized, or updated.",
    "related": [
      "distillation",
      "GRPO",
      "teacher model"
    ],
    "aliases": [
      "cai"
    ],
    "category": "Training & Adaptation"
  },
  {
    "word": "distillation",
    "part": "noun",
    "pron": "",
    "definition": "Training a smaller or cheaper model to reproduce useful behavior from a larger teacher model.",
    "example": "“The team used distillation while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in training & adaptation and modern AI practice.",
    "note": "Training terms describe how model behavior is learned, specialized, or updated.",
    "related": [
      "teacher model",
      "constitutional AI",
      "student model"
    ],
    "aliases": [
      "knowledge distillation"
    ],
    "category": "Training & Adaptation"
  },
  {
    "word": "teacher model",
    "part": "noun",
    "pron": "",
    "definition": "A model whose outputs, probabilities, or behavior are used to train another model.",
    "example": "“The team used teacher model while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in training & adaptation and modern AI practice.",
    "note": "Training terms describe how model behavior is learned, specialized, or updated.",
    "related": [
      "student model",
      "distillation",
      "synthetic data"
    ],
    "aliases": [
      "teacher"
    ],
    "category": "Training & Adaptation"
  },
  {
    "word": "student model",
    "part": "noun",
    "pron": "",
    "definition": "A model trained to imitate or learn from a teacher model.",
    "example": "“The team used student model while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in training & adaptation and modern AI practice.",
    "note": "Training terms describe how model behavior is learned, specialized, or updated.",
    "related": [
      "synthetic data",
      "teacher model",
      "data augmentation"
    ],
    "aliases": [
      "student"
    ],
    "category": "Training & Adaptation"
  },
  {
    "word": "synthetic data",
    "part": "noun",
    "pron": "",
    "definition": "Training or evaluation data generated partly or entirely by models or simulation rather than collected directly from humans or the world.",
    "example": "“The team used synthetic data while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in training & adaptation and modern AI practice.",
    "note": "Training terms describe how model behavior is learned, specialized, or updated.",
    "related": [
      "data augmentation",
      "student model",
      "curriculum learning"
    ],
    "aliases": [
      "generated data"
    ],
    "category": "Training & Adaptation"
  },
  {
    "word": "data augmentation",
    "part": "noun",
    "pron": "",
    "definition": "Creating modified versions of training examples to improve robustness or expand effective dataset diversity.",
    "example": "“The team used data augmentation while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in training & adaptation and modern AI practice.",
    "note": "Training terms describe how model behavior is learned, specialized, or updated.",
    "related": [
      "curriculum learning",
      "synthetic data",
      "continual learning"
    ],
    "aliases": [],
    "category": "Training & Adaptation"
  },
  {
    "word": "curriculum learning",
    "part": "noun",
    "pron": "",
    "definition": "Training on examples in a deliberate order, often from easier to harder or from broad to specialized.",
    "example": "“The team used curriculum learning while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in training & adaptation and modern AI practice.",
    "note": "Training terms describe how model behavior is learned, specialized, or updated.",
    "related": [
      "continual learning",
      "data augmentation",
      "catastrophic forgetting"
    ],
    "aliases": [],
    "category": "Training & Adaptation"
  },
  {
    "word": "continual learning",
    "part": "noun",
    "pron": "",
    "definition": "Updating a model over time with new tasks or data while trying to preserve earlier capabilities.",
    "example": "“The team used continual learning while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in training & adaptation and modern AI practice.",
    "note": "Training terms describe how model behavior is learned, specialized, or updated.",
    "related": [
      "catastrophic forgetting",
      "curriculum learning",
      "checkpoint"
    ],
    "aliases": [
      "lifelong learning"
    ],
    "category": "Training & Adaptation"
  },
  {
    "word": "catastrophic forgetting",
    "part": "noun",
    "pron": "",
    "definition": "Loss of previously learned capabilities when further training strongly adapts a model to new data or tasks.",
    "example": "“The team used catastrophic forgetting while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in training & adaptation and modern AI practice.",
    "note": "Training terms describe how model behavior is learned, specialized, or updated.",
    "related": [
      "checkpoint",
      "continual learning",
      "epoch"
    ],
    "aliases": [],
    "category": "Training & Adaptation"
  },
  {
    "word": "checkpoint",
    "part": "noun",
    "pron": "",
    "definition": "A saved snapshot of model weights and training state that can be resumed or evaluated later.",
    "example": "“The team used checkpoint while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in training & adaptation and modern AI practice.",
    "note": "Training terms describe how model behavior is learned, specialized, or updated.",
    "related": [
      "epoch",
      "catastrophic forgetting",
      "training step"
    ],
    "aliases": [
      "model checkpoint"
    ],
    "category": "Training & Adaptation"
  },
  {
    "word": "epoch",
    "part": "noun",
    "pron": "",
    "definition": "One full pass through the training dataset.",
    "example": "“The team used epoch while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in training & adaptation and modern AI practice.",
    "note": "Training terms describe how model behavior is learned, specialized, or updated.",
    "related": [
      "training step",
      "checkpoint",
      "batch"
    ],
    "aliases": [],
    "category": "Training & Adaptation"
  },
  {
    "word": "training step",
    "part": "noun",
    "pron": "",
    "definition": "One optimizer update during training, usually after processing one batch or accumulated set of microbatches.",
    "example": "“The team used training step while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in training & adaptation and modern AI practice.",
    "note": "Training terms describe how model behavior is learned, specialized, or updated.",
    "related": [
      "batch",
      "epoch",
      "batch size"
    ],
    "aliases": [
      "step"
    ],
    "category": "Training & Adaptation"
  },
  {
    "word": "batch",
    "part": "noun",
    "pron": "",
    "definition": "A group of examples processed together during one forward and backward pass.",
    "example": "“The team used batch while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in training & adaptation and modern AI practice.",
    "note": "Training terms describe how model behavior is learned, specialized, or updated.",
    "related": [
      "batch size",
      "training step",
      "microbatch"
    ],
    "aliases": [
      "training batch"
    ],
    "category": "Training & Adaptation"
  },
  {
    "word": "batch size",
    "part": "noun",
    "pron": "",
    "definition": "The number of examples processed together before an optimizer update or gradient accumulation step.",
    "example": "“The team used batch size while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in training & adaptation and modern AI practice.",
    "note": "Training terms describe how model behavior is learned, specialized, or updated.",
    "related": [
      "microbatch",
      "batch",
      "gradient accumulation"
    ],
    "aliases": [],
    "category": "Training & Adaptation"
  },
  {
    "word": "microbatch",
    "part": "noun",
    "pron": "",
    "definition": "A smaller portion of a larger effective batch processed at one time to fit memory constraints.",
    "example": "“The team used microbatch while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in training & adaptation and modern AI practice.",
    "note": "Training terms describe how model behavior is learned, specialized, or updated.",
    "related": [
      "gradient accumulation",
      "batch size",
      "learning rate"
    ],
    "aliases": [],
    "category": "Training & Adaptation"
  },
  {
    "word": "gradient accumulation",
    "part": "noun",
    "pron": "",
    "definition": "Accumulating gradients over multiple microbatches before updating parameters, creating a larger effective batch.",
    "example": "“The team used gradient accumulation while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in training & adaptation and modern AI practice.",
    "note": "Training terms describe how model behavior is learned, specialized, or updated.",
    "related": [
      "learning rate",
      "microbatch",
      "learning-rate schedule"
    ],
    "aliases": [],
    "category": "Training & Adaptation"
  },
  {
    "word": "learning rate",
    "part": "noun",
    "pron": "",
    "definition": "A hyperparameter controlling the size of parameter updates during optimization.",
    "example": "“The team used learning rate while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in training & adaptation and modern AI practice.",
    "note": "Training terms describe how model behavior is learned, specialized, or updated.",
    "related": [
      "learning-rate schedule",
      "gradient accumulation",
      "warmup"
    ],
    "aliases": [
      "lr"
    ],
    "category": "Training & Adaptation"
  },
  {
    "word": "learning-rate schedule",
    "part": "noun",
    "pron": "",
    "definition": "A rule that changes the learning rate over the course of training.",
    "example": "“The team used learning-rate schedule while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in training & adaptation and modern AI practice.",
    "note": "Training terms describe how model behavior is learned, specialized, or updated.",
    "related": [
      "warmup",
      "learning rate",
      "optimizer"
    ],
    "aliases": [
      "lr schedule"
    ],
    "category": "Training & Adaptation"
  },
  {
    "word": "warmup",
    "part": "noun",
    "pron": "",
    "definition": "A training phase in which the learning rate gradually increases from a small initial value.",
    "example": "“The team used warmup while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in training & adaptation and modern AI practice.",
    "note": "Training terms describe how model behavior is learned, specialized, or updated.",
    "related": [
      "optimizer",
      "learning-rate schedule",
      "SGD"
    ],
    "aliases": [],
    "category": "Training & Adaptation"
  },
  {
    "word": "optimizer",
    "part": "noun",
    "pron": "",
    "definition": "An algorithm that uses gradients to update model parameters in order to reduce a loss function.",
    "example": "“The team used optimizer while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in training & adaptation and modern AI practice.",
    "note": "Training terms describe how model behavior is learned, specialized, or updated.",
    "related": [
      "SGD",
      "warmup",
      "Adam"
    ],
    "aliases": [],
    "category": "Training & Adaptation"
  },
  {
    "word": "SGD",
    "part": "noun",
    "pron": "",
    "definition": "Stochastic gradient descent; an optimizer that estimates gradients from mini-batches and updates parameters accordingly.",
    "example": "“The team used SGD while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in training & adaptation and modern AI practice.",
    "note": "Training terms describe how model behavior is learned, specialized, or updated.",
    "related": [
      "Adam",
      "optimizer",
      "AdamW"
    ],
    "aliases": [
      "stochastic gradient descent"
    ],
    "category": "Training & Adaptation"
  },
  {
    "word": "Adam",
    "part": "noun",
    "pron": "",
    "definition": "An adaptive optimizer that maintains moving estimates of gradient means and variances.",
    "example": "“The team used Adam while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in training & adaptation and modern AI practice.",
    "note": "Training terms describe how model behavior is learned, specialized, or updated.",
    "related": [
      "AdamW",
      "SGD",
      "backpropagation"
    ],
    "aliases": [],
    "category": "Training & Adaptation"
  },
  {
    "word": "AdamW",
    "part": "noun",
    "pron": "",
    "definition": "A variant of Adam that decouples weight decay from the adaptive gradient update.",
    "example": "“The team used AdamW while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in training & adaptation and modern AI practice.",
    "note": "Training terms describe how model behavior is learned, specialized, or updated.",
    "related": [
      "backpropagation",
      "Adam",
      "gradient descent"
    ],
    "aliases": [],
    "category": "Training & Adaptation"
  },
  {
    "word": "backpropagation",
    "part": "noun",
    "pron": "",
    "definition": "The algorithm used to compute gradients of a loss with respect to model parameters by propagating derivatives backward through a computation graph.",
    "example": "“The team used backpropagation while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in training & adaptation and modern AI practice.",
    "note": "Training terms describe how model behavior is learned, specialized, or updated.",
    "related": [
      "gradient descent",
      "AdamW",
      "regularization"
    ],
    "aliases": [
      "backprop"
    ],
    "category": "Training & Adaptation"
  },
  {
    "word": "gradient descent",
    "part": "noun",
    "pron": "",
    "definition": "A general optimization method that changes parameters in the direction that reduces a differentiable objective.",
    "example": "“The team used gradient descent while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in training & adaptation and modern AI practice.",
    "note": "Training terms describe how model behavior is learned, specialized, or updated.",
    "related": [
      "regularization",
      "backpropagation",
      "weight decay"
    ],
    "aliases": [],
    "category": "Training & Adaptation"
  },
  {
    "word": "regularization",
    "part": "noun",
    "pron": "",
    "definition": "Techniques that discourage overfitting or undesirable parameter configurations during training.",
    "example": "“The team used regularization while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in training & adaptation and modern AI practice.",
    "note": "Training terms describe how model behavior is learned, specialized, or updated.",
    "related": [
      "weight decay",
      "gradient descent",
      "dropout"
    ],
    "aliases": [],
    "category": "Training & Adaptation"
  },
  {
    "word": "weight decay",
    "part": "noun",
    "pron": "",
    "definition": "A regularization technique that penalizes large model weights, often implemented through optimizer updates.",
    "example": "“The team used weight decay while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in training & adaptation and modern AI practice.",
    "note": "Training terms describe how model behavior is learned, specialized, or updated.",
    "related": [
      "dropout",
      "regularization",
      "early stopping"
    ],
    "aliases": [],
    "category": "Training & Adaptation"
  },
  {
    "word": "dropout",
    "part": "noun",
    "pron": "",
    "definition": "A regularization method that randomly disables some activations during training.",
    "example": "“The team used dropout while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in training & adaptation and modern AI practice.",
    "note": "Training terms describe how model behavior is learned, specialized, or updated.",
    "related": [
      "early stopping",
      "weight decay",
      "hyperparameter"
    ],
    "aliases": [],
    "category": "Training & Adaptation"
  },
  {
    "word": "early stopping",
    "part": "noun",
    "pron": "",
    "definition": "Stopping training when validation performance stops improving, to reduce overfitting and wasted compute.",
    "example": "“The team used early stopping while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in training & adaptation and modern AI practice.",
    "note": "Training terms describe how model behavior is learned, specialized, or updated.",
    "related": [
      "hyperparameter",
      "dropout",
      "hyperparameter tuning"
    ],
    "aliases": [],
    "category": "Training & Adaptation"
  },
  {
    "word": "hyperparameter",
    "part": "noun",
    "pron": "",
    "definition": "A configuration value chosen outside the learned model parameters, such as learning rate, batch size, or layer count.",
    "example": "“The team used hyperparameter while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in training & adaptation and modern AI practice.",
    "note": "Training terms describe how model behavior is learned, specialized, or updated.",
    "related": [
      "hyperparameter tuning",
      "early stopping",
      "grid search"
    ],
    "aliases": [],
    "category": "Training & Adaptation"
  },
  {
    "word": "hyperparameter tuning",
    "part": "noun",
    "pron": "",
    "definition": "Searching for model or training configuration values that improve a chosen evaluation objective.",
    "example": "“The team used hyperparameter tuning while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in training & adaptation and modern AI practice.",
    "note": "Training terms describe how model behavior is learned, specialized, or updated.",
    "related": [
      "grid search",
      "hyperparameter",
      "random search"
    ],
    "aliases": [],
    "category": "Training & Adaptation"
  },
  {
    "word": "grid search",
    "part": "noun",
    "pron": "",
    "definition": "Trying combinations from a predefined grid of hyperparameter values.",
    "example": "“The team used grid search while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in training & adaptation and modern AI practice.",
    "note": "Training terms describe how model behavior is learned, specialized, or updated.",
    "related": [
      "random search",
      "hyperparameter tuning",
      "Bayesian optimization"
    ],
    "aliases": [],
    "category": "Training & Adaptation"
  },
  {
    "word": "random search",
    "part": "noun",
    "pron": "",
    "definition": "Sampling hyperparameter combinations randomly from defined ranges or distributions.",
    "example": "“The team used random search while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in training & adaptation and modern AI practice.",
    "note": "Training terms describe how model behavior is learned, specialized, or updated.",
    "related": [
      "Bayesian optimization",
      "grid search",
      "supervised learning"
    ],
    "aliases": [],
    "category": "Training & Adaptation"
  },
  {
    "word": "Bayesian optimization",
    "part": "noun",
    "pron": "",
    "definition": "A search method that uses a probabilistic model of prior trials to choose promising hyperparameters.",
    "example": "“The team used Bayesian optimization while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in training & adaptation and modern AI practice.",
    "note": "Training terms describe how model behavior is learned, specialized, or updated.",
    "related": [
      "supervised learning",
      "random search",
      "unsupervised learning"
    ],
    "aliases": [],
    "category": "Training & Adaptation"
  },
  {
    "word": "quantization",
    "part": "noun",
    "pron": "",
    "definition": "Representing model weights or activations with lower-precision numbers to reduce memory and speed up inference.",
    "example": "“The team used quantization while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in inference & optimization and modern AI practice.",
    "note": "Runtime techniques trade among speed, memory, cost, throughput, and sometimes quality.",
    "related": [
      "post-training quantization",
      "model compression",
      "quantization-aware training"
    ],
    "aliases": [
      "model quantization"
    ],
    "category": "Inference & Optimization"
  },
  {
    "word": "post-training quantization",
    "part": "noun",
    "pron": "",
    "definition": "Quantizing an already trained model without retraining the full model from scratch.",
    "example": "“The team used post-training quantization while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in inference & optimization and modern AI practice.",
    "note": "Runtime techniques trade among speed, memory, cost, throughput, and sometimes quality.",
    "related": [
      "quantization-aware training",
      "quantization",
      "INT8"
    ],
    "aliases": [
      "ptq"
    ],
    "category": "Inference & Optimization"
  },
  {
    "word": "quantization-aware training",
    "part": "noun",
    "pron": "",
    "definition": "Training while simulating lower-precision arithmetic so the model adapts to later quantized inference.",
    "example": "“The team used quantization-aware training while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in inference & optimization and modern AI practice.",
    "note": "Runtime techniques trade among speed, memory, cost, throughput, and sometimes quality.",
    "related": [
      "INT8",
      "post-training quantization",
      "INT4"
    ],
    "aliases": [
      "qat"
    ],
    "category": "Inference & Optimization"
  },
  {
    "word": "INT8",
    "part": "noun",
    "pron": "",
    "definition": "Eight-bit integer numeric precision commonly used for quantized inference.",
    "example": "“The team used INT8 while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in inference & optimization and modern AI practice.",
    "note": "Runtime techniques trade among speed, memory, cost, throughput, and sometimes quality.",
    "related": [
      "INT4",
      "quantization-aware training",
      "FP32"
    ],
    "aliases": [
      "int8 inference"
    ],
    "category": "Inference & Optimization"
  },
  {
    "word": "INT4",
    "part": "noun",
    "pron": "",
    "definition": "Four-bit integer numeric precision used for aggressive model compression and efficient inference.",
    "example": "“The team used INT4 while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in inference & optimization and modern AI practice.",
    "note": "Runtime techniques trade among speed, memory, cost, throughput, and sometimes quality.",
    "related": [
      "FP32",
      "INT8",
      "FP16"
    ],
    "aliases": [
      "int4 inference"
    ],
    "category": "Inference & Optimization"
  },
  {
    "word": "FP32",
    "part": "noun",
    "pron": "",
    "definition": "32-bit floating-point precision traditionally used for model training and numerical computation.",
    "example": "“The team used FP32 while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in inference & optimization and modern AI practice.",
    "note": "Runtime techniques trade among speed, memory, cost, throughput, and sometimes quality.",
    "related": [
      "FP16",
      "INT4",
      "BF16"
    ],
    "aliases": [
      "float32"
    ],
    "category": "Inference & Optimization"
  },
  {
    "word": "FP16",
    "part": "noun",
    "pron": "",
    "definition": "16-bit floating-point precision used to reduce memory and accelerate supported training or inference.",
    "example": "“The team used FP16 while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in inference & optimization and modern AI practice.",
    "note": "Runtime techniques trade among speed, memory, cost, throughput, and sometimes quality.",
    "related": [
      "BF16",
      "FP32",
      "FP8"
    ],
    "aliases": [
      "float16"
    ],
    "category": "Inference & Optimization"
  },
  {
    "word": "BF16",
    "part": "noun",
    "pron": "",
    "definition": "Brain floating point; a 16-bit format with an exponent range similar to FP32 and lower mantissa precision.",
    "example": "“The team used BF16 while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in inference & optimization and modern AI practice.",
    "note": "Runtime techniques trade among speed, memory, cost, throughput, and sometimes quality.",
    "related": [
      "FP8",
      "FP16",
      "mixed precision"
    ],
    "aliases": [
      "bfloat16"
    ],
    "category": "Inference & Optimization"
  },
  {
    "word": "FP8",
    "part": "noun",
    "pron": "",
    "definition": "Eight-bit floating-point formats used on newer accelerators for efficient training or inference.",
    "example": "“The team used FP8 while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in inference & optimization and modern AI practice.",
    "note": "Runtime techniques trade among speed, memory, cost, throughput, and sometimes quality.",
    "related": [
      "mixed precision",
      "BF16",
      "pruning"
    ],
    "aliases": [],
    "category": "Inference & Optimization"
  },
  {
    "word": "mixed precision",
    "part": "noun",
    "pron": "",
    "definition": "Using more than one numeric precision in the same training or inference workload to improve efficiency.",
    "example": "“The team used mixed precision while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in inference & optimization and modern AI practice.",
    "note": "Runtime techniques trade among speed, memory, cost, throughput, and sometimes quality.",
    "related": [
      "pruning",
      "FP8",
      "sparsity"
    ],
    "aliases": [],
    "category": "Inference & Optimization"
  },
  {
    "word": "pruning",
    "part": "noun",
    "pron": "",
    "definition": "Removing weights, channels, heads, or other components judged unnecessary to reduce model size or compute.",
    "example": "“The team used pruning while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in inference & optimization and modern AI practice.",
    "note": "Runtime techniques trade among speed, memory, cost, throughput, and sometimes quality.",
    "related": [
      "sparsity",
      "mixed precision",
      "structured sparsity"
    ],
    "aliases": [],
    "category": "Inference & Optimization"
  },
  {
    "word": "sparsity",
    "part": "noun",
    "pron": "",
    "definition": "A condition where many weights, activations, or connections are zero or inactive.",
    "example": "“The team used sparsity while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in inference & optimization and modern AI practice.",
    "note": "Runtime techniques trade among speed, memory, cost, throughput, and sometimes quality.",
    "related": [
      "structured sparsity",
      "pruning",
      "KV cache"
    ],
    "aliases": [],
    "category": "Inference & Optimization"
  },
  {
    "word": "structured sparsity",
    "part": "noun",
    "pron": "",
    "definition": "Sparsity arranged in regular blocks or patterns that hardware can accelerate more easily.",
    "example": "“The team used structured sparsity while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in inference & optimization and modern AI practice.",
    "note": "Runtime techniques trade among speed, memory, cost, throughput, and sometimes quality.",
    "related": [
      "KV cache",
      "sparsity",
      "prefix cache"
    ],
    "aliases": [],
    "category": "Inference & Optimization"
  },
  {
    "word": "KV cache",
    "part": "noun",
    "pron": "",
    "definition": "Stored attention keys and values from previous tokens so autoregressive generation does not recompute them every step.",
    "example": "“The team used KV cache while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in inference & optimization and modern AI practice.",
    "note": "Runtime techniques trade among speed, memory, cost, throughput, and sometimes quality.",
    "related": [
      "prefix cache",
      "structured sparsity",
      "continuous batching"
    ],
    "aliases": [
      "key value cache"
    ],
    "category": "Inference & Optimization"
  },
  {
    "word": "prefix cache",
    "part": "noun",
    "pron": "",
    "definition": "Cached computation for a shared initial context reused across multiple requests.",
    "example": "“The team used prefix cache while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in inference & optimization and modern AI practice.",
    "note": "Runtime techniques trade among speed, memory, cost, throughput, and sometimes quality.",
    "related": [
      "continuous batching",
      "KV cache",
      "batch inference"
    ],
    "aliases": [
      "prompt cache"
    ],
    "category": "Inference & Optimization"
  },
  {
    "word": "continuous batching",
    "part": "noun",
    "pron": "",
    "definition": "Dynamically adding and removing requests from inference batches as tokens are generated.",
    "example": "“The team used continuous batching while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in inference & optimization and modern AI practice.",
    "note": "Runtime techniques trade among speed, memory, cost, throughput, and sometimes quality.",
    "related": [
      "batch inference",
      "prefix cache",
      "model serving"
    ],
    "aliases": [
      "dynamic batching"
    ],
    "category": "Inference & Optimization"
  },
  {
    "word": "batch inference",
    "part": "noun",
    "pron": "",
    "definition": "Running multiple inputs together to improve accelerator utilization and throughput.",
    "example": "“The team used batch inference while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in inference & optimization and modern AI practice.",
    "note": "Runtime techniques trade among speed, memory, cost, throughput, and sometimes quality.",
    "related": [
      "model serving",
      "continuous batching",
      "inference server"
    ],
    "aliases": [
      "batched inference"
    ],
    "category": "Inference & Optimization"
  },
  {
    "word": "model serving",
    "part": "noun",
    "pron": "",
    "definition": "Operating infrastructure that exposes trained models for live or batch inference.",
    "example": "“The team used model serving while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in inference & optimization and modern AI practice.",
    "note": "Runtime techniques trade among speed, memory, cost, throughput, and sometimes quality.",
    "related": [
      "inference server",
      "batch inference",
      "model parallelism"
    ],
    "aliases": [
      "serving"
    ],
    "category": "Inference & Optimization"
  },
  {
    "word": "inference server",
    "part": "noun",
    "pron": "",
    "definition": "Software that loads models, schedules requests, manages batching, and returns model outputs.",
    "example": "“The team used inference server while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in inference & optimization and modern AI practice.",
    "note": "Runtime techniques trade among speed, memory, cost, throughput, and sometimes quality.",
    "related": [
      "model parallelism",
      "model serving",
      "tensor parallelism"
    ],
    "aliases": [
      "model server"
    ],
    "category": "Inference & Optimization"
  },
  {
    "word": "model parallelism",
    "part": "noun",
    "pron": "",
    "definition": "Splitting a model across multiple devices because it does not fit or run efficiently on one device.",
    "example": "“The team used model parallelism while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in inference & optimization and modern AI practice.",
    "note": "Runtime techniques trade among speed, memory, cost, throughput, and sometimes quality.",
    "related": [
      "tensor parallelism",
      "inference server",
      "pipeline parallelism"
    ],
    "aliases": [],
    "category": "Inference & Optimization"
  },
  {
    "word": "tensor parallelism",
    "part": "noun",
    "pron": "",
    "definition": "Splitting tensor operations within individual layers across multiple devices.",
    "example": "“The team used tensor parallelism while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in inference & optimization and modern AI practice.",
    "note": "Runtime techniques trade among speed, memory, cost, throughput, and sometimes quality.",
    "related": [
      "pipeline parallelism",
      "model parallelism",
      "data parallelism"
    ],
    "aliases": [
      "tp"
    ],
    "category": "Inference & Optimization"
  },
  {
    "word": "pipeline parallelism",
    "part": "noun",
    "pron": "",
    "definition": "Splitting groups of model layers across devices and passing microbatches through them like a pipeline.",
    "example": "“The team used pipeline parallelism while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in inference & optimization and modern AI practice.",
    "note": "Runtime techniques trade among speed, memory, cost, throughput, and sometimes quality.",
    "related": [
      "data parallelism",
      "tensor parallelism",
      "sharding"
    ],
    "aliases": [
      "pp"
    ],
    "category": "Inference & Optimization"
  },
  {
    "word": "data parallelism",
    "part": "noun",
    "pron": "",
    "definition": "Replicating a model across devices while each replica processes different data and gradients are synchronized.",
    "example": "“The team used data parallelism while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in inference & optimization and modern AI practice.",
    "note": "Runtime techniques trade among speed, memory, cost, throughput, and sometimes quality.",
    "related": [
      "sharding",
      "pipeline parallelism",
      "FSDP"
    ],
    "aliases": [
      "dp"
    ],
    "category": "Inference & Optimization"
  },
  {
    "word": "sharding",
    "part": "noun",
    "pron": "",
    "definition": "Partitioning model parameters, optimizer state, data, or computation across multiple devices or machines.",
    "example": "“The team used sharding while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in inference & optimization and modern AI practice.",
    "note": "Runtime techniques trade among speed, memory, cost, throughput, and sometimes quality.",
    "related": [
      "FSDP",
      "data parallelism",
      "ZeRO"
    ],
    "aliases": [],
    "category": "Inference & Optimization"
  },
  {
    "word": "FSDP",
    "part": "noun",
    "pron": "",
    "definition": "Fully sharded data parallel; a strategy that shards parameters, gradients, and optimizer state across training workers.",
    "example": "“The team used FSDP while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in inference & optimization and modern AI practice.",
    "note": "Runtime techniques trade among speed, memory, cost, throughput, and sometimes quality.",
    "related": [
      "ZeRO",
      "sharding",
      "gradient checkpointing"
    ],
    "aliases": [
      "fully sharded data parallel"
    ],
    "category": "Inference & Optimization"
  },
  {
    "word": "ZeRO",
    "part": "noun",
    "pron": "",
    "definition": "A family of distributed-training techniques that partition optimizer state, gradients, and parameters to save memory.",
    "example": "“The team used ZeRO while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in inference & optimization and modern AI practice.",
    "note": "Runtime techniques trade among speed, memory, cost, throughput, and sometimes quality.",
    "related": [
      "gradient checkpointing",
      "FSDP",
      "FlashAttention"
    ],
    "aliases": [
      "zero redundancy optimizer"
    ],
    "category": "Inference & Optimization"
  },
  {
    "word": "gradient checkpointing",
    "part": "noun",
    "pron": "",
    "definition": "Saving memory by discarding some intermediate activations during the forward pass and recomputing them during backpropagation.",
    "example": "“The team used gradient checkpointing while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in inference & optimization and modern AI practice.",
    "note": "Runtime techniques trade among speed, memory, cost, throughput, and sometimes quality.",
    "related": [
      "FlashAttention",
      "ZeRO",
      "kernel fusion"
    ],
    "aliases": [
      "activation checkpointing"
    ],
    "category": "Inference & Optimization"
  },
  {
    "word": "FlashAttention",
    "part": "noun",
    "pron": "",
    "definition": "An attention implementation designed to reduce memory traffic and improve exact attention speed on GPUs.",
    "example": "“The team used FlashAttention while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in inference & optimization and modern AI practice.",
    "note": "Runtime techniques trade among speed, memory, cost, throughput, and sometimes quality.",
    "related": [
      "kernel fusion",
      "gradient checkpointing",
      "compilation"
    ],
    "aliases": [
      "flash attention"
    ],
    "category": "Inference & Optimization"
  },
  {
    "word": "kernel fusion",
    "part": "noun",
    "pron": "",
    "definition": "Combining multiple low-level operations into a single accelerator kernel to reduce overhead and memory movement.",
    "example": "“The team used kernel fusion while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in inference & optimization and modern AI practice.",
    "note": "Runtime techniques trade among speed, memory, cost, throughput, and sometimes quality.",
    "related": [
      "compilation",
      "FlashAttention",
      "graph optimization"
    ],
    "aliases": [],
    "category": "Inference & Optimization"
  },
  {
    "word": "compilation",
    "part": "noun",
    "pron": "",
    "definition": "Transforming a model computation graph into optimized low-level code for a target runtime or accelerator.",
    "example": "“The team used compilation while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in inference & optimization and modern AI practice.",
    "note": "Runtime techniques trade among speed, memory, cost, throughput, and sometimes quality.",
    "related": [
      "graph optimization",
      "kernel fusion",
      "offloading"
    ],
    "aliases": [
      "model compilation"
    ],
    "category": "Inference & Optimization"
  },
  {
    "word": "graph optimization",
    "part": "noun",
    "pron": "",
    "definition": "Rewriting a computation graph to remove redundant work, fuse operations, or improve execution efficiency.",
    "example": "“The team used graph optimization while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in inference & optimization and modern AI practice.",
    "note": "Runtime techniques trade among speed, memory, cost, throughput, and sometimes quality.",
    "related": [
      "offloading",
      "compilation",
      "paged attention"
    ],
    "aliases": [],
    "category": "Inference & Optimization"
  },
  {
    "word": "offloading",
    "part": "noun",
    "pron": "",
    "definition": "Moving weights, activations, KV cache, or optimizer state between accelerator memory, system memory, and storage to fit larger workloads.",
    "example": "“The team used offloading while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in inference & optimization and modern AI practice.",
    "note": "Runtime techniques trade among speed, memory, cost, throughput, and sometimes quality.",
    "related": [
      "paged attention",
      "graph optimization",
      "speculative execution"
    ],
    "aliases": [],
    "category": "Inference & Optimization"
  },
  {
    "word": "paged attention",
    "part": "noun",
    "pron": "",
    "definition": "Managing KV-cache memory in page-like blocks so inference servers can use accelerator memory more efficiently.",
    "example": "“The team used paged attention while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in inference & optimization and modern AI practice.",
    "note": "Runtime techniques trade among speed, memory, cost, throughput, and sometimes quality.",
    "related": [
      "speculative execution",
      "offloading",
      "model compression"
    ],
    "aliases": [],
    "category": "Inference & Optimization"
  },
  {
    "word": "speculative execution",
    "part": "noun",
    "pron": "",
    "definition": "Performing likely future computation early and keeping it only if later validation confirms it was useful.",
    "example": "“The team used speculative execution while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in inference & optimization and modern AI practice.",
    "note": "Runtime techniques trade among speed, memory, cost, throughput, and sometimes quality.",
    "related": [
      "model compression",
      "paged attention",
      "quantization"
    ],
    "aliases": [],
    "category": "Inference & Optimization"
  },
  {
    "word": "model compression",
    "part": "noun",
    "pron": "",
    "definition": "Reducing the storage or compute cost of a model through techniques such as quantization, pruning, or distillation.",
    "example": "“The team used model compression while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in inference & optimization and modern AI practice.",
    "note": "Runtime techniques trade among speed, memory, cost, throughput, and sometimes quality.",
    "related": [
      "quantization",
      "speculative execution",
      "post-training quantization"
    ],
    "aliases": [],
    "category": "Inference & Optimization"
  },
  {
    "word": "retriever",
    "part": "noun",
    "pron": "",
    "definition": "The component that searches a corpus and returns candidate documents or chunks for a query.",
    "example": "“The team used retriever while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in retrieval & knowledge and modern AI practice.",
    "note": "Retrieval is only useful when the right evidence is found, ranked, and passed into context clearly.",
    "related": [
      "embedding",
      "retrieval",
      "embedding model"
    ],
    "aliases": [],
    "category": "Retrieval & Knowledge"
  },
  {
    "word": "embedding model",
    "part": "noun",
    "pron": "",
    "definition": "A model that converts text, images, audio, or other data into vectors for similarity or retrieval tasks.",
    "example": "“The team used embedding model while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in retrieval & knowledge and modern AI practice.",
    "note": "Retrieval is only useful when the right evidence is found, ranked, and passed into context clearly.",
    "related": [
      "vector",
      "embedding",
      "vector search"
    ],
    "aliases": [
      "encoder model"
    ],
    "category": "Retrieval & Knowledge"
  },
  {
    "word": "vector",
    "part": "noun",
    "pron": "",
    "definition": "An ordered list of numbers used to represent a point, feature set, or learned embedding in a multidimensional space.",
    "example": "“The team used vector while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in retrieval & knowledge and modern AI practice.",
    "note": "Retrieval is only useful when the right evidence is found, ranked, and passed into context clearly.",
    "related": [
      "vector search",
      "embedding model",
      "semantic search"
    ],
    "aliases": [],
    "category": "Retrieval & Knowledge"
  },
  {
    "word": "vector search",
    "part": "noun",
    "pron": "",
    "definition": "Searching for items with vectors close to a query vector under a similarity measure.",
    "example": "“The team used vector search while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in retrieval & knowledge and modern AI practice.",
    "note": "Retrieval is only useful when the right evidence is found, ranked, and passed into context clearly.",
    "related": [
      "semantic search",
      "vector",
      "lexical search"
    ],
    "aliases": [
      "similarity search"
    ],
    "category": "Retrieval & Knowledge"
  },
  {
    "word": "semantic search",
    "part": "noun",
    "pron": "",
    "definition": "Search based on meaning and learned representations rather than only exact keyword overlap.",
    "example": "“The team used semantic search while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in retrieval & knowledge and modern AI practice.",
    "note": "Retrieval is only useful when the right evidence is found, ranked, and passed into context clearly.",
    "related": [
      "lexical search",
      "vector search",
      "BM25"
    ],
    "aliases": [],
    "category": "Retrieval & Knowledge"
  },
  {
    "word": "lexical search",
    "part": "noun",
    "pron": "",
    "definition": "Search based primarily on words, tokens, and term statistics rather than dense semantic embeddings.",
    "example": "“The team used lexical search while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in retrieval & knowledge and modern AI practice.",
    "note": "Retrieval is only useful when the right evidence is found, ranked, and passed into context clearly.",
    "related": [
      "BM25",
      "semantic search",
      "dense retrieval"
    ],
    "aliases": [
      "keyword search"
    ],
    "category": "Retrieval & Knowledge"
  },
  {
    "word": "BM25",
    "part": "noun",
    "pron": "",
    "definition": "A classic lexical ranking function that scores documents using term frequency, inverse document frequency, and document length.",
    "example": "“The team used BM25 while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in retrieval & knowledge and modern AI practice.",
    "note": "Retrieval is only useful when the right evidence is found, ranked, and passed into context clearly.",
    "related": [
      "dense retrieval",
      "lexical search",
      "sparse retrieval"
    ],
    "aliases": [],
    "category": "Retrieval & Knowledge"
  },
  {
    "word": "dense retrieval",
    "part": "noun",
    "pron": "",
    "definition": "Retrieval based on dense learned vector representations.",
    "example": "“The team used dense retrieval while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in retrieval & knowledge and modern AI practice.",
    "note": "Retrieval is only useful when the right evidence is found, ranked, and passed into context clearly.",
    "related": [
      "sparse retrieval",
      "BM25",
      "hybrid search"
    ],
    "aliases": [
      "dense search"
    ],
    "category": "Retrieval & Knowledge"
  },
  {
    "word": "sparse retrieval",
    "part": "noun",
    "pron": "",
    "definition": "Retrieval based on sparse term or learned sparse-vector representations.",
    "example": "“The team used sparse retrieval while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in retrieval & knowledge and modern AI practice.",
    "note": "Retrieval is only useful when the right evidence is found, ranked, and passed into context clearly.",
    "related": [
      "hybrid search",
      "dense retrieval",
      "reranker"
    ],
    "aliases": [
      "sparse search"
    ],
    "category": "Retrieval & Knowledge"
  },
  {
    "word": "hybrid search",
    "part": "noun",
    "pron": "",
    "definition": "Combining lexical and semantic retrieval signals to improve coverage and ranking.",
    "example": "“The team used hybrid search while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in retrieval & knowledge and modern AI practice.",
    "note": "Retrieval is only useful when the right evidence is found, ranked, and passed into context clearly.",
    "related": [
      "reranker",
      "sparse retrieval",
      "cross-encoder reranker"
    ],
    "aliases": [],
    "category": "Retrieval & Knowledge"
  },
  {
    "word": "reranker",
    "part": "noun",
    "pron": "",
    "definition": "A model or algorithm that reorders retrieved candidates using a more precise relevance score.",
    "example": "“The team used reranker while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in retrieval & knowledge and modern AI practice.",
    "note": "Retrieval is only useful when the right evidence is found, ranked, and passed into context clearly.",
    "related": [
      "cross-encoder reranker",
      "hybrid search",
      "bi-encoder"
    ],
    "aliases": [
      "re-ranker"
    ],
    "category": "Retrieval & Knowledge"
  },
  {
    "word": "cross-encoder reranker",
    "part": "noun",
    "pron": "",
    "definition": "A reranker that jointly processes a query and candidate text to produce a relevance score.",
    "example": "“The team used cross-encoder reranker while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in retrieval & knowledge and modern AI practice.",
    "note": "Retrieval is only useful when the right evidence is found, ranked, and passed into context clearly.",
    "related": [
      "bi-encoder",
      "reranker",
      "chunk"
    ],
    "aliases": [
      "cross encoder"
    ],
    "category": "Retrieval & Knowledge"
  },
  {
    "word": "bi-encoder",
    "part": "noun",
    "pron": "",
    "definition": "A model that encodes queries and documents separately so their vectors can be searched efficiently.",
    "example": "“The team used bi-encoder while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in retrieval & knowledge and modern AI practice.",
    "note": "Retrieval is only useful when the right evidence is found, ranked, and passed into context clearly.",
    "related": [
      "chunk",
      "cross-encoder reranker",
      "chunking"
    ],
    "aliases": [
      "dual encoder"
    ],
    "category": "Retrieval & Knowledge"
  },
  {
    "word": "chunk",
    "part": "noun",
    "pron": "",
    "definition": "A bounded piece of a larger document used as the unit of indexing, retrieval, or context assembly.",
    "example": "“The team used chunk while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in retrieval & knowledge and modern AI practice.",
    "note": "Retrieval is only useful when the right evidence is found, ranked, and passed into context clearly.",
    "related": [
      "chunking",
      "bi-encoder",
      "chunk overlap"
    ],
    "aliases": [
      "document chunk"
    ],
    "category": "Retrieval & Knowledge"
  },
  {
    "word": "chunking",
    "part": "noun",
    "pron": "",
    "definition": "Splitting documents into smaller units for indexing and retrieval.",
    "example": "“The team used chunking while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in retrieval & knowledge and modern AI practice.",
    "note": "Retrieval is only useful when the right evidence is found, ranked, and passed into context clearly.",
    "related": [
      "chunk overlap",
      "chunk",
      "metadata filtering"
    ],
    "aliases": [],
    "category": "Retrieval & Knowledge"
  },
  {
    "word": "chunk overlap",
    "part": "noun",
    "pron": "",
    "definition": "Repeating content between adjacent chunks so information near boundaries is less likely to be lost.",
    "example": "“The team used chunk overlap while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in retrieval & knowledge and modern AI practice.",
    "note": "Retrieval is only useful when the right evidence is found, ranked, and passed into context clearly.",
    "related": [
      "metadata filtering",
      "chunking",
      "query rewriting"
    ],
    "aliases": [],
    "category": "Retrieval & Knowledge"
  },
  {
    "word": "metadata filtering",
    "part": "noun",
    "pron": "",
    "definition": "Restricting retrieval candidates using structured attributes such as date, author, customer, or document type.",
    "example": "“The team used metadata filtering while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in retrieval & knowledge and modern AI practice.",
    "note": "Retrieval is only useful when the right evidence is found, ranked, and passed into context clearly.",
    "related": [
      "query rewriting",
      "chunk overlap",
      "query expansion"
    ],
    "aliases": [
      "attribute filtering"
    ],
    "category": "Retrieval & Knowledge"
  },
  {
    "word": "query rewriting",
    "part": "noun",
    "pron": "",
    "definition": "Transforming a user query into a form that is more effective for retrieval.",
    "example": "“The team used query rewriting while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in retrieval & knowledge and modern AI practice.",
    "note": "Retrieval is only useful when the right evidence is found, ranked, and passed into context clearly.",
    "related": [
      "query expansion",
      "metadata filtering",
      "HyDE"
    ],
    "aliases": [
      "query reformulation"
    ],
    "category": "Retrieval & Knowledge"
  },
  {
    "word": "query expansion",
    "part": "noun",
    "pron": "",
    "definition": "Adding related terms, entities, or generated details to increase retrieval recall.",
    "example": "“The team used query expansion while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in retrieval & knowledge and modern AI practice.",
    "note": "Retrieval is only useful when the right evidence is found, ranked, and passed into context clearly.",
    "related": [
      "HyDE",
      "query rewriting",
      "reciprocal rank fusion"
    ],
    "aliases": [],
    "category": "Retrieval & Knowledge"
  },
  {
    "word": "HyDE",
    "part": "noun",
    "pron": "",
    "definition": "Hypothetical document embeddings; retrieving by embedding a model-generated hypothetical answer or document rather than the raw query.",
    "example": "“The team used HyDE while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in retrieval & knowledge and modern AI practice.",
    "note": "Retrieval is only useful when the right evidence is found, ranked, and passed into context clearly.",
    "related": [
      "reciprocal rank fusion",
      "query expansion",
      "nearest neighbor"
    ],
    "aliases": [
      "hypothetical document embeddings"
    ],
    "category": "Retrieval & Knowledge"
  },
  {
    "word": "reciprocal rank fusion",
    "part": "noun",
    "pron": "",
    "definition": "Combining several ranked result lists using scores based on each item's rank position.",
    "example": "“The team used reciprocal rank fusion while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in retrieval & knowledge and modern AI practice.",
    "note": "Retrieval is only useful when the right evidence is found, ranked, and passed into context clearly.",
    "related": [
      "nearest neighbor",
      "HyDE",
      "approximate nearest neighbor"
    ],
    "aliases": [
      "rrf"
    ],
    "category": "Retrieval & Knowledge"
  },
  {
    "word": "nearest neighbor",
    "part": "noun",
    "pron": "",
    "definition": "The item or items closest to a query point under a chosen distance or similarity function.",
    "example": "“The team used nearest neighbor while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in retrieval & knowledge and modern AI practice.",
    "note": "Retrieval is only useful when the right evidence is found, ranked, and passed into context clearly.",
    "related": [
      "approximate nearest neighbor",
      "reciprocal rank fusion",
      "HNSW"
    ],
    "aliases": [
      "nn"
    ],
    "category": "Retrieval & Knowledge"
  },
  {
    "word": "approximate nearest neighbor",
    "part": "noun",
    "pron": "",
    "definition": "Fast search methods that trade a small amount of exactness for much better retrieval speed at large scale.",
    "example": "“The team used approximate nearest neighbor while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in retrieval & knowledge and modern AI practice.",
    "note": "Retrieval is only useful when the right evidence is found, ranked, and passed into context clearly.",
    "related": [
      "HNSW",
      "nearest neighbor",
      "cosine similarity"
    ],
    "aliases": [
      "ann search"
    ],
    "category": "Retrieval & Knowledge"
  },
  {
    "word": "HNSW",
    "part": "noun",
    "pron": "",
    "definition": "Hierarchical navigable small world; a graph-based approximate nearest-neighbor index used for vector search.",
    "example": "“The team used HNSW while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in retrieval & knowledge and modern AI practice.",
    "note": "Retrieval is only useful when the right evidence is found, ranked, and passed into context clearly.",
    "related": [
      "cosine similarity",
      "approximate nearest neighbor",
      "dot product"
    ],
    "aliases": [
      "hierarchical navigable small world"
    ],
    "category": "Retrieval & Knowledge"
  },
  {
    "word": "cosine similarity",
    "part": "noun",
    "pron": "",
    "definition": "A similarity measure based on the angle between vectors rather than their raw magnitude.",
    "example": "“The team used cosine similarity while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in retrieval & knowledge and modern AI practice.",
    "note": "Retrieval is only useful when the right evidence is found, ranked, and passed into context clearly.",
    "related": [
      "dot product",
      "HNSW",
      "Euclidean distance"
    ],
    "aliases": [
      "cosine distance"
    ],
    "category": "Retrieval & Knowledge"
  },
  {
    "word": "dot product",
    "part": "noun",
    "pron": "",
    "definition": "A vector similarity operation that multiplies corresponding components and sums the results.",
    "example": "“The team used dot product while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in retrieval & knowledge and modern AI practice.",
    "note": "Retrieval is only useful when the right evidence is found, ranked, and passed into context clearly.",
    "related": [
      "Euclidean distance",
      "cosine similarity",
      "vector database"
    ],
    "aliases": [
      "inner product"
    ],
    "category": "Retrieval & Knowledge"
  },
  {
    "word": "Euclidean distance",
    "part": "noun",
    "pron": "",
    "definition": "Straight-line distance between vectors in a geometric space.",
    "example": "“The team used Euclidean distance while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in retrieval & knowledge and modern AI practice.",
    "note": "Retrieval is only useful when the right evidence is found, ranked, and passed into context clearly.",
    "related": [
      "vector database",
      "dot product",
      "vector store"
    ],
    "aliases": [
      "l2 distance"
    ],
    "category": "Retrieval & Knowledge"
  },
  {
    "word": "vector store",
    "part": "noun",
    "pron": "",
    "definition": "A storage and indexing layer for embeddings and their associated content or metadata.",
    "example": "“The team used vector store while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in retrieval & knowledge and modern AI practice.",
    "note": "Retrieval is only useful when the right evidence is found, ranked, and passed into context clearly.",
    "related": [
      "document store",
      "vector database",
      "knowledge base"
    ],
    "aliases": [
      "embedding store"
    ],
    "category": "Retrieval & Knowledge"
  },
  {
    "word": "document store",
    "part": "noun",
    "pron": "",
    "definition": "A system that stores original documents or chunks used by a retrieval pipeline.",
    "example": "“The team used document store while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in retrieval & knowledge and modern AI practice.",
    "note": "Retrieval is only useful when the right evidence is found, ranked, and passed into context clearly.",
    "related": [
      "knowledge base",
      "vector store",
      "knowledge graph"
    ],
    "aliases": [
      "corpus store"
    ],
    "category": "Retrieval & Knowledge"
  },
  {
    "word": "knowledge base",
    "part": "noun",
    "pron": "",
    "definition": "A maintained collection of facts, documents, or structured information used by people or AI systems.",
    "example": "“The team used knowledge base while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in retrieval & knowledge and modern AI practice.",
    "note": "Retrieval is only useful when the right evidence is found, ranked, and passed into context clearly.",
    "related": [
      "knowledge graph",
      "document store",
      "Graph RAG"
    ],
    "aliases": [
      "kb"
    ],
    "category": "Retrieval & Knowledge"
  },
  {
    "word": "knowledge graph",
    "part": "noun",
    "pron": "",
    "definition": "A graph of entities and typed relationships that represents structured knowledge.",
    "example": "“The team used knowledge graph while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in retrieval & knowledge and modern AI practice.",
    "note": "Retrieval is only useful when the right evidence is found, ranked, and passed into context clearly.",
    "related": [
      "Graph RAG",
      "knowledge base",
      "grounded generation"
    ],
    "aliases": [],
    "category": "Retrieval & Knowledge"
  },
  {
    "word": "Graph RAG",
    "part": "noun",
    "pron": "",
    "definition": "Retrieval-augmented generation that uses graph structure or graph-derived summaries to retrieve and organize evidence.",
    "example": "“The team used Graph RAG while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in retrieval & knowledge and modern AI practice.",
    "note": "Retrieval is only useful when the right evidence is found, ranked, and passed into context clearly.",
    "related": [
      "grounded generation",
      "knowledge graph",
      "groundedness"
    ],
    "aliases": [
      "graph retrieval augmented generation"
    ],
    "category": "Retrieval & Knowledge"
  },
  {
    "word": "grounded generation",
    "part": "noun",
    "pron": "",
    "definition": "Generation constrained or informed by provided evidence, retrieved content, or trusted data.",
    "example": "“The team used grounded generation while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in retrieval & knowledge and modern AI practice.",
    "note": "Retrieval is only useful when the right evidence is found, ranked, and passed into context clearly.",
    "related": [
      "groundedness",
      "Graph RAG",
      "citation"
    ],
    "aliases": [
      "grounded answer"
    ],
    "category": "Retrieval & Knowledge"
  },
  {
    "word": "groundedness",
    "part": "noun",
    "pron": "",
    "definition": "The degree to which an answer's claims are supported by supplied evidence or sources.",
    "example": "“The team used groundedness while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in retrieval & knowledge and modern AI practice.",
    "note": "Retrieval is only useful when the right evidence is found, ranked, and passed into context clearly.",
    "related": [
      "citation",
      "grounded generation",
      "source attribution"
    ],
    "aliases": [
      "faithfulness"
    ],
    "category": "Retrieval & Knowledge"
  },
  {
    "word": "citation",
    "part": "noun",
    "pron": "",
    "definition": "A reference connecting a claim or response to a source used as evidence.",
    "example": "“The team used citation while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in retrieval & knowledge and modern AI practice.",
    "note": "Retrieval is only useful when the right evidence is found, ranked, and passed into context clearly.",
    "related": [
      "source attribution",
      "groundedness",
      "retrieval recall"
    ],
    "aliases": [],
    "category": "Retrieval & Knowledge"
  },
  {
    "word": "source attribution",
    "part": "noun",
    "pron": "",
    "definition": "Identifying which sources support a generated claim or answer.",
    "example": "“The team used source attribution while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in retrieval & knowledge and modern AI practice.",
    "note": "Retrieval is only useful when the right evidence is found, ranked, and passed into context clearly.",
    "related": [
      "retrieval recall",
      "citation",
      "retrieval precision"
    ],
    "aliases": [
      "provenance"
    ],
    "category": "Retrieval & Knowledge"
  },
  {
    "word": "retrieval recall",
    "part": "noun",
    "pron": "",
    "definition": "How much of the relevant evidence a retrieval system successfully includes among its candidates.",
    "example": "“The team used retrieval recall while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in retrieval & knowledge and modern AI practice.",
    "note": "Retrieval is only useful when the right evidence is found, ranked, and passed into context clearly.",
    "related": [
      "retrieval precision",
      "source attribution",
      "RAG"
    ],
    "aliases": [],
    "category": "Retrieval & Knowledge"
  },
  {
    "word": "retrieval precision",
    "part": "noun",
    "pron": "",
    "definition": "How much of the retrieved material is actually relevant to the query.",
    "example": "“The team used retrieval precision while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in retrieval & knowledge and modern AI practice.",
    "note": "Retrieval is only useful when the right evidence is found, ranked, and passed into context clearly.",
    "related": [
      "RAG",
      "retrieval recall",
      "retrieval"
    ],
    "aliases": [],
    "category": "Retrieval & Knowledge"
  },
  {
    "word": "agent",
    "part": "noun",
    "pron": "",
    "definition": "An AI system that can pursue a goal across multiple steps by choosing actions, using tools, and updating state.",
    "example": "“The team used agent while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in agents, tools & mcp and modern AI practice.",
    "note": "Agent systems combine model decisions with tools, state, permissions, and control logic.",
    "related": [
      "agentic",
      "artifact",
      "agentic workflow"
    ],
    "aliases": [
      "ai agent"
    ],
    "category": "Agents, Tools & MCP"
  },
  {
    "word": "agentic workflow",
    "part": "noun",
    "pron": "",
    "definition": "A workflow in which a model dynamically selects some actions, tools, or branches instead of following a fully fixed sequence.",
    "example": "“The team used agentic workflow while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in agents, tools & mcp and modern AI practice.",
    "note": "Agent systems combine model decisions with tools, state, permissions, and control logic.",
    "related": [
      "agent loop",
      "agentic",
      "planner"
    ],
    "aliases": [
      "agent workflow"
    ],
    "category": "Agents, Tools & MCP"
  },
  {
    "word": "agent loop",
    "part": "noun",
    "pron": "",
    "definition": "The recurring cycle of observe, decide, act, inspect results, and continue or stop.",
    "example": "“The team used agent loop while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in agents, tools & mcp and modern AI practice.",
    "note": "Agent systems combine model decisions with tools, state, permissions, and control logic.",
    "related": [
      "planner",
      "agentic workflow",
      "executor"
    ],
    "aliases": [
      "reasoning loop"
    ],
    "category": "Agents, Tools & MCP"
  },
  {
    "word": "planner",
    "part": "noun",
    "pron": "",
    "definition": "A component that decomposes a goal into steps or proposes a sequence of actions.",
    "example": "“The team used planner while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in agents, tools & mcp and modern AI practice.",
    "note": "Agent systems combine model decisions with tools, state, permissions, and control logic.",
    "related": [
      "executor",
      "agent loop",
      "orchestrator"
    ],
    "aliases": [
      "planning model"
    ],
    "category": "Agents, Tools & MCP"
  },
  {
    "word": "executor",
    "part": "noun",
    "pron": "",
    "definition": "A component that performs planned actions, tool calls, or code execution.",
    "example": "“The team used executor while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in agents, tools & mcp and modern AI practice.",
    "note": "Agent systems combine model decisions with tools, state, permissions, and control logic.",
    "related": [
      "orchestrator",
      "planner",
      "router"
    ],
    "aliases": [
      "worker"
    ],
    "category": "Agents, Tools & MCP"
  },
  {
    "word": "orchestrator",
    "part": "noun",
    "pron": "",
    "definition": "The control layer that coordinates models, tools, agents, retries, state, and handoffs.",
    "example": "“The team used orchestrator while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in agents, tools & mcp and modern AI practice.",
    "note": "Agent systems combine model decisions with tools, state, permissions, and control logic.",
    "related": [
      "router",
      "executor",
      "handoff"
    ],
    "aliases": [
      "agent orchestration"
    ],
    "category": "Agents, Tools & MCP"
  },
  {
    "word": "handoff",
    "part": "noun",
    "pron": "",
    "definition": "Transferring a task or conversation from one agent, model, or worker to another with the needed context.",
    "example": "“The team used handoff while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in agents, tools & mcp and modern AI practice.",
    "note": "Agent systems combine model decisions with tools, state, permissions, and control logic.",
    "related": [
      "subagent",
      "router",
      "supervisor agent"
    ],
    "aliases": [
      "agent handoff"
    ],
    "category": "Agents, Tools & MCP"
  },
  {
    "word": "subagent",
    "part": "noun",
    "pron": "",
    "definition": "A secondary agent delegated a bounded part of a larger task by another agent.",
    "example": "“The team used subagent while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in agents, tools & mcp and modern AI practice.",
    "note": "Agent systems combine model decisions with tools, state, permissions, and control logic.",
    "related": [
      "supervisor agent",
      "handoff",
      "multi-agent system"
    ],
    "aliases": [
      "child agent"
    ],
    "category": "Agents, Tools & MCP"
  },
  {
    "word": "supervisor agent",
    "part": "noun",
    "pron": "",
    "definition": "An agent that coordinates, reviews, or delegates work to other agents.",
    "example": "“The team used supervisor agent while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in agents, tools & mcp and modern AI practice.",
    "note": "Agent systems combine model decisions with tools, state, permissions, and control logic.",
    "related": [
      "multi-agent system",
      "subagent",
      "swarm"
    ],
    "aliases": [
      "manager agent"
    ],
    "category": "Agents, Tools & MCP"
  },
  {
    "word": "multi-agent system",
    "part": "noun",
    "pron": "",
    "definition": "A system in which multiple agents interact, specialize, delegate, or coordinate toward one or more goals.",
    "example": "“The team used multi-agent system while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in agents, tools & mcp and modern AI practice.",
    "note": "Agent systems combine model decisions with tools, state, permissions, and control logic.",
    "related": [
      "swarm",
      "supervisor agent",
      "tool"
    ],
    "aliases": [
      "mas"
    ],
    "category": "Agents, Tools & MCP"
  },
  {
    "word": "swarm",
    "part": "noun",
    "pron": "",
    "definition": "An informal pattern where many agents cooperate through distributed roles or local coordination.",
    "example": "“The team used swarm while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in agents, tools & mcp and modern AI practice.",
    "note": "Agent systems combine model decisions with tools, state, permissions, and control logic.",
    "related": [
      "tool",
      "multi-agent system",
      "tool calling"
    ],
    "aliases": [
      "agent swarm"
    ],
    "category": "Agents, Tools & MCP"
  },
  {
    "word": "tool",
    "part": "noun",
    "pron": "",
    "definition": "An external capability exposed to a model, such as search, code execution, a database query, or an API action.",
    "example": "“The team used tool while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in agents, tools & mcp and modern AI practice.",
    "note": "Agent systems combine model decisions with tools, state, permissions, and control logic.",
    "related": [
      "tool calling",
      "swarm",
      "function calling"
    ],
    "aliases": [
      "ai tool"
    ],
    "category": "Agents, Tools & MCP"
  },
  {
    "word": "function calling",
    "part": "noun",
    "pron": "",
    "definition": "Structured model output that requests execution of a named function with arguments.",
    "example": "“The team used function calling while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in agents, tools & mcp and modern AI practice.",
    "note": "Agent systems combine model decisions with tools, state, permissions, and control logic.",
    "related": [
      "tool schema",
      "tool calling",
      "tool search"
    ],
    "aliases": [
      "tool calling"
    ],
    "category": "Agents, Tools & MCP"
  },
  {
    "word": "tool schema",
    "part": "noun",
    "pron": "",
    "definition": "A machine-readable description of a tool's name, purpose, arguments, and result contract.",
    "example": "“The team used tool schema while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in agents, tools & mcp and modern AI practice.",
    "note": "Agent systems combine model decisions with tools, state, permissions, and control logic.",
    "related": [
      "tool search",
      "function calling",
      "tool registry"
    ],
    "aliases": [
      "function schema"
    ],
    "category": "Agents, Tools & MCP"
  },
  {
    "word": "tool search",
    "part": "noun",
    "pron": "",
    "definition": "A mechanism that lets a model discover or load relevant tools on demand instead of receiving every full tool definition up front.",
    "example": "“The team used tool search while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in agents, tools & mcp and modern AI practice.",
    "note": "Agent systems combine model decisions with tools, state, permissions, and control logic.",
    "related": [
      "tool registry",
      "tool schema",
      "connector"
    ],
    "aliases": [],
    "category": "Agents, Tools & MCP"
  },
  {
    "word": "tool registry",
    "part": "noun",
    "pron": "",
    "definition": "A catalog of tools available to an agent or application.",
    "example": "“The team used tool registry while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in agents, tools & mcp and modern AI practice.",
    "note": "Agent systems combine model decisions with tools, state, permissions, and control logic.",
    "related": [
      "connector",
      "tool search",
      "computer use"
    ],
    "aliases": [
      "tool catalog"
    ],
    "category": "Agents, Tools & MCP"
  },
  {
    "word": "connector",
    "part": "noun",
    "pron": "",
    "definition": "An integration that gives an AI application controlled access to an external service, account, or data source.",
    "example": "“The team used connector while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in agents, tools & mcp and modern AI practice.",
    "note": "Agent systems combine model decisions with tools, state, permissions, and control logic.",
    "related": [
      "computer use",
      "tool registry",
      "browser agent"
    ],
    "aliases": [],
    "category": "Agents, Tools & MCP"
  },
  {
    "word": "computer use",
    "part": "noun",
    "pron": "",
    "definition": "A capability where a model operates a graphical computer interface through actions such as clicks, typing, and scrolling.",
    "example": "“The team used computer use while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in agents, tools & mcp and modern AI practice.",
    "note": "Agent systems combine model decisions with tools, state, permissions, and control logic.",
    "related": [
      "browser agent",
      "connector",
      "shell tool"
    ],
    "aliases": [
      "computer-using agent",
      "browser use"
    ],
    "category": "Agents, Tools & MCP"
  },
  {
    "word": "browser agent",
    "part": "noun",
    "pron": "",
    "definition": "An agent specialized for navigating websites, reading pages, and completing browser-based tasks.",
    "example": "“The team used browser agent while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in agents, tools & mcp and modern AI practice.",
    "note": "Agent systems combine model decisions with tools, state, permissions, and control logic.",
    "related": [
      "shell tool",
      "computer use",
      "code interpreter"
    ],
    "aliases": [
      "web agent"
    ],
    "category": "Agents, Tools & MCP"
  },
  {
    "word": "shell tool",
    "part": "noun",
    "pron": "",
    "definition": "A tool that lets an agent run command-line programs and scripts inside a controlled environment.",
    "example": "“The team used shell tool while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in agents, tools & mcp and modern AI practice.",
    "note": "Agent systems combine model decisions with tools, state, permissions, and control logic.",
    "related": [
      "code interpreter",
      "browser agent",
      "sandbox"
    ],
    "aliases": [
      "terminal tool"
    ],
    "category": "Agents, Tools & MCP"
  },
  {
    "word": "code interpreter",
    "part": "noun",
    "pron": "",
    "definition": "A tool that lets a model execute code, commonly for analysis, computation, and file manipulation.",
    "example": "“The team used code interpreter while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in agents, tools & mcp and modern AI practice.",
    "note": "Agent systems combine model decisions with tools, state, permissions, and control logic.",
    "related": [
      "sandbox",
      "shell tool",
      "container"
    ],
    "aliases": [
      "python tool"
    ],
    "category": "Agents, Tools & MCP"
  },
  {
    "word": "sandbox",
    "part": "noun",
    "pron": "",
    "definition": "An isolated execution environment that limits the resources, files, permissions, or network access available to generated code or agents.",
    "example": "“The team used sandbox while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in agents, tools & mcp and modern AI practice.",
    "note": "Agent systems combine model decisions with tools, state, permissions, and control logic.",
    "related": [
      "container",
      "code interpreter",
      "agent harness"
    ],
    "aliases": [
      "sandbox environment"
    ],
    "category": "Agents, Tools & MCP"
  },
  {
    "word": "container",
    "part": "noun",
    "pron": "",
    "definition": "An isolated runtime environment packaging a filesystem, processes, and dependencies for reproducible execution.",
    "example": "“The team used container while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in agents, tools & mcp and modern AI practice.",
    "note": "Agent systems combine model decisions with tools, state, permissions, and control logic.",
    "related": [
      "agent harness",
      "sandbox",
      "state"
    ],
    "aliases": [],
    "category": "Agents, Tools & MCP"
  },
  {
    "word": "agent harness",
    "part": "noun",
    "pron": "",
    "definition": "Infrastructure that manages an agent's execution loop, tools, state, permissions, environment, and task lifecycle.",
    "example": "“The team used agent harness while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in agents, tools & mcp and modern AI practice.",
    "note": "Agent systems combine model decisions with tools, state, permissions, and control logic.",
    "related": [
      "state",
      "container",
      "memory"
    ],
    "aliases": [
      "harness"
    ],
    "category": "Agents, Tools & MCP"
  },
  {
    "word": "state",
    "part": "noun",
    "pron": "",
    "definition": "Persisted information that tracks the current condition of an agent, workflow, conversation, or task.",
    "example": "“The team used state while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in agents, tools & mcp and modern AI practice.",
    "note": "Agent systems combine model decisions with tools, state, permissions, and control logic.",
    "related": [
      "memory",
      "agent harness",
      "working memory"
    ],
    "aliases": [
      "agent state"
    ],
    "category": "Agents, Tools & MCP"
  },
  {
    "word": "memory",
    "part": "noun",
    "pron": "",
    "definition": "Information retained or retrieved so an AI system can use relevant past context beyond the immediate input.",
    "example": "“The team used memory while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in agents, tools & mcp and modern AI practice.",
    "note": "Agent systems combine model decisions with tools, state, permissions, and control logic.",
    "related": [
      "working memory",
      "state",
      "long-term memory"
    ],
    "aliases": [
      "agent memory"
    ],
    "category": "Agents, Tools & MCP"
  },
  {
    "word": "working memory",
    "part": "noun",
    "pron": "",
    "definition": "Short-lived information actively used during the current task or reasoning process.",
    "example": "“The team used working memory while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in agents, tools & mcp and modern AI practice.",
    "note": "Agent systems combine model decisions with tools, state, permissions, and control logic.",
    "related": [
      "long-term memory",
      "memory",
      "episodic memory"
    ],
    "aliases": [
      "short term memory"
    ],
    "category": "Agents, Tools & MCP"
  },
  {
    "word": "long-term memory",
    "part": "noun",
    "pron": "",
    "definition": "Information stored beyond the immediate context for later retrieval and use.",
    "example": "“The team used long-term memory while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in agents, tools & mcp and modern AI practice.",
    "note": "Agent systems combine model decisions with tools, state, permissions, and control logic.",
    "related": [
      "episodic memory",
      "working memory",
      "semantic memory"
    ],
    "aliases": [
      "persistent memory"
    ],
    "category": "Agents, Tools & MCP"
  },
  {
    "word": "episodic memory",
    "part": "noun",
    "pron": "",
    "definition": "Memory organized around specific past events, interactions, or task episodes.",
    "example": "“The team used episodic memory while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in agents, tools & mcp and modern AI practice.",
    "note": "Agent systems combine model decisions with tools, state, permissions, and control logic.",
    "related": [
      "semantic memory",
      "long-term memory",
      "checkpointing"
    ],
    "aliases": [],
    "category": "Agents, Tools & MCP"
  },
  {
    "word": "semantic memory",
    "part": "noun",
    "pron": "",
    "definition": "Memory organized around facts, concepts, or generalized knowledge rather than specific episodes.",
    "example": "“The team used semantic memory while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in agents, tools & mcp and modern AI practice.",
    "note": "Agent systems combine model decisions with tools, state, permissions, and control logic.",
    "related": [
      "checkpointing",
      "episodic memory",
      "retry"
    ],
    "aliases": [],
    "category": "Agents, Tools & MCP"
  },
  {
    "word": "checkpointing",
    "part": "noun",
    "pron": "",
    "definition": "Saving workflow or agent state so a long task can resume after interruption or failure.",
    "example": "“The team used checkpointing while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in agents, tools & mcp and modern AI practice.",
    "note": "Agent systems combine model decisions with tools, state, permissions, and control logic.",
    "related": [
      "retry",
      "semantic memory",
      "backoff"
    ],
    "aliases": [
      "agent checkpoint"
    ],
    "category": "Agents, Tools & MCP"
  },
  {
    "word": "retry",
    "part": "noun",
    "pron": "",
    "definition": "Repeating a failed model or tool operation, often with limits, delays, or modified inputs.",
    "example": "“The team used retry while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in agents, tools & mcp and modern AI practice.",
    "note": "Agent systems combine model decisions with tools, state, permissions, and control logic.",
    "related": [
      "backoff",
      "checkpointing",
      "idempotency"
    ],
    "aliases": [],
    "category": "Agents, Tools & MCP"
  },
  {
    "word": "backoff",
    "part": "noun",
    "pron": "",
    "definition": "Increasing the delay between retries to reduce overload or repeated failure.",
    "example": "“The team used backoff while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in agents, tools & mcp and modern AI practice.",
    "note": "Agent systems combine model decisions with tools, state, permissions, and control logic.",
    "related": [
      "idempotency",
      "retry",
      "human in the loop"
    ],
    "aliases": [
      "retry backoff"
    ],
    "category": "Agents, Tools & MCP"
  },
  {
    "word": "idempotency",
    "part": "noun",
    "pron": "",
    "definition": "A property where repeating the same operation has the same effect as performing it once, important for reliable agent actions.",
    "example": "“The team used idempotency while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in agents, tools & mcp and modern AI practice.",
    "note": "Agent systems combine model decisions with tools, state, permissions, and control logic.",
    "related": [
      "human in the loop",
      "backoff",
      "human on the loop"
    ],
    "aliases": [
      "idempotent action"
    ],
    "category": "Agents, Tools & MCP"
  },
  {
    "word": "human in the loop",
    "part": "noun",
    "pron": "",
    "definition": "A design in which a person reviews, approves, edits, labels, or intervenes during AI operation.",
    "example": "“The team used human in the loop while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in agents, tools & mcp and modern AI practice.",
    "note": "Agent systems combine model decisions with tools, state, permissions, and control logic.",
    "related": [
      "human on the loop",
      "idempotency",
      "approval gate"
    ],
    "aliases": [
      "hitl"
    ],
    "category": "Agents, Tools & MCP"
  },
  {
    "word": "human on the loop",
    "part": "noun",
    "pron": "",
    "definition": "A design in which AI operates autonomously while a human supervises and can intervene when needed.",
    "example": "“The team used human on the loop while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in agents, tools & mcp and modern AI practice.",
    "note": "Agent systems combine model decisions with tools, state, permissions, and control logic.",
    "related": [
      "approval gate",
      "human in the loop",
      "observability"
    ],
    "aliases": [
      "hotl"
    ],
    "category": "Agents, Tools & MCP"
  },
  {
    "word": "approval gate",
    "part": "noun",
    "pron": "",
    "definition": "A checkpoint requiring explicit authorization before an agent performs a sensitive or consequential action.",
    "example": "“The team used approval gate while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in agents, tools & mcp and modern AI practice.",
    "note": "Agent systems combine model decisions with tools, state, permissions, and control logic.",
    "related": [
      "observability",
      "human on the loop",
      "trace"
    ],
    "aliases": [
      "confirmation gate"
    ],
    "category": "Agents, Tools & MCP"
  },
  {
    "word": "observability",
    "part": "noun",
    "pron": "",
    "definition": "The ability to inspect an AI system through logs, traces, metrics, events, and recorded state.",
    "example": "“The team used observability while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in agents, tools & mcp and modern AI practice.",
    "note": "Agent systems combine model decisions with tools, state, permissions, and control logic.",
    "related": [
      "trace",
      "approval gate",
      "span"
    ],
    "aliases": [
      "agent observability"
    ],
    "category": "Agents, Tools & MCP"
  },
  {
    "word": "trace",
    "part": "noun",
    "pron": "",
    "definition": "A structured record of model calls, tool calls, handoffs, and other events during one workflow execution.",
    "example": "“The team used trace while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in agents, tools & mcp and modern AI practice.",
    "note": "Agent systems combine model decisions with tools, state, permissions, and control logic.",
    "related": [
      "span",
      "observability",
      "telemetry"
    ],
    "aliases": [
      "execution trace"
    ],
    "category": "Agents, Tools & MCP"
  },
  {
    "word": "span",
    "part": "noun",
    "pron": "",
    "definition": "A timed unit of work inside a trace, such as one model request or tool invocation.",
    "example": "“The team used span while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in agents, tools & mcp and modern AI practice.",
    "note": "Agent systems combine model decisions with tools, state, permissions, and control logic.",
    "related": [
      "telemetry",
      "trace",
      "background task"
    ],
    "aliases": [
      "trace span"
    ],
    "category": "Agents, Tools & MCP"
  },
  {
    "word": "telemetry",
    "part": "noun",
    "pron": "",
    "definition": "Operational data collected from a system, such as latency, errors, token usage, and tool events.",
    "example": "“The team used telemetry while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in agents, tools & mcp and modern AI practice.",
    "note": "Agent systems combine model decisions with tools, state, permissions, and control logic.",
    "related": [
      "background task",
      "span",
      "MCP"
    ],
    "aliases": [],
    "category": "Agents, Tools & MCP"
  },
  {
    "word": "background task",
    "part": "noun",
    "pron": "",
    "definition": "A long-running operation executed asynchronously so the user or client does not need to keep one request open.",
    "example": "“The team used background task while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in agents, tools & mcp and modern AI practice.",
    "note": "Agent systems combine model decisions with tools, state, permissions, and control logic.",
    "related": [
      "MCP",
      "telemetry",
      "MCP host"
    ],
    "aliases": [
      "background mode"
    ],
    "category": "Agents, Tools & MCP"
  },
  {
    "word": "MCP",
    "part": "noun",
    "pron": "",
    "definition": "Model Context Protocol; an open protocol for connecting AI applications with external tools and contextual data.",
    "example": "“The team used MCP while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in agents, tools & mcp and modern AI practice.",
    "note": "Agent systems combine model decisions with tools, state, permissions, and control logic.",
    "related": [
      "MCP host",
      "background task",
      "MCP client"
    ],
    "aliases": [
      "model context protocol"
    ],
    "category": "Agents, Tools & MCP"
  },
  {
    "word": "MCP host",
    "part": "noun",
    "pron": "",
    "definition": "The AI application that manages user interaction and connects to one or more MCP clients or servers.",
    "example": "“The team used MCP host while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in agents, tools & mcp and modern AI practice.",
    "note": "Agent systems combine model decisions with tools, state, permissions, and control logic.",
    "related": [
      "MCP client",
      "MCP",
      "MCP server"
    ],
    "aliases": [
      "host"
    ],
    "category": "Agents, Tools & MCP"
  },
  {
    "word": "MCP client",
    "part": "noun",
    "pron": "",
    "definition": "The protocol component inside a host that maintains a connection to a particular MCP server.",
    "example": "“The team used MCP client while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in agents, tools & mcp and modern AI practice.",
    "note": "Agent systems combine model decisions with tools, state, permissions, and control logic.",
    "related": [
      "MCP server",
      "MCP host",
      "MCP tool"
    ],
    "aliases": [
      "client"
    ],
    "category": "Agents, Tools & MCP"
  },
  {
    "word": "MCP server",
    "part": "noun",
    "pron": "",
    "definition": "A service that exposes MCP capabilities such as tools, resources, and prompts to compatible clients.",
    "example": "“The team used MCP server while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in agents, tools & mcp and modern AI practice.",
    "note": "Agent systems combine model decisions with tools, state, permissions, and control logic.",
    "related": [
      "MCP tool",
      "MCP client",
      "MCP resource"
    ],
    "aliases": [
      "server"
    ],
    "category": "Agents, Tools & MCP"
  },
  {
    "word": "MCP tool",
    "part": "noun",
    "pron": "",
    "definition": "A model-controlled executable capability exposed by an MCP server.",
    "example": "“The team used MCP tool while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in agents, tools & mcp and modern AI practice.",
    "note": "Agent systems combine model decisions with tools, state, permissions, and control logic.",
    "related": [
      "MCP resource",
      "MCP server",
      "MCP prompt"
    ],
    "aliases": [
      "tool"
    ],
    "category": "Agents, Tools & MCP"
  },
  {
    "word": "MCP resource",
    "part": "noun",
    "pron": "",
    "definition": "Application-controlled contextual data exposed by an MCP server for a client or model to read.",
    "example": "“The team used MCP resource while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in agents, tools & mcp and modern AI practice.",
    "note": "Agent systems combine model decisions with tools, state, permissions, and control logic.",
    "related": [
      "MCP prompt",
      "MCP tool",
      "roots"
    ],
    "aliases": [
      "resource"
    ],
    "category": "Agents, Tools & MCP"
  },
  {
    "word": "MCP prompt",
    "part": "noun",
    "pron": "",
    "definition": "A user-controlled prompt template exposed by an MCP server.",
    "example": "“The team used MCP prompt while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in agents, tools & mcp and modern AI practice.",
    "note": "Agent systems combine model decisions with tools, state, permissions, and control logic.",
    "related": [
      "roots",
      "MCP resource",
      "sampling"
    ],
    "aliases": [
      "prompt template"
    ],
    "category": "Agents, Tools & MCP"
  },
  {
    "word": "roots",
    "part": "noun",
    "pron": "",
    "definition": "In MCP, filesystem or URI boundaries a client can expose so a server knows which locations are relevant or permitted.",
    "example": "“The team used roots while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in agents, tools & mcp and modern AI practice.",
    "note": "Agent systems combine model decisions with tools, state, permissions, and control logic.",
    "related": [
      "sampling",
      "MCP prompt",
      "elicitation"
    ],
    "aliases": [
      "mcp roots"
    ],
    "category": "Agents, Tools & MCP"
  },
  {
    "word": "elicitation",
    "part": "noun",
    "pron": "",
    "definition": "In MCP, a mechanism for a server to request additional structured information from the user through the client.",
    "example": "“The team used elicitation while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in agents, tools & mcp and modern AI practice.",
    "note": "Agent systems combine model decisions with tools, state, permissions, and control logic.",
    "related": [
      "capability negotiation",
      "sampling",
      "JSON-RPC"
    ],
    "aliases": [
      "mcp elicitation"
    ],
    "category": "Agents, Tools & MCP"
  },
  {
    "word": "capability negotiation",
    "part": "noun",
    "pron": "",
    "definition": "The process by which protocol participants announce and agree which optional features they support.",
    "example": "“The team used capability negotiation while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in agents, tools & mcp and modern AI practice.",
    "note": "Agent systems combine model decisions with tools, state, permissions, and control logic.",
    "related": [
      "JSON-RPC",
      "elicitation",
      "resource subscription"
    ],
    "aliases": [],
    "category": "Agents, Tools & MCP"
  },
  {
    "word": "JSON-RPC",
    "part": "noun",
    "pron": "",
    "definition": "A lightweight remote procedure call protocol using JSON messages, used as the base messaging format by MCP.",
    "example": "“The team used JSON-RPC while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in agents, tools & mcp and modern AI practice.",
    "note": "Agent systems combine model decisions with tools, state, permissions, and control logic.",
    "related": [
      "resource subscription",
      "capability negotiation",
      "progress notification"
    ],
    "aliases": [
      "json rpc"
    ],
    "category": "Agents, Tools & MCP"
  },
  {
    "word": "resource subscription",
    "part": "noun",
    "pron": "",
    "definition": "A mechanism for receiving notifications when a resource changes.",
    "example": "“The team used resource subscription while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in agents, tools & mcp and modern AI practice.",
    "note": "Agent systems combine model decisions with tools, state, permissions, and control logic.",
    "related": [
      "progress notification",
      "JSON-RPC",
      "cancellation"
    ],
    "aliases": [
      "subscribe resource"
    ],
    "category": "Agents, Tools & MCP"
  },
  {
    "word": "progress notification",
    "part": "noun",
    "pron": "",
    "definition": "A message reporting partial completion or status for a longer-running protocol operation.",
    "example": "“The team used progress notification while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in agents, tools & mcp and modern AI practice.",
    "note": "Agent systems combine model decisions with tools, state, permissions, and control logic.",
    "related": [
      "cancellation",
      "resource subscription",
      "skill"
    ],
    "aliases": [
      "progress tracking"
    ],
    "category": "Agents, Tools & MCP"
  },
  {
    "word": "cancellation",
    "part": "noun",
    "pron": "",
    "definition": "A protocol or workflow mechanism for requesting that ongoing work stop.",
    "example": "“The team used cancellation while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in agents, tools & mcp and modern AI practice.",
    "note": "Agent systems combine model decisions with tools, state, permissions, and control logic.",
    "related": [
      "skill",
      "progress notification",
      "artifact"
    ],
    "aliases": [],
    "category": "Agents, Tools & MCP"
  },
  {
    "word": "skill",
    "part": "noun",
    "pron": "",
    "definition": "A reusable package of instructions, procedures, or domain methods that an agent can load to perform a class of tasks more reliably.",
    "example": "“The team used skill while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in agents, tools & mcp and modern AI practice.",
    "note": "Agent systems combine model decisions with tools, state, permissions, and control logic.",
    "related": [
      "artifact",
      "cancellation",
      "agent"
    ],
    "aliases": [
      "agent skill"
    ],
    "category": "Agents, Tools & MCP"
  },
  {
    "word": "artifact",
    "part": "noun",
    "pron": "",
    "definition": "A durable output produced by an AI workflow, such as a document, spreadsheet, image, code patch, or report.",
    "example": "“The team used artifact while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in agents, tools & mcp and modern AI practice.",
    "note": "Agent systems combine model decisions with tools, state, permissions, and control logic.",
    "related": [
      "agent",
      "skill",
      "agentic"
    ],
    "aliases": [
      "generated artifact"
    ],
    "category": "Agents, Tools & MCP"
  },
  {
    "word": "evaluation",
    "part": "noun",
    "pron": "",
    "definition": "The systematic measurement of an AI system's quality, capability, reliability, or safety on defined tasks.",
    "example": "“The team used evaluation while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in evaluation & metrics and modern AI practice.",
    "note": "A metric is useful only when it reflects the behavior and failure modes users actually care about.",
    "related": [
      "eval",
      "leaderboard",
      "eval suite"
    ],
    "aliases": [
      "eval"
    ],
    "category": "Evaluation & Metrics"
  },
  {
    "word": "eval suite",
    "part": "noun",
    "pron": "",
    "definition": "A collection of evaluations run together to track multiple behaviors or failure modes.",
    "example": "“The team used eval suite while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in evaluation & metrics and modern AI practice.",
    "note": "A metric is useful only when it reflects the behavior and failure modes users actually care about.",
    "related": [
      "eval set",
      "eval",
      "benchmark"
    ],
    "aliases": [
      "evaluation suite"
    ],
    "category": "Evaluation & Metrics"
  },
  {
    "word": "eval set",
    "part": "noun",
    "pron": "",
    "definition": "A dataset of examples reserved for evaluating a model or system.",
    "example": "“The team used eval set while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in evaluation & metrics and modern AI practice.",
    "note": "A metric is useful only when it reflects the behavior and failure modes users actually care about.",
    "related": [
      "benchmark",
      "eval suite",
      "baseline"
    ],
    "aliases": [
      "evaluation dataset"
    ],
    "category": "Evaluation & Metrics"
  },
  {
    "word": "baseline",
    "part": "noun",
    "pron": "",
    "definition": "A reference system, simple method, or prior result used as a comparison point.",
    "example": "“The team used baseline while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in evaluation & metrics and modern AI practice.",
    "note": "A metric is useful only when it reflects the behavior and failure modes users actually care about.",
    "related": [
      "metric",
      "benchmark",
      "accuracy"
    ],
    "aliases": [],
    "category": "Evaluation & Metrics"
  },
  {
    "word": "metric",
    "part": "noun",
    "pron": "",
    "definition": "A numeric measure used to quantify model or system performance.",
    "example": "“The team used metric while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in evaluation & metrics and modern AI practice.",
    "note": "A metric is useful only when it reflects the behavior and failure modes users actually care about.",
    "related": [
      "accuracy",
      "baseline",
      "precision"
    ],
    "aliases": [],
    "category": "Evaluation & Metrics"
  },
  {
    "word": "accuracy",
    "part": "noun",
    "pron": "",
    "definition": "The fraction of evaluated predictions that are correct under a chosen definition of correctness.",
    "example": "“The team used accuracy while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in evaluation & metrics and modern AI practice.",
    "note": "A metric is useful only when it reflects the behavior and failure modes users actually care about.",
    "related": [
      "precision",
      "metric",
      "recall"
    ],
    "aliases": [],
    "category": "Evaluation & Metrics"
  },
  {
    "word": "precision",
    "part": "noun",
    "pron": "",
    "definition": "Among predicted positives, the fraction that are actually positive.",
    "example": "“The team used precision while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in evaluation & metrics and modern AI practice.",
    "note": "A metric is useful only when it reflects the behavior and failure modes users actually care about.",
    "related": [
      "recall",
      "accuracy",
      "F1 score"
    ],
    "aliases": [],
    "category": "Evaluation & Metrics"
  },
  {
    "word": "recall",
    "part": "noun",
    "pron": "",
    "definition": "Among actual positives, the fraction correctly identified by the model.",
    "example": "“The team used recall while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in evaluation & metrics and modern AI practice.",
    "note": "A metric is useful only when it reflects the behavior and failure modes users actually care about.",
    "related": [
      "F1 score",
      "precision",
      "specificity"
    ],
    "aliases": [
      "sensitivity"
    ],
    "category": "Evaluation & Metrics"
  },
  {
    "word": "F1 score",
    "part": "noun",
    "pron": "",
    "definition": "The harmonic mean of precision and recall, used when both kinds of error matter.",
    "example": "“The team used F1 score while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in evaluation & metrics and modern AI practice.",
    "note": "A metric is useful only when it reflects the behavior and failure modes users actually care about.",
    "related": [
      "specificity",
      "recall",
      "ROC curve"
    ],
    "aliases": [
      "f1"
    ],
    "category": "Evaluation & Metrics"
  },
  {
    "word": "specificity",
    "part": "noun",
    "pron": "",
    "definition": "Among actual negatives, the fraction correctly identified as negative.",
    "example": "“The team used specificity while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in evaluation & metrics and modern AI practice.",
    "note": "A metric is useful only when it reflects the behavior and failure modes users actually care about.",
    "related": [
      "ROC curve",
      "F1 score",
      "AUC"
    ],
    "aliases": [
      "true negative rate"
    ],
    "category": "Evaluation & Metrics"
  },
  {
    "word": "ROC curve",
    "part": "noun",
    "pron": "",
    "definition": "A curve showing true-positive rate against false-positive rate across classification thresholds.",
    "example": "“The team used ROC curve while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in evaluation & metrics and modern AI practice.",
    "note": "A metric is useful only when it reflects the behavior and failure modes users actually care about.",
    "related": [
      "AUC",
      "specificity",
      "confusion matrix"
    ],
    "aliases": [
      "receiver operating characteristic"
    ],
    "category": "Evaluation & Metrics"
  },
  {
    "word": "AUC",
    "part": "noun",
    "pron": "",
    "definition": "Area under a curve; often the area under the ROC curve used to summarize ranking performance.",
    "example": "“The team used AUC while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in evaluation & metrics and modern AI practice.",
    "note": "A metric is useful only when it reflects the behavior and failure modes users actually care about.",
    "related": [
      "confusion matrix",
      "ROC curve",
      "exact match"
    ],
    "aliases": [
      "area under curve"
    ],
    "category": "Evaluation & Metrics"
  },
  {
    "word": "confusion matrix",
    "part": "noun",
    "pron": "",
    "definition": "A table counting predicted versus actual classes, exposing true positives, false positives, true negatives, and false negatives.",
    "example": "“The team used confusion matrix while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in evaluation & metrics and modern AI practice.",
    "note": "A metric is useful only when it reflects the behavior and failure modes users actually care about.",
    "related": [
      "exact match",
      "AUC",
      "pass@k"
    ],
    "aliases": [],
    "category": "Evaluation & Metrics"
  },
  {
    "word": "exact match",
    "part": "noun",
    "pron": "",
    "definition": "An evaluation that counts a prediction as correct only when it exactly matches the reference answer under defined normalization.",
    "example": "“The team used exact match while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in evaluation & metrics and modern AI practice.",
    "note": "A metric is useful only when it reflects the behavior and failure modes users actually care about.",
    "related": [
      "pass@k",
      "confusion matrix",
      "perplexity"
    ],
    "aliases": [
      "em"
    ],
    "category": "Evaluation & Metrics"
  },
  {
    "word": "pass@k",
    "part": "noun",
    "pron": "",
    "definition": "The probability that at least one of k sampled solutions passes a correctness test, often used for code generation.",
    "example": "“The team used pass@k while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in evaluation & metrics and modern AI practice.",
    "note": "A metric is useful only when it reflects the behavior and failure modes users actually care about.",
    "related": [
      "perplexity",
      "exact match",
      "cross-entropy"
    ],
    "aliases": [
      "pass at k"
    ],
    "category": "Evaluation & Metrics"
  },
  {
    "word": "perplexity",
    "part": "noun",
    "pron": "",
    "definition": "A language-model metric derived from average negative log-likelihood; lower perplexity indicates better prediction of the evaluated text.",
    "example": "“The team used perplexity while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in evaluation & metrics and modern AI practice.",
    "note": "A metric is useful only when it reflects the behavior and failure modes users actually care about.",
    "related": [
      "cross-entropy",
      "pass@k",
      "BLEU"
    ],
    "aliases": [],
    "category": "Evaluation & Metrics"
  },
  {
    "word": "cross-entropy",
    "part": "noun",
    "pron": "",
    "definition": "A loss measuring how well a predicted probability distribution matches target labels or tokens.",
    "example": "“The team used cross-entropy while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in evaluation & metrics and modern AI practice.",
    "note": "A metric is useful only when it reflects the behavior and failure modes users actually care about.",
    "related": [
      "BLEU",
      "perplexity",
      "ROUGE"
    ],
    "aliases": [],
    "category": "Evaluation & Metrics"
  },
  {
    "word": "BLEU",
    "part": "noun",
    "pron": "",
    "definition": "A reference-based text-generation metric originally popularized for machine translation.",
    "example": "“The team used BLEU while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in evaluation & metrics and modern AI practice.",
    "note": "A metric is useful only when it reflects the behavior and failure modes users actually care about.",
    "related": [
      "ROUGE",
      "cross-entropy",
      "BERTScore"
    ],
    "aliases": [
      "bilingual evaluation understudy"
    ],
    "category": "Evaluation & Metrics"
  },
  {
    "word": "ROUGE",
    "part": "noun",
    "pron": "",
    "definition": "A family of overlap-based metrics commonly used for summarization evaluation.",
    "example": "“The team used ROUGE while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in evaluation & metrics and modern AI practice.",
    "note": "A metric is useful only when it reflects the behavior and failure modes users actually care about.",
    "related": [
      "BERTScore",
      "BLEU",
      "word error rate"
    ],
    "aliases": [
      "recall oriented understudy for gisting evaluation"
    ],
    "category": "Evaluation & Metrics"
  },
  {
    "word": "BERTScore",
    "part": "noun",
    "pron": "",
    "definition": "A text-similarity metric that compares contextual token embeddings between generated and reference text.",
    "example": "“The team used BERTScore while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in evaluation & metrics and modern AI practice.",
    "note": "A metric is useful only when it reflects the behavior and failure modes users actually care about.",
    "related": [
      "word error rate",
      "ROUGE",
      "character error rate"
    ],
    "aliases": [],
    "category": "Evaluation & Metrics"
  },
  {
    "word": "word error rate",
    "part": "noun",
    "pron": "",
    "definition": "A speech-recognition metric based on substitutions, deletions, and insertions needed to match the reference transcript.",
    "example": "“The team used word error rate while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in evaluation & metrics and modern AI practice.",
    "note": "A metric is useful only when it reflects the behavior and failure modes users actually care about.",
    "related": [
      "character error rate",
      "BERTScore",
      "intersection over union"
    ],
    "aliases": [
      "wer"
    ],
    "category": "Evaluation & Metrics"
  },
  {
    "word": "character error rate",
    "part": "noun",
    "pron": "",
    "definition": "A transcription metric computed at the character level.",
    "example": "“The team used character error rate while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in evaluation & metrics and modern AI practice.",
    "note": "A metric is useful only when it reflects the behavior and failure modes users actually care about.",
    "related": [
      "intersection over union",
      "word error rate",
      "mean average precision"
    ],
    "aliases": [
      "cer"
    ],
    "category": "Evaluation & Metrics"
  },
  {
    "word": "intersection over union",
    "part": "noun",
    "pron": "",
    "definition": "A measure of overlap between predicted and reference regions, widely used in vision segmentation and detection.",
    "example": "“The team used intersection over union while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in evaluation & metrics and modern AI practice.",
    "note": "A metric is useful only when it reflects the behavior and failure modes users actually care about.",
    "related": [
      "mean average precision",
      "character error rate",
      "calibration"
    ],
    "aliases": [
      "iou"
    ],
    "category": "Evaluation & Metrics"
  },
  {
    "word": "mean average precision",
    "part": "noun",
    "pron": "",
    "definition": "A ranking and detection metric averaging precision across classes or thresholds.",
    "example": "“The team used mean average precision while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in evaluation & metrics and modern AI practice.",
    "note": "A metric is useful only when it reflects the behavior and failure modes users actually care about.",
    "related": [
      "calibration",
      "intersection over union",
      "expected calibration error"
    ],
    "aliases": [
      "map"
    ],
    "category": "Evaluation & Metrics"
  },
  {
    "word": "calibration",
    "part": "noun",
    "pron": "",
    "definition": "How well predicted confidence corresponds to actual correctness frequency.",
    "example": "“The team used calibration while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in evaluation & metrics and modern AI practice.",
    "note": "A metric is useful only when it reflects the behavior and failure modes users actually care about.",
    "related": [
      "expected calibration error",
      "mean average precision",
      "human evaluation"
    ],
    "aliases": [
      "probability calibration"
    ],
    "category": "Evaluation & Metrics"
  },
  {
    "word": "expected calibration error",
    "part": "noun",
    "pron": "",
    "definition": "A summary metric comparing predicted confidence with observed accuracy across confidence bins.",
    "example": "“The team used expected calibration error while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in evaluation & metrics and modern AI practice.",
    "note": "A metric is useful only when it reflects the behavior and failure modes users actually care about.",
    "related": [
      "human evaluation",
      "calibration",
      "pairwise preference"
    ],
    "aliases": [
      "ece"
    ],
    "category": "Evaluation & Metrics"
  },
  {
    "word": "human evaluation",
    "part": "noun",
    "pron": "",
    "definition": "Assessment performed by people using ratings, rankings, rubrics, or qualitative judgments.",
    "example": "“The team used human evaluation while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in evaluation & metrics and modern AI practice.",
    "note": "A metric is useful only when it reflects the behavior and failure modes users actually care about.",
    "related": [
      "pairwise preference",
      "expected calibration error",
      "rubric"
    ],
    "aliases": [
      "human eval"
    ],
    "category": "Evaluation & Metrics"
  },
  {
    "word": "pairwise preference",
    "part": "noun",
    "pron": "",
    "definition": "An evaluation where a judge chooses which of two outputs is better under stated criteria.",
    "example": "“The team used pairwise preference while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in evaluation & metrics and modern AI practice.",
    "note": "A metric is useful only when it reflects the behavior and failure modes users actually care about.",
    "related": [
      "rubric",
      "human evaluation",
      "LLM-as-a-judge"
    ],
    "aliases": [
      "a/b preference"
    ],
    "category": "Evaluation & Metrics"
  },
  {
    "word": "rubric",
    "part": "noun",
    "pron": "",
    "definition": "A structured set of criteria used to judge model outputs consistently.",
    "example": "“The team used rubric while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in evaluation & metrics and modern AI practice.",
    "note": "A metric is useful only when it reflects the behavior and failure modes users actually care about.",
    "related": [
      "LLM-as-a-judge",
      "pairwise preference",
      "judge model"
    ],
    "aliases": [],
    "category": "Evaluation & Metrics"
  },
  {
    "word": "LLM-as-a-judge",
    "part": "noun",
    "pron": "",
    "definition": "Using a language model to score, rank, or critique outputs according to an evaluation rubric.",
    "example": "“The team used LLM-as-a-judge while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in evaluation & metrics and modern AI practice.",
    "note": "A metric is useful only when it reflects the behavior and failure modes users actually care about.",
    "related": [
      "judge model",
      "rubric",
      "trace grading"
    ],
    "aliases": [
      "model judge"
    ],
    "category": "Evaluation & Metrics"
  },
  {
    "word": "judge model",
    "part": "noun",
    "pron": "",
    "definition": "A model used to evaluate another model's output.",
    "example": "“The team used judge model while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in evaluation & metrics and modern AI practice.",
    "note": "A metric is useful only when it reflects the behavior and failure modes users actually care about.",
    "related": [
      "trace grading",
      "LLM-as-a-judge",
      "regression"
    ],
    "aliases": [
      "grader model"
    ],
    "category": "Evaluation & Metrics"
  },
  {
    "word": "trace grading",
    "part": "noun",
    "pron": "",
    "definition": "Evaluating not only the final answer but also intermediate tool calls, transitions, or workflow behavior recorded in a trace.",
    "example": "“The team used trace grading while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in evaluation & metrics and modern AI practice.",
    "note": "A metric is useful only when it reflects the behavior and failure modes users actually care about.",
    "related": [
      "regression",
      "judge model",
      "ablation"
    ],
    "aliases": [],
    "category": "Evaluation & Metrics"
  },
  {
    "word": "regression",
    "part": "noun",
    "pron": "",
    "definition": "A previously working capability or behavior becoming worse after a model, prompt, data, or system change.",
    "example": "“The team used regression while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in evaluation & metrics and modern AI practice.",
    "note": "A metric is useful only when it reflects the behavior and failure modes users actually care about.",
    "related": [
      "ablation",
      "trace grading",
      "robustness"
    ],
    "aliases": [
      "quality regression"
    ],
    "category": "Evaluation & Metrics"
  },
  {
    "word": "ablation",
    "part": "noun",
    "pron": "",
    "definition": "Testing the importance of a component by removing or modifying it and measuring the effect.",
    "example": "“The team used ablation while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in evaluation & metrics and modern AI practice.",
    "note": "A metric is useful only when it reflects the behavior and failure modes users actually care about.",
    "related": [
      "robustness",
      "regression",
      "out-of-distribution"
    ],
    "aliases": [
      "ablation study"
    ],
    "category": "Evaluation & Metrics"
  },
  {
    "word": "robustness",
    "part": "noun",
    "pron": "",
    "definition": "A system's ability to maintain useful behavior under noise, variation, attacks, or distribution changes.",
    "example": "“The team used robustness while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in evaluation & metrics and modern AI practice.",
    "note": "A metric is useful only when it reflects the behavior and failure modes users actually care about.",
    "related": [
      "out-of-distribution",
      "ablation",
      "benchmark contamination"
    ],
    "aliases": [],
    "category": "Evaluation & Metrics"
  },
  {
    "word": "out-of-distribution",
    "part": "noun",
    "pron": "",
    "definition": "Describing inputs that differ meaningfully from the distribution represented in training or normal evaluation data.",
    "example": "“The team used out-of-distribution while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in evaluation & metrics and modern AI practice.",
    "note": "A metric is useful only when it reflects the behavior and failure modes users actually care about.",
    "related": [
      "benchmark contamination",
      "robustness",
      "data leakage"
    ],
    "aliases": [
      "ood"
    ],
    "category": "Evaluation & Metrics"
  },
  {
    "word": "benchmark contamination",
    "part": "noun",
    "pron": "",
    "definition": "When benchmark examples or near-duplicates appear in training data, making evaluation results less trustworthy.",
    "example": "“The team used benchmark contamination while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in evaluation & metrics and modern AI practice.",
    "note": "A metric is useful only when it reflects the behavior and failure modes users actually care about.",
    "related": [
      "data leakage",
      "out-of-distribution",
      "ceiling effect"
    ],
    "aliases": [
      "test contamination"
    ],
    "category": "Evaluation & Metrics"
  },
  {
    "word": "data leakage",
    "part": "noun",
    "pron": "",
    "definition": "Information from validation, test, or future data unintentionally influencing model training or system decisions.",
    "example": "“The team used data leakage while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in evaluation & metrics and modern AI practice.",
    "note": "A metric is useful only when it reflects the behavior and failure modes users actually care about.",
    "related": [
      "ceiling effect",
      "benchmark contamination",
      "leaderboard"
    ],
    "aliases": [
      "leakage"
    ],
    "category": "Evaluation & Metrics"
  },
  {
    "word": "ceiling effect",
    "part": "noun",
    "pron": "",
    "definition": "When an evaluation becomes too easy to distinguish stronger systems because many models score near the maximum.",
    "example": "“The team used ceiling effect while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in evaluation & metrics and modern AI practice.",
    "note": "A metric is useful only when it reflects the behavior and failure modes users actually care about.",
    "related": [
      "leaderboard",
      "data leakage",
      "evaluation"
    ],
    "aliases": [],
    "category": "Evaluation & Metrics"
  },
  {
    "word": "leaderboard",
    "part": "noun",
    "pron": "",
    "definition": "A public or internal ranking of models or systems based on benchmark or evaluation scores.",
    "example": "“The team used leaderboard while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in evaluation & metrics and modern AI practice.",
    "note": "A metric is useful only when it reflects the behavior and failure modes users actually care about.",
    "related": [
      "evaluation",
      "ceiling effect",
      "eval"
    ],
    "aliases": [],
    "category": "Evaluation & Metrics"
  },
  {
    "word": "AI safety",
    "part": "noun",
    "pron": "",
    "definition": "Research and engineering aimed at reducing harmful, unreliable, or uncontrollable AI behavior.",
    "example": "“The team used AI safety while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in safety, security & alignment and modern AI practice.",
    "note": "Safety work balances capability with control, privacy, robustness, and human oversight.",
    "related": [
      "guardrail",
      "alignment",
      "policy"
    ],
    "aliases": [
      "safety"
    ],
    "category": "Safety, Security & Alignment"
  },
  {
    "word": "policy",
    "part": "noun",
    "pron": "",
    "definition": "A set of rules describing allowed, disallowed, or required behavior for an AI system.",
    "example": "“The team used policy while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in safety, security & alignment and modern AI practice.",
    "note": "Safety work balances capability with control, privacy, robustness, and human oversight.",
    "related": [
      "content moderation",
      "guardrail",
      "refusal"
    ],
    "aliases": [
      "safety policy"
    ],
    "category": "Safety, Security & Alignment"
  },
  {
    "word": "content moderation",
    "part": "noun",
    "pron": "",
    "definition": "Detecting or handling content that violates safety, legal, or platform rules.",
    "example": "“The team used content moderation while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in safety, security & alignment and modern AI practice.",
    "note": "Safety work balances capability with control, privacy, robustness, and human oversight.",
    "related": [
      "refusal",
      "policy",
      "overrefusal"
    ],
    "aliases": [
      "moderation"
    ],
    "category": "Safety, Security & Alignment"
  },
  {
    "word": "refusal",
    "part": "noun",
    "pron": "",
    "definition": "A response in which an AI system declines a request because it is unsafe, disallowed, or beyond permitted scope.",
    "example": "“The team used refusal while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in safety, security & alignment and modern AI practice.",
    "note": "Safety work balances capability with control, privacy, robustness, and human oversight.",
    "related": [
      "overrefusal",
      "content moderation",
      "jailbreak"
    ],
    "aliases": [],
    "category": "Safety, Security & Alignment"
  },
  {
    "word": "overrefusal",
    "part": "noun",
    "pron": "",
    "definition": "When a safety system declines benign or allowed requests more often than intended.",
    "example": "“The team used overrefusal while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in safety, security & alignment and modern AI practice.",
    "note": "Safety work balances capability with control, privacy, robustness, and human oversight.",
    "related": [
      "jailbreak",
      "refusal",
      "prompt injection"
    ],
    "aliases": [
      "false refusal"
    ],
    "category": "Safety, Security & Alignment"
  },
  {
    "word": "jailbreak",
    "part": "noun",
    "pron": "",
    "definition": "A prompt or interaction designed to bypass an AI system's intended safety or instruction constraints.",
    "example": "“The team used jailbreak while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in safety, security & alignment and modern AI practice.",
    "note": "Safety work balances capability with control, privacy, robustness, and human oversight.",
    "related": [
      "prompt injection",
      "overrefusal",
      "indirect prompt injection"
    ],
    "aliases": [
      "jailbreaking"
    ],
    "category": "Safety, Security & Alignment"
  },
  {
    "word": "prompt injection",
    "part": "noun",
    "pron": "",
    "definition": "Malicious or conflicting instructions placed in model-visible content to manipulate an AI system's behavior.",
    "example": "“The team used prompt injection while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in safety, security & alignment and modern AI practice.",
    "note": "Safety work balances capability with control, privacy, robustness, and human oversight.",
    "related": [
      "indirect prompt injection",
      "jailbreak",
      "data exfiltration"
    ],
    "aliases": [
      "instruction injection"
    ],
    "category": "Safety, Security & Alignment"
  },
  {
    "word": "indirect prompt injection",
    "part": "noun",
    "pron": "",
    "definition": "Prompt injection hidden inside external content such as a webpage, document, email, or tool result rather than directly typed by the user.",
    "example": "“The team used indirect prompt injection while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in safety, security & alignment and modern AI practice.",
    "note": "Safety work balances capability with control, privacy, robustness, and human oversight.",
    "related": [
      "data exfiltration",
      "prompt injection",
      "tool poisoning"
    ],
    "aliases": [],
    "category": "Safety, Security & Alignment"
  },
  {
    "word": "data exfiltration",
    "part": "noun",
    "pron": "",
    "definition": "Unauthorized extraction or disclosure of secrets, private data, credentials, or protected context.",
    "example": "“The team used data exfiltration while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in safety, security & alignment and modern AI practice.",
    "note": "Safety work balances capability with control, privacy, robustness, and human oversight.",
    "related": [
      "tool poisoning",
      "indirect prompt injection",
      "adversarial example"
    ],
    "aliases": [
      "exfiltration"
    ],
    "category": "Safety, Security & Alignment"
  },
  {
    "word": "tool poisoning",
    "part": "noun",
    "pron": "",
    "definition": "Manipulating tool descriptions, outputs, or connected data so an agent is induced to take unsafe or incorrect actions.",
    "example": "“The team used tool poisoning while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in safety, security & alignment and modern AI practice.",
    "note": "Safety work balances capability with control, privacy, robustness, and human oversight.",
    "related": [
      "adversarial example",
      "data exfiltration",
      "adversarial attack"
    ],
    "aliases": [],
    "category": "Safety, Security & Alignment"
  },
  {
    "word": "adversarial example",
    "part": "noun",
    "pron": "",
    "definition": "An input deliberately modified to cause a model to make a mistake while appearing similar to a normal input.",
    "example": "“The team used adversarial example while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in safety, security & alignment and modern AI practice.",
    "note": "Safety work balances capability with control, privacy, robustness, and human oversight.",
    "related": [
      "adversarial attack",
      "tool poisoning",
      "adversarial training"
    ],
    "aliases": [
      "adversarial input"
    ],
    "category": "Safety, Security & Alignment"
  },
  {
    "word": "adversarial attack",
    "part": "noun",
    "pron": "",
    "definition": "An attempt to exploit a model's weaknesses through crafted inputs, training manipulation, or system-level abuse.",
    "example": "“The team used adversarial attack while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in safety, security & alignment and modern AI practice.",
    "note": "Safety work balances capability with control, privacy, robustness, and human oversight.",
    "related": [
      "adversarial training",
      "adversarial example",
      "red teaming"
    ],
    "aliases": [],
    "category": "Safety, Security & Alignment"
  },
  {
    "word": "adversarial training",
    "part": "noun",
    "pron": "",
    "definition": "Training on adversarially perturbed examples to make a model more robust against similar attacks.",
    "example": "“The team used adversarial training while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in safety, security & alignment and modern AI practice.",
    "note": "Safety work balances capability with control, privacy, robustness, and human oversight.",
    "related": [
      "red teaming",
      "adversarial attack",
      "safety eval"
    ],
    "aliases": [],
    "category": "Safety, Security & Alignment"
  },
  {
    "word": "red teaming",
    "part": "noun",
    "pron": "",
    "definition": "Structured attempts to discover harmful behaviors, security weaknesses, policy failures, or unexpected capabilities.",
    "example": "“The team used red teaming while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in safety, security & alignment and modern AI practice.",
    "note": "Safety work balances capability with control, privacy, robustness, and human oversight.",
    "related": [
      "safety eval",
      "adversarial training",
      "reward hacking"
    ],
    "aliases": [
      "red team"
    ],
    "category": "Safety, Security & Alignment"
  },
  {
    "word": "safety eval",
    "part": "noun",
    "pron": "",
    "definition": "An evaluation focused on harmful capabilities, misuse, policy compliance, refusal quality, or robustness.",
    "example": "“The team used safety eval while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in safety, security & alignment and modern AI practice.",
    "note": "Safety work balances capability with control, privacy, robustness, and human oversight.",
    "related": [
      "reward hacking",
      "red teaming",
      "specification gaming"
    ],
    "aliases": [
      "safety evaluation"
    ],
    "category": "Safety, Security & Alignment"
  },
  {
    "word": "reward hacking",
    "part": "noun",
    "pron": "",
    "definition": "When an agent finds a way to maximize its measured reward without achieving the intended goal.",
    "example": "“The team used reward hacking while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in safety, security & alignment and modern AI practice.",
    "note": "Safety work balances capability with control, privacy, robustness, and human oversight.",
    "related": [
      "specification gaming",
      "safety eval",
      "goal misgeneralization"
    ],
    "aliases": [
      "specification gaming"
    ],
    "category": "Safety, Security & Alignment"
  },
  {
    "word": "specification gaming",
    "part": "noun",
    "pron": "",
    "definition": "Exploiting gaps between the literal objective and what designers actually intended.",
    "example": "“The team used specification gaming while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in safety, security & alignment and modern AI practice.",
    "note": "Safety work balances capability with control, privacy, robustness, and human oversight.",
    "related": [
      "goal misgeneralization",
      "reward hacking",
      "misalignment"
    ],
    "aliases": [
      "reward hacking"
    ],
    "category": "Safety, Security & Alignment"
  },
  {
    "word": "goal misgeneralization",
    "part": "noun",
    "pron": "",
    "definition": "When a learned policy behaves according to an unintended goal in new situations despite good training performance.",
    "example": "“The team used goal misgeneralization while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in safety, security & alignment and modern AI practice.",
    "note": "Safety work balances capability with control, privacy, robustness, and human oversight.",
    "related": [
      "misalignment",
      "specification gaming",
      "corrigibility"
    ],
    "aliases": [],
    "category": "Safety, Security & Alignment"
  },
  {
    "word": "misalignment",
    "part": "noun",
    "pron": "",
    "definition": "Behavior that conflicts with intended objectives, constraints, or human preferences.",
    "example": "“The team used misalignment while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in safety, security & alignment and modern AI practice.",
    "note": "Safety work balances capability with control, privacy, robustness, and human oversight.",
    "related": [
      "corrigibility",
      "goal misgeneralization",
      "scalable oversight"
    ],
    "aliases": [],
    "category": "Safety, Security & Alignment"
  },
  {
    "word": "corrigibility",
    "part": "noun",
    "pron": "",
    "definition": "The desirable property that an AI system remains receptive to correction, shutdown, modification, or oversight.",
    "example": "“The team used corrigibility while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in safety, security & alignment and modern AI practice.",
    "note": "Safety work balances capability with control, privacy, robustness, and human oversight.",
    "related": [
      "scalable oversight",
      "misalignment",
      "harmlessness"
    ],
    "aliases": [],
    "category": "Safety, Security & Alignment"
  },
  {
    "word": "scalable oversight",
    "part": "noun",
    "pron": "",
    "definition": "Methods for supervising or evaluating AI systems even when direct human review of every step is too expensive or difficult.",
    "example": "“The team used scalable oversight while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in safety, security & alignment and modern AI practice.",
    "note": "Safety work balances capability with control, privacy, robustness, and human oversight.",
    "related": [
      "harmlessness",
      "corrigibility",
      "helpfulness"
    ],
    "aliases": [],
    "category": "Safety, Security & Alignment"
  },
  {
    "word": "harmlessness",
    "part": "noun",
    "pron": "",
    "definition": "A safety objective emphasizing avoidance of harmful outputs or actions.",
    "example": "“The team used harmlessness while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in safety, security & alignment and modern AI practice.",
    "note": "Safety work balances capability with control, privacy, robustness, and human oversight.",
    "related": [
      "helpfulness",
      "scalable oversight",
      "honesty"
    ],
    "aliases": [],
    "category": "Safety, Security & Alignment"
  },
  {
    "word": "helpfulness",
    "part": "noun",
    "pron": "",
    "definition": "An objective emphasizing useful, relevant assistance while respecting constraints.",
    "example": "“The team used helpfulness while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in safety, security & alignment and modern AI practice.",
    "note": "Safety work balances capability with control, privacy, robustness, and human oversight.",
    "related": [
      "honesty",
      "harmlessness",
      "uncertainty"
    ],
    "aliases": [],
    "category": "Safety, Security & Alignment"
  },
  {
    "word": "honesty",
    "part": "noun",
    "pron": "",
    "definition": "An objective emphasizing truthful uncertainty, accurate claims, and avoidance of deception or fabrication.",
    "example": "“The team used honesty while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in safety, security & alignment and modern AI practice.",
    "note": "Safety work balances capability with control, privacy, robustness, and human oversight.",
    "related": [
      "uncertainty",
      "helpfulness",
      "confidence"
    ],
    "aliases": [],
    "category": "Safety, Security & Alignment"
  },
  {
    "word": "uncertainty",
    "part": "noun",
    "pron": "",
    "definition": "A representation or acknowledgement of limited confidence about a prediction, answer, or decision.",
    "example": "“The team used uncertainty while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in safety, security & alignment and modern AI practice.",
    "note": "Safety work balances capability with control, privacy, robustness, and human oversight.",
    "related": [
      "confidence",
      "honesty",
      "toxicity"
    ],
    "aliases": [
      "model uncertainty"
    ],
    "category": "Safety, Security & Alignment"
  },
  {
    "word": "confidence",
    "part": "noun",
    "pron": "",
    "definition": "A score or expression indicating how strongly a model or system supports a prediction; it may be poorly calibrated.",
    "example": "“The team used confidence while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in safety, security & alignment and modern AI practice.",
    "note": "Safety work balances capability with control, privacy, robustness, and human oversight.",
    "related": [
      "toxicity",
      "uncertainty",
      "bias"
    ],
    "aliases": [
      "model confidence"
    ],
    "category": "Safety, Security & Alignment"
  },
  {
    "word": "toxicity",
    "part": "noun",
    "pron": "",
    "definition": "Content that is abusive, hateful, threatening, or otherwise harmful under a chosen definition.",
    "example": "“The team used toxicity while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in safety, security & alignment and modern AI practice.",
    "note": "Safety work balances capability with control, privacy, robustness, and human oversight.",
    "related": [
      "bias",
      "confidence",
      "fairness"
    ],
    "aliases": [
      "toxic content"
    ],
    "category": "Safety, Security & Alignment"
  },
  {
    "word": "bias",
    "part": "noun",
    "pron": "",
    "definition": "A systematic tendency in model behavior, data, or evaluation that can produce skewed or unfair outcomes.",
    "example": "“The team used bias while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in safety, security & alignment and modern AI practice.",
    "note": "Safety work balances capability with control, privacy, robustness, and human oversight.",
    "related": [
      "fairness",
      "toxicity",
      "demographic parity"
    ],
    "aliases": [
      "model bias"
    ],
    "category": "Safety, Security & Alignment"
  },
  {
    "word": "fairness",
    "part": "noun",
    "pron": "",
    "definition": "The study and design of systems intended to avoid unjustified performance or treatment disparities across people or groups.",
    "example": "“The team used fairness while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in safety, security & alignment and modern AI practice.",
    "note": "Safety work balances capability with control, privacy, robustness, and human oversight.",
    "related": [
      "demographic parity",
      "bias",
      "equalized odds"
    ],
    "aliases": [
      "ai fairness"
    ],
    "category": "Safety, Security & Alignment"
  },
  {
    "word": "demographic parity",
    "part": "noun",
    "pron": "",
    "definition": "A fairness criterion requiring positive outcomes to occur at similar rates across demographic groups.",
    "example": "“The team used demographic parity while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in safety, security & alignment and modern AI practice.",
    "note": "Safety work balances capability with control, privacy, robustness, and human oversight.",
    "related": [
      "equalized odds",
      "fairness",
      "disparate impact"
    ],
    "aliases": [
      "statistical parity"
    ],
    "category": "Safety, Security & Alignment"
  },
  {
    "word": "equalized odds",
    "part": "noun",
    "pron": "",
    "definition": "A fairness criterion requiring equal true-positive and false-positive rates across specified groups.",
    "example": "“The team used equalized odds while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in safety, security & alignment and modern AI practice.",
    "note": "Safety work balances capability with control, privacy, robustness, and human oversight.",
    "related": [
      "disparate impact",
      "demographic parity",
      "privacy"
    ],
    "aliases": [],
    "category": "Safety, Security & Alignment"
  },
  {
    "word": "disparate impact",
    "part": "noun",
    "pron": "",
    "definition": "A pattern where a seemingly neutral process produces substantially different outcomes for protected or relevant groups.",
    "example": "“The team used disparate impact while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in safety, security & alignment and modern AI practice.",
    "note": "Safety work balances capability with control, privacy, robustness, and human oversight.",
    "related": [
      "privacy",
      "equalized odds",
      "PII"
    ],
    "aliases": [],
    "category": "Safety, Security & Alignment"
  },
  {
    "word": "privacy",
    "part": "noun",
    "pron": "",
    "definition": "Protection against inappropriate collection, exposure, inference, or use of personal or confidential information.",
    "example": "“The team used privacy while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in safety, security & alignment and modern AI practice.",
    "note": "Safety work balances capability with control, privacy, robustness, and human oversight.",
    "related": [
      "PII",
      "disparate impact",
      "differential privacy"
    ],
    "aliases": [
      "data privacy"
    ],
    "category": "Safety, Security & Alignment"
  },
  {
    "word": "PII",
    "part": "noun",
    "pron": "",
    "definition": "Personally identifiable information; data that can identify or be linked to an individual.",
    "example": "“The team used PII while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in safety, security & alignment and modern AI practice.",
    "note": "Safety work balances capability with control, privacy, robustness, and human oversight.",
    "related": [
      "differential privacy",
      "privacy",
      "membership inference"
    ],
    "aliases": [
      "personally identifiable information"
    ],
    "category": "Safety, Security & Alignment"
  },
  {
    "word": "differential privacy",
    "part": "noun",
    "pron": "",
    "definition": "A mathematical privacy framework that limits how much the presence of one person's data can affect released results.",
    "example": "“The team used differential privacy while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in safety, security & alignment and modern AI practice.",
    "note": "Safety work balances capability with control, privacy, robustness, and human oversight.",
    "related": [
      "membership inference",
      "PII",
      "model inversion"
    ],
    "aliases": [
      "dp privacy"
    ],
    "category": "Safety, Security & Alignment"
  },
  {
    "word": "membership inference",
    "part": "noun",
    "pron": "",
    "definition": "An attack that attempts to determine whether a particular example was included in a model's training data.",
    "example": "“The team used membership inference while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in safety, security & alignment and modern AI practice.",
    "note": "Safety work balances capability with control, privacy, robustness, and human oversight.",
    "related": [
      "model inversion",
      "differential privacy",
      "model extraction"
    ],
    "aliases": [],
    "category": "Safety, Security & Alignment"
  },
  {
    "word": "model inversion",
    "part": "noun",
    "pron": "",
    "definition": "An attack that attempts to reconstruct sensitive attributes or training information from model access.",
    "example": "“The team used model inversion while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in safety, security & alignment and modern AI practice.",
    "note": "Safety work balances capability with control, privacy, robustness, and human oversight.",
    "related": [
      "model extraction",
      "membership inference",
      "watermarking"
    ],
    "aliases": [],
    "category": "Safety, Security & Alignment"
  },
  {
    "word": "model extraction",
    "part": "noun",
    "pron": "",
    "definition": "Reconstructing or approximating a model's behavior or parameters through repeated queries or unauthorized copying.",
    "example": "“The team used model extraction while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in safety, security & alignment and modern AI practice.",
    "note": "Safety work balances capability with control, privacy, robustness, and human oversight.",
    "related": [
      "watermarking",
      "model inversion",
      "provenance"
    ],
    "aliases": [
      "model stealing"
    ],
    "category": "Safety, Security & Alignment"
  },
  {
    "word": "watermarking",
    "part": "noun",
    "pron": "",
    "definition": "Embedding a detectable signal into generated content or model outputs to support identification or provenance.",
    "example": "“The team used watermarking while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in safety, security & alignment and modern AI practice.",
    "note": "Safety work balances capability with control, privacy, robustness, and human oversight.",
    "related": [
      "provenance",
      "model extraction",
      "synthetic media"
    ],
    "aliases": [
      "ai watermark"
    ],
    "category": "Safety, Security & Alignment"
  },
  {
    "word": "provenance",
    "part": "noun",
    "pron": "",
    "definition": "Information describing where data or generated content came from and how it was produced.",
    "example": "“The team used provenance while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in safety, security & alignment and modern AI practice.",
    "note": "Safety work balances capability with control, privacy, robustness, and human oversight.",
    "related": [
      "synthetic media",
      "watermarking",
      "deepfake"
    ],
    "aliases": [
      "content provenance"
    ],
    "category": "Safety, Security & Alignment"
  },
  {
    "word": "synthetic media",
    "part": "noun",
    "pron": "",
    "definition": "Media generated or substantially altered by algorithms, including text, images, audio, and video.",
    "example": "“The team used synthetic media while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in safety, security & alignment and modern AI practice.",
    "note": "Safety work balances capability with control, privacy, robustness, and human oversight.",
    "related": [
      "deepfake",
      "provenance",
      "alignment"
    ],
    "aliases": [
      "ai-generated media"
    ],
    "category": "Safety, Security & Alignment"
  },
  {
    "word": "deepfake",
    "part": "noun",
    "pron": "",
    "definition": "Synthetic or manipulated media that realistically depicts a person saying or doing something they did not actually say or do.",
    "example": "“The team used deepfake while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in safety, security & alignment and modern AI practice.",
    "note": "Safety work balances capability with control, privacy, robustness, and human oversight.",
    "related": [
      "alignment",
      "synthetic media",
      "AI safety"
    ],
    "aliases": [],
    "category": "Safety, Security & Alignment"
  },
  {
    "word": "interpretability",
    "part": "noun",
    "pron": "",
    "definition": "Methods for understanding how or why a model produces particular internal representations or outputs.",
    "example": "“The team used interpretability while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in interpretability and modern AI practice.",
    "note": "Interpretability methods provide evidence about model behavior; they are not perfect mind-reading.",
    "related": [
      "explainability",
      "causal tracing",
      "mechanistic interpretability"
    ],
    "aliases": [
      "model interpretability"
    ],
    "category": "Interpretability"
  },
  {
    "word": "explainability",
    "part": "noun",
    "pron": "",
    "definition": "Methods for presenting understandable reasons, evidence, or approximations of why a model made a prediction.",
    "example": "“The team used explainability while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in interpretability and modern AI practice.",
    "note": "Interpretability methods provide evidence about model behavior; they are not perfect mind-reading.",
    "related": [
      "mechanistic interpretability",
      "interpretability",
      "feature attribution"
    ],
    "aliases": [
      "xai"
    ],
    "category": "Interpretability"
  },
  {
    "word": "mechanistic interpretability",
    "part": "noun",
    "pron": "",
    "definition": "Studying model internals by identifying computational mechanisms, features, and circuits that produce behavior.",
    "example": "“The team used mechanistic interpretability while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in interpretability and modern AI practice.",
    "note": "Interpretability methods provide evidence about model behavior; they are not perfect mind-reading.",
    "related": [
      "feature attribution",
      "explainability",
      "saliency map"
    ],
    "aliases": [
      "mech interp"
    ],
    "category": "Interpretability"
  },
  {
    "word": "feature attribution",
    "part": "noun",
    "pron": "",
    "definition": "Estimating how much individual input features contributed to a model output.",
    "example": "“The team used feature attribution while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in interpretability and modern AI practice.",
    "note": "Interpretability methods provide evidence about model behavior; they are not perfect mind-reading.",
    "related": [
      "saliency map",
      "mechanistic interpretability",
      "integrated gradients"
    ],
    "aliases": [
      "attribution"
    ],
    "category": "Interpretability"
  },
  {
    "word": "saliency map",
    "part": "noun",
    "pron": "",
    "definition": "A visual map highlighting input regions estimated to influence a model prediction.",
    "example": "“The team used saliency map while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in interpretability and modern AI practice.",
    "note": "Interpretability methods provide evidence about model behavior; they are not perfect mind-reading.",
    "related": [
      "integrated gradients",
      "feature attribution",
      "SHAP"
    ],
    "aliases": [],
    "category": "Interpretability"
  },
  {
    "word": "integrated gradients",
    "part": "noun",
    "pron": "",
    "definition": "An attribution method that integrates gradients along a path from a baseline input to the actual input.",
    "example": "“The team used integrated gradients while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in interpretability and modern AI practice.",
    "note": "Interpretability methods provide evidence about model behavior; they are not perfect mind-reading.",
    "related": [
      "SHAP",
      "saliency map",
      "LIME"
    ],
    "aliases": [],
    "category": "Interpretability"
  },
  {
    "word": "SHAP",
    "part": "noun",
    "pron": "",
    "definition": "A family of feature-attribution methods based on Shapley values from cooperative game theory.",
    "example": "“The team used SHAP while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in interpretability and modern AI practice.",
    "note": "Interpretability methods provide evidence about model behavior; they are not perfect mind-reading.",
    "related": [
      "LIME",
      "integrated gradients",
      "probing"
    ],
    "aliases": [
      "shap values"
    ],
    "category": "Interpretability"
  },
  {
    "word": "LIME",
    "part": "noun",
    "pron": "",
    "definition": "A local explanation method that approximates a complex model with a simpler interpretable model around one example.",
    "example": "“The team used LIME while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in interpretability and modern AI practice.",
    "note": "Interpretability methods provide evidence about model behavior; they are not perfect mind-reading.",
    "related": [
      "probing",
      "SHAP",
      "linear probe"
    ],
    "aliases": [
      "local interpretable model-agnostic explanations"
    ],
    "category": "Interpretability"
  },
  {
    "word": "probing",
    "part": "noun",
    "pron": "",
    "definition": "Training or applying simple classifiers to internal representations to test what information they encode.",
    "example": "“The team used probing while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in interpretability and modern AI practice.",
    "note": "Interpretability methods provide evidence about model behavior; they are not perfect mind-reading.",
    "related": [
      "linear probe",
      "LIME",
      "activation patching"
    ],
    "aliases": [
      "probe"
    ],
    "category": "Interpretability"
  },
  {
    "word": "linear probe",
    "part": "noun",
    "pron": "",
    "definition": "A linear classifier trained on frozen representations to measure whether a feature is linearly accessible.",
    "example": "“The team used linear probe while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in interpretability and modern AI practice.",
    "note": "Interpretability methods provide evidence about model behavior; they are not perfect mind-reading.",
    "related": [
      "activation patching",
      "probing",
      "activation steering"
    ],
    "aliases": [
      "linear probing"
    ],
    "category": "Interpretability"
  },
  {
    "word": "activation patching",
    "part": "noun",
    "pron": "",
    "definition": "Replacing internal activations from one run with activations from another to test causal influence on model behavior.",
    "example": "“The team used activation patching while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in interpretability and modern AI practice.",
    "note": "Interpretability methods provide evidence about model behavior; they are not perfect mind-reading.",
    "related": [
      "activation steering",
      "linear probe",
      "representation engineering"
    ],
    "aliases": [],
    "category": "Interpretability"
  },
  {
    "word": "activation steering",
    "part": "noun",
    "pron": "",
    "definition": "Changing model behavior by adding or modifying selected internal activation directions.",
    "example": "“The team used activation steering while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in interpretability and modern AI practice.",
    "note": "Interpretability methods provide evidence about model behavior; they are not perfect mind-reading.",
    "related": [
      "representation engineering",
      "activation patching",
      "sparse autoencoder"
    ],
    "aliases": [
      "steering vector"
    ],
    "category": "Interpretability"
  },
  {
    "word": "representation engineering",
    "part": "noun",
    "pron": "",
    "definition": "Deliberately identifying and modifying internal representation directions to influence model behavior.",
    "example": "“The team used representation engineering while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in interpretability and modern AI practice.",
    "note": "Interpretability methods provide evidence about model behavior; they are not perfect mind-reading.",
    "related": [
      "sparse autoencoder",
      "activation steering",
      "feature visualization"
    ],
    "aliases": [
      "repe"
    ],
    "category": "Interpretability"
  },
  {
    "word": "sparse autoencoder",
    "part": "noun",
    "pron": "",
    "definition": "An autoencoder trained with sparsity constraints to discover more interpretable features in model activations.",
    "example": "“The team used sparse autoencoder while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in interpretability and modern AI practice.",
    "note": "Interpretability methods provide evidence about model behavior; they are not perfect mind-reading.",
    "related": [
      "feature visualization",
      "representation engineering",
      "neuron"
    ],
    "aliases": [
      "sae"
    ],
    "category": "Interpretability"
  },
  {
    "word": "feature visualization",
    "part": "noun",
    "pron": "",
    "definition": "Techniques that optimize or inspect inputs to understand what internal units or features respond to.",
    "example": "“The team used feature visualization while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in interpretability and modern AI practice.",
    "note": "Interpretability methods provide evidence about model behavior; they are not perfect mind-reading.",
    "related": [
      "neuron",
      "sparse autoencoder",
      "circuit"
    ],
    "aliases": [],
    "category": "Interpretability"
  },
  {
    "word": "neuron",
    "part": "noun",
    "pron": "",
    "definition": "An individual scalar activation unit in a neural network, though useful concepts may be distributed across many units.",
    "example": "“The team used neuron while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in interpretability and modern AI practice.",
    "note": "Interpretability methods provide evidence about model behavior; they are not perfect mind-reading.",
    "related": [
      "circuit",
      "feature visualization",
      "attention pattern"
    ],
    "aliases": [
      "unit"
    ],
    "category": "Interpretability"
  },
  {
    "word": "circuit",
    "part": "noun",
    "pron": "",
    "definition": "A hypothesized collection of model components whose interactions implement a recognizable computation.",
    "example": "“The team used circuit while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in interpretability and modern AI practice.",
    "note": "Interpretability methods provide evidence about model behavior; they are not perfect mind-reading.",
    "related": [
      "attention pattern",
      "neuron",
      "logit lens"
    ],
    "aliases": [
      "neural circuit"
    ],
    "category": "Interpretability"
  },
  {
    "word": "attention pattern",
    "part": "noun",
    "pron": "",
    "definition": "The distribution of attention weights showing which positions an attention head uses for a particular input.",
    "example": "“The team used attention pattern while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in interpretability and modern AI practice.",
    "note": "Interpretability methods provide evidence about model behavior; they are not perfect mind-reading.",
    "related": [
      "logit lens",
      "circuit",
      "causal tracing"
    ],
    "aliases": [],
    "category": "Interpretability"
  },
  {
    "word": "logit lens",
    "part": "noun",
    "pron": "",
    "definition": "A technique that projects intermediate hidden states through the model's output head to inspect evolving token predictions.",
    "example": "“The team used logit lens while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in interpretability and modern AI practice.",
    "note": "Interpretability methods provide evidence about model behavior; they are not perfect mind-reading.",
    "related": [
      "causal tracing",
      "attention pattern",
      "interpretability"
    ],
    "aliases": [],
    "category": "Interpretability"
  },
  {
    "word": "causal tracing",
    "part": "noun",
    "pron": "",
    "definition": "Testing causal influence by intervening on model internals and measuring how outputs change.",
    "example": "“The team used causal tracing while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in interpretability and modern AI practice.",
    "note": "Interpretability methods provide evidence about model behavior; they are not perfect mind-reading.",
    "related": [
      "interpretability",
      "logit lens",
      "explainability"
    ],
    "aliases": [],
    "category": "Interpretability"
  },
  {
    "word": "computer vision",
    "part": "noun",
    "pron": "",
    "definition": "The field of enabling machines to analyze, understand, or generate visual information.",
    "example": "“The team used computer vision while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in vision, image & video and modern AI practice.",
    "note": "Visual AI spans recognition, understanding, editing, and generation rather than one single capability.",
    "related": [
      "image classification",
      "talking head",
      "object detection"
    ],
    "aliases": [
      "cv",
      "vision"
    ],
    "category": "Vision, Image & Video"
  },
  {
    "word": "image classification",
    "part": "noun",
    "pron": "",
    "definition": "Assigning one or more category labels to an image.",
    "example": "“The team used image classification while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in vision, image & video and modern AI practice.",
    "note": "Visual AI spans recognition, understanding, editing, and generation rather than one single capability.",
    "related": [
      "object detection",
      "computer vision",
      "semantic segmentation"
    ],
    "aliases": [],
    "category": "Vision, Image & Video"
  },
  {
    "word": "object detection",
    "part": "noun",
    "pron": "",
    "definition": "Locating objects in an image and predicting their classes, usually with bounding boxes.",
    "example": "“The team used object detection while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in vision, image & video and modern AI practice.",
    "note": "Visual AI spans recognition, understanding, editing, and generation rather than one single capability.",
    "related": [
      "semantic segmentation",
      "image classification",
      "instance segmentation"
    ],
    "aliases": [],
    "category": "Vision, Image & Video"
  },
  {
    "word": "semantic segmentation",
    "part": "noun",
    "pron": "",
    "definition": "Assigning a semantic class label to every pixel in an image.",
    "example": "“The team used semantic segmentation while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in vision, image & video and modern AI practice.",
    "note": "Visual AI spans recognition, understanding, editing, and generation rather than one single capability.",
    "related": [
      "instance segmentation",
      "object detection",
      "panoptic segmentation"
    ],
    "aliases": [],
    "category": "Vision, Image & Video"
  },
  {
    "word": "instance segmentation",
    "part": "noun",
    "pron": "",
    "definition": "Separating individual object instances while also assigning pixel-level class labels.",
    "example": "“The team used instance segmentation while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in vision, image & video and modern AI practice.",
    "note": "Visual AI spans recognition, understanding, editing, and generation rather than one single capability.",
    "related": [
      "panoptic segmentation",
      "semantic segmentation",
      "image captioning"
    ],
    "aliases": [],
    "category": "Vision, Image & Video"
  },
  {
    "word": "panoptic segmentation",
    "part": "noun",
    "pron": "",
    "definition": "Combining semantic and instance segmentation into one complete scene labeling.",
    "example": "“The team used panoptic segmentation while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in vision, image & video and modern AI practice.",
    "note": "Visual AI spans recognition, understanding, editing, and generation rather than one single capability.",
    "related": [
      "image captioning",
      "instance segmentation",
      "visual question answering"
    ],
    "aliases": [],
    "category": "Vision, Image & Video"
  },
  {
    "word": "image captioning",
    "part": "noun",
    "pron": "",
    "definition": "Generating a natural-language description of an image.",
    "example": "“The team used image captioning while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in vision, image & video and modern AI practice.",
    "note": "Visual AI spans recognition, understanding, editing, and generation rather than one single capability.",
    "related": [
      "visual question answering",
      "panoptic segmentation",
      "optical character recognition"
    ],
    "aliases": [],
    "category": "Vision, Image & Video"
  },
  {
    "word": "visual question answering",
    "part": "noun",
    "pron": "",
    "definition": "Answering natural-language questions about visual content.",
    "example": "“The team used visual question answering while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in vision, image & video and modern AI practice.",
    "note": "Visual AI spans recognition, understanding, editing, and generation rather than one single capability.",
    "related": [
      "optical character recognition",
      "image captioning",
      "pose estimation"
    ],
    "aliases": [
      "vqa"
    ],
    "category": "Vision, Image & Video"
  },
  {
    "word": "optical character recognition",
    "part": "noun",
    "pron": "",
    "definition": "Detecting and transcribing text from images or scanned documents.",
    "example": "“The team used optical character recognition while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in vision, image & video and modern AI practice.",
    "note": "Visual AI spans recognition, understanding, editing, and generation rather than one single capability.",
    "related": [
      "pose estimation",
      "visual question answering",
      "depth estimation"
    ],
    "aliases": [
      "ocr"
    ],
    "category": "Vision, Image & Video"
  },
  {
    "word": "pose estimation",
    "part": "noun",
    "pron": "",
    "definition": "Predicting the positions of body joints, keypoints, or object landmarks in images or video.",
    "example": "“The team used pose estimation while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in vision, image & video and modern AI practice.",
    "note": "Visual AI spans recognition, understanding, editing, and generation rather than one single capability.",
    "related": [
      "depth estimation",
      "optical character recognition",
      "optical flow"
    ],
    "aliases": [],
    "category": "Vision, Image & Video"
  },
  {
    "word": "depth estimation",
    "part": "noun",
    "pron": "",
    "definition": "Predicting distance from the camera for pixels or regions in an image.",
    "example": "“The team used depth estimation while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in vision, image & video and modern AI practice.",
    "note": "Visual AI spans recognition, understanding, editing, and generation rather than one single capability.",
    "related": [
      "optical flow",
      "pose estimation",
      "feature extractor"
    ],
    "aliases": [],
    "category": "Vision, Image & Video"
  },
  {
    "word": "optical flow",
    "part": "noun",
    "pron": "",
    "definition": "Estimating apparent pixel motion between consecutive video frames.",
    "example": "“The team used optical flow while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in vision, image & video and modern AI practice.",
    "note": "Visual AI spans recognition, understanding, editing, and generation rather than one single capability.",
    "related": [
      "feature extractor",
      "depth estimation",
      "CLIP"
    ],
    "aliases": [],
    "category": "Vision, Image & Video"
  },
  {
    "word": "feature extractor",
    "part": "noun",
    "pron": "",
    "definition": "A model component that converts raw input into learned features for later prediction or retrieval.",
    "example": "“The team used feature extractor while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in vision, image & video and modern AI practice.",
    "note": "Visual AI spans recognition, understanding, editing, and generation rather than one single capability.",
    "related": [
      "CLIP",
      "optical flow",
      "contrastive learning"
    ],
    "aliases": [],
    "category": "Vision, Image & Video"
  },
  {
    "word": "CLIP",
    "part": "noun",
    "pron": "",
    "definition": "A contrastive image-text model family that learns a shared representation space for images and text.",
    "example": "“The team used CLIP while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in vision, image & video and modern AI practice.",
    "note": "Visual AI spans recognition, understanding, editing, and generation rather than one single capability.",
    "related": [
      "contrastive learning",
      "feature extractor",
      "image generation"
    ],
    "aliases": [
      "contrastive language-image pretraining"
    ],
    "category": "Vision, Image & Video"
  },
  {
    "word": "contrastive learning",
    "part": "noun",
    "pron": "",
    "definition": "Learning representations by pulling related examples closer and pushing unrelated examples farther apart.",
    "example": "“The team used contrastive learning while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in vision, image & video and modern AI practice.",
    "note": "Visual AI spans recognition, understanding, editing, and generation rather than one single capability.",
    "related": [
      "image generation",
      "CLIP",
      "text-to-image"
    ],
    "aliases": [],
    "category": "Vision, Image & Video"
  },
  {
    "word": "image generation",
    "part": "noun",
    "pron": "",
    "definition": "Producing new images from text, images, masks, layouts, or other conditioning inputs.",
    "example": "“The team used image generation while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in vision, image & video and modern AI practice.",
    "note": "Visual AI spans recognition, understanding, editing, and generation rather than one single capability.",
    "related": [
      "text-to-image",
      "contrastive learning",
      "image-to-image"
    ],
    "aliases": [],
    "category": "Vision, Image & Video"
  },
  {
    "word": "text-to-image",
    "part": "noun",
    "pron": "",
    "definition": "Generating an image conditioned primarily on a natural-language prompt.",
    "example": "“The team used text-to-image while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in vision, image & video and modern AI practice.",
    "note": "Visual AI spans recognition, understanding, editing, and generation rather than one single capability.",
    "related": [
      "image-to-image",
      "image generation",
      "inpainting"
    ],
    "aliases": [
      "t2i"
    ],
    "category": "Vision, Image & Video"
  },
  {
    "word": "image-to-image",
    "part": "noun",
    "pron": "",
    "definition": "Generating or transforming an image using another image as a major conditioning input.",
    "example": "“The team used image-to-image while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in vision, image & video and modern AI practice.",
    "note": "Visual AI spans recognition, understanding, editing, and generation rather than one single capability.",
    "related": [
      "inpainting",
      "text-to-image",
      "outpainting"
    ],
    "aliases": [
      "i2i"
    ],
    "category": "Vision, Image & Video"
  },
  {
    "word": "inpainting",
    "part": "noun",
    "pron": "",
    "definition": "Generating content inside a masked or missing region of an image while preserving surrounding context.",
    "example": "“The team used inpainting while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in vision, image & video and modern AI practice.",
    "note": "Visual AI spans recognition, understanding, editing, and generation rather than one single capability.",
    "related": [
      "outpainting",
      "image-to-image",
      "super-resolution"
    ],
    "aliases": [],
    "category": "Vision, Image & Video"
  },
  {
    "word": "outpainting",
    "part": "noun",
    "pron": "",
    "definition": "Extending an image beyond its original borders by generating new surrounding content.",
    "example": "“The team used outpainting while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in vision, image & video and modern AI practice.",
    "note": "Visual AI spans recognition, understanding, editing, and generation rather than one single capability.",
    "related": [
      "super-resolution",
      "inpainting",
      "upscaling"
    ],
    "aliases": [],
    "category": "Vision, Image & Video"
  },
  {
    "word": "super-resolution",
    "part": "noun",
    "pron": "",
    "definition": "Generating a higher-resolution version of an image while attempting to preserve or plausibly reconstruct detail.",
    "example": "“The team used super-resolution while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in vision, image & video and modern AI practice.",
    "note": "Visual AI spans recognition, understanding, editing, and generation rather than one single capability.",
    "related": [
      "upscaling",
      "outpainting",
      "latent diffusion"
    ],
    "aliases": [
      "sr"
    ],
    "category": "Vision, Image & Video"
  },
  {
    "word": "upscaling",
    "part": "noun",
    "pron": "",
    "definition": "Increasing image resolution, often with learned reconstruction or enhancement methods.",
    "example": "“The team used upscaling while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in vision, image & video and modern AI practice.",
    "note": "Visual AI spans recognition, understanding, editing, and generation rather than one single capability.",
    "related": [
      "latent diffusion",
      "super-resolution",
      "denoising"
    ],
    "aliases": [
      "ai upscaling"
    ],
    "category": "Vision, Image & Video"
  },
  {
    "word": "latent diffusion",
    "part": "noun",
    "pron": "",
    "definition": "A diffusion approach that performs much of the denoising process in a compressed latent space rather than directly in pixel space.",
    "example": "“The team used latent diffusion while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in vision, image & video and modern AI practice.",
    "note": "Visual AI spans recognition, understanding, editing, and generation rather than one single capability.",
    "related": [
      "denoising",
      "upscaling",
      "noise schedule"
    ],
    "aliases": [
      "ldm"
    ],
    "category": "Vision, Image & Video"
  },
  {
    "word": "denoising",
    "part": "noun",
    "pron": "",
    "definition": "Predicting and removing noise from a corrupted signal; a central operation in diffusion generation.",
    "example": "“The team used denoising while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in vision, image & video and modern AI practice.",
    "note": "Visual AI spans recognition, understanding, editing, and generation rather than one single capability.",
    "related": [
      "noise schedule",
      "latent diffusion",
      "sampler"
    ],
    "aliases": [
      "noise prediction"
    ],
    "category": "Vision, Image & Video"
  },
  {
    "word": "noise schedule",
    "part": "noun",
    "pron": "",
    "definition": "The rule controlling how noise levels change across diffusion timesteps.",
    "example": "“The team used noise schedule while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in vision, image & video and modern AI practice.",
    "note": "Visual AI spans recognition, understanding, editing, and generation rather than one single capability.",
    "related": [
      "sampler",
      "denoising",
      "scheduler"
    ],
    "aliases": [],
    "category": "Vision, Image & Video"
  },
  {
    "word": "sampler",
    "part": "noun",
    "pron": "",
    "definition": "The numerical procedure used to move from noise toward a generated sample in a diffusion model.",
    "example": "“The team used sampler while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in vision, image & video and modern AI practice.",
    "note": "Visual AI spans recognition, understanding, editing, and generation rather than one single capability.",
    "related": [
      "scheduler",
      "noise schedule",
      "classifier-free guidance"
    ],
    "aliases": [
      "diffusion sampler"
    ],
    "category": "Vision, Image & Video"
  },
  {
    "word": "scheduler",
    "part": "noun",
    "pron": "",
    "definition": "A component that defines diffusion timesteps and update rules during denoising.",
    "example": "“The team used scheduler while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in vision, image & video and modern AI practice.",
    "note": "Visual AI spans recognition, understanding, editing, and generation rather than one single capability.",
    "related": [
      "classifier-free guidance",
      "sampler",
      "CFG scale"
    ],
    "aliases": [
      "diffusion scheduler"
    ],
    "category": "Vision, Image & Video"
  },
  {
    "word": "classifier-free guidance",
    "part": "noun",
    "pron": "",
    "definition": "A diffusion guidance technique that strengthens conditioning by combining conditional and unconditional predictions.",
    "example": "“The team used classifier-free guidance while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in vision, image & video and modern AI practice.",
    "note": "Visual AI spans recognition, understanding, editing, and generation rather than one single capability.",
    "related": [
      "CFG scale",
      "scheduler",
      "negative prompt"
    ],
    "aliases": [
      "cfg"
    ],
    "category": "Vision, Image & Video"
  },
  {
    "word": "CFG scale",
    "part": "noun",
    "pron": "",
    "definition": "A control specifying the strength of classifier-free guidance during diffusion generation.",
    "example": "“The team used CFG scale while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in vision, image & video and modern AI practice.",
    "note": "Visual AI spans recognition, understanding, editing, and generation rather than one single capability.",
    "related": [
      "negative prompt",
      "classifier-free guidance",
      "seed"
    ],
    "aliases": [
      "guidance scale"
    ],
    "category": "Vision, Image & Video"
  },
  {
    "word": "negative prompt",
    "part": "noun",
    "pron": "",
    "definition": "Text describing concepts a generation system should discourage from appearing in the output.",
    "example": "“The team used negative prompt while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in vision, image & video and modern AI practice.",
    "note": "Visual AI spans recognition, understanding, editing, and generation rather than one single capability.",
    "related": [
      "seed",
      "CFG scale",
      "prompt adherence"
    ],
    "aliases": [],
    "category": "Vision, Image & Video"
  },
  {
    "word": "seed",
    "part": "noun",
    "pron": "",
    "definition": "A number used to initialize pseudorandom generation so a stochastic process can be reproduced more closely.",
    "example": "“The team used seed while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in vision, image & video and modern AI practice.",
    "note": "Visual AI spans recognition, understanding, editing, and generation rather than one single capability.",
    "related": [
      "prompt adherence",
      "negative prompt",
      "ControlNet"
    ],
    "aliases": [
      "random seed"
    ],
    "category": "Vision, Image & Video"
  },
  {
    "word": "prompt adherence",
    "part": "noun",
    "pron": "",
    "definition": "How closely generated media follows the semantic and compositional intent of the prompt.",
    "example": "“The team used prompt adherence while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in vision, image & video and modern AI practice.",
    "note": "Visual AI spans recognition, understanding, editing, and generation rather than one single capability.",
    "related": [
      "ControlNet",
      "seed",
      "image editing model"
    ],
    "aliases": [
      "prompt fidelity"
    ],
    "category": "Vision, Image & Video"
  },
  {
    "word": "ControlNet",
    "part": "noun",
    "pron": "",
    "definition": "A conditioning architecture that guides image generation using structural signals such as edges, depth, pose, or segmentation maps.",
    "example": "“The team used ControlNet while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in vision, image & video and modern AI practice.",
    "note": "Visual AI spans recognition, understanding, editing, and generation rather than one single capability.",
    "related": [
      "image editing model",
      "prompt adherence",
      "video generation"
    ],
    "aliases": [
      "control net"
    ],
    "category": "Vision, Image & Video"
  },
  {
    "word": "image editing model",
    "part": "noun",
    "pron": "",
    "definition": "A generative model specialized for changing existing images from natural-language or structured edit instructions.",
    "example": "“The team used image editing model while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in vision, image & video and modern AI practice.",
    "note": "Visual AI spans recognition, understanding, editing, and generation rather than one single capability.",
    "related": [
      "video generation",
      "ControlNet",
      "text-to-video"
    ],
    "aliases": [],
    "category": "Vision, Image & Video"
  },
  {
    "word": "video generation",
    "part": "noun",
    "pron": "",
    "definition": "Generating video frames, motion, scenes, or edits from text, images, video, or other conditioning.",
    "example": "“The team used video generation while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in vision, image & video and modern AI practice.",
    "note": "Visual AI spans recognition, understanding, editing, and generation rather than one single capability.",
    "related": [
      "text-to-video",
      "image editing model",
      "image-to-video"
    ],
    "aliases": [],
    "category": "Vision, Image & Video"
  },
  {
    "word": "text-to-video",
    "part": "noun",
    "pron": "",
    "definition": "Generating video conditioned primarily on text.",
    "example": "“The team used text-to-video while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in vision, image & video and modern AI practice.",
    "note": "Visual AI spans recognition, understanding, editing, and generation rather than one single capability.",
    "related": [
      "image-to-video",
      "video generation",
      "frame interpolation"
    ],
    "aliases": [
      "t2v"
    ],
    "category": "Vision, Image & Video"
  },
  {
    "word": "image-to-video",
    "part": "noun",
    "pron": "",
    "definition": "Generating motion and subsequent frames from a still image plus optional text guidance.",
    "example": "“The team used image-to-video while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in vision, image & video and modern AI practice.",
    "note": "Visual AI spans recognition, understanding, editing, and generation rather than one single capability.",
    "related": [
      "frame interpolation",
      "text-to-video",
      "lip sync"
    ],
    "aliases": [
      "i2v"
    ],
    "category": "Vision, Image & Video"
  },
  {
    "word": "frame interpolation",
    "part": "noun",
    "pron": "",
    "definition": "Generating intermediate frames between existing video frames to increase frame rate or smooth motion.",
    "example": "“The team used frame interpolation while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in vision, image & video and modern AI practice.",
    "note": "Visual AI spans recognition, understanding, editing, and generation rather than one single capability.",
    "related": [
      "lip sync",
      "image-to-video",
      "talking head"
    ],
    "aliases": [],
    "category": "Vision, Image & Video"
  },
  {
    "word": "lip sync",
    "part": "noun",
    "pron": "",
    "definition": "Aligning generated or edited mouth motion with a speech or audio track.",
    "example": "“The team used lip sync while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in vision, image & video and modern AI practice.",
    "note": "Visual AI spans recognition, understanding, editing, and generation rather than one single capability.",
    "related": [
      "talking head",
      "frame interpolation",
      "computer vision"
    ],
    "aliases": [
      "lip synchronization"
    ],
    "category": "Vision, Image & Video"
  },
  {
    "word": "talking head",
    "part": "noun",
    "pron": "",
    "definition": "A generated or animated face-and-head video driven by audio, text, or another performance.",
    "example": "“The team used talking head while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in vision, image & video and modern AI practice.",
    "note": "Visual AI spans recognition, understanding, editing, and generation rather than one single capability.",
    "related": [
      "computer vision",
      "lip sync",
      "image classification"
    ],
    "aliases": [],
    "category": "Vision, Image & Video"
  },
  {
    "word": "automatic speech recognition",
    "part": "noun",
    "pron": "",
    "definition": "Converting spoken audio into text.",
    "example": "“The team used automatic speech recognition while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in audio & speech and modern AI practice.",
    "note": "Audio AI includes understanding, generation, identity, timing, and acoustic signal processing.",
    "related": [
      "speech-to-text",
      "codec model",
      "audio transcription"
    ],
    "aliases": [
      "asr",
      "speech to text"
    ],
    "category": "Audio & Speech"
  },
  {
    "word": "speech-to-text",
    "part": "noun",
    "pron": "",
    "definition": "Transcribing spoken language into written text.",
    "example": "“The team used speech-to-text while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in audio & speech and modern AI practice.",
    "note": "Audio AI includes understanding, generation, identity, timing, and acoustic signal processing.",
    "related": [
      "audio transcription",
      "automatic speech recognition",
      "text-to-speech"
    ],
    "aliases": [
      "stt"
    ],
    "category": "Audio & Speech"
  },
  {
    "word": "audio transcription",
    "part": "noun",
    "pron": "",
    "definition": "Producing a text transcript from speech or other audio content.",
    "example": "“The team used audio transcription while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in audio & speech and modern AI practice.",
    "note": "Audio AI includes understanding, generation, identity, timing, and acoustic signal processing.",
    "related": [
      "text-to-speech",
      "speech-to-text",
      "speech synthesis"
    ],
    "aliases": [
      "transcription"
    ],
    "category": "Audio & Speech"
  },
  {
    "word": "text-to-speech",
    "part": "noun",
    "pron": "",
    "definition": "Generating spoken audio from written text.",
    "example": "“The team used text-to-speech while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in audio & speech and modern AI practice.",
    "note": "Audio AI includes understanding, generation, identity, timing, and acoustic signal processing.",
    "related": [
      "speech synthesis",
      "audio transcription",
      "voice cloning"
    ],
    "aliases": [
      "tts"
    ],
    "category": "Audio & Speech"
  },
  {
    "word": "speech synthesis",
    "part": "noun",
    "pron": "",
    "definition": "Artificial generation of spoken language.",
    "example": "“The team used speech synthesis while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in audio & speech and modern AI practice.",
    "note": "Audio AI includes understanding, generation, identity, timing, and acoustic signal processing.",
    "related": [
      "voice cloning",
      "text-to-speech",
      "speaker identification"
    ],
    "aliases": [
      "voice synthesis"
    ],
    "category": "Audio & Speech"
  },
  {
    "word": "voice cloning",
    "part": "noun",
    "pron": "",
    "definition": "Generating speech that imitates the vocal characteristics of a specific speaker from reference audio.",
    "example": "“The team used voice cloning while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in audio & speech and modern AI practice.",
    "note": "Audio AI includes understanding, generation, identity, timing, and acoustic signal processing.",
    "related": [
      "speaker identification",
      "speech synthesis",
      "speaker verification"
    ],
    "aliases": [
      "speaker cloning"
    ],
    "category": "Audio & Speech"
  },
  {
    "word": "speaker identification",
    "part": "noun",
    "pron": "",
    "definition": "Determining which known speaker produced a segment of audio.",
    "example": "“The team used speaker identification while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in audio & speech and modern AI practice.",
    "note": "Audio AI includes understanding, generation, identity, timing, and acoustic signal processing.",
    "related": [
      "speaker verification",
      "voice cloning",
      "speaker diarization"
    ],
    "aliases": [],
    "category": "Audio & Speech"
  },
  {
    "word": "speaker verification",
    "part": "noun",
    "pron": "",
    "definition": "Determining whether an audio sample matches a claimed speaker identity.",
    "example": "“The team used speaker verification while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in audio & speech and modern AI practice.",
    "note": "Audio AI includes understanding, generation, identity, timing, and acoustic signal processing.",
    "related": [
      "speaker diarization",
      "speaker identification",
      "voice activity detection"
    ],
    "aliases": [
      "voice verification"
    ],
    "category": "Audio & Speech"
  },
  {
    "word": "speaker diarization",
    "part": "noun",
    "pron": "",
    "definition": "Determining which speaker spoke when in a recording with multiple speakers.",
    "example": "“The team used speaker diarization while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in audio & speech and modern AI practice.",
    "note": "Audio AI includes understanding, generation, identity, timing, and acoustic signal processing.",
    "related": [
      "voice activity detection",
      "speaker verification",
      "speech enhancement"
    ],
    "aliases": [
      "diarization"
    ],
    "category": "Audio & Speech"
  },
  {
    "word": "voice activity detection",
    "part": "noun",
    "pron": "",
    "definition": "Detecting time intervals that contain speech rather than silence or background noise.",
    "example": "“The team used voice activity detection while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in audio & speech and modern AI practice.",
    "note": "Audio AI includes understanding, generation, identity, timing, and acoustic signal processing.",
    "related": [
      "speech enhancement",
      "speaker diarization",
      "noise suppression"
    ],
    "aliases": [
      "vad"
    ],
    "category": "Audio & Speech"
  },
  {
    "word": "speech enhancement",
    "part": "noun",
    "pron": "",
    "definition": "Reducing noise, reverberation, or distortion to make speech clearer.",
    "example": "“The team used speech enhancement while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in audio & speech and modern AI practice.",
    "note": "Audio AI includes understanding, generation, identity, timing, and acoustic signal processing.",
    "related": [
      "noise suppression",
      "voice activity detection",
      "audio generation"
    ],
    "aliases": [],
    "category": "Audio & Speech"
  },
  {
    "word": "noise suppression",
    "part": "noun",
    "pron": "",
    "definition": "Reducing unwanted background audio while preserving desired speech or sound.",
    "example": "“The team used noise suppression while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in audio & speech and modern AI practice.",
    "note": "Audio AI includes understanding, generation, identity, timing, and acoustic signal processing.",
    "related": [
      "audio generation",
      "speech enhancement",
      "text-to-audio"
    ],
    "aliases": [],
    "category": "Audio & Speech"
  },
  {
    "word": "audio generation",
    "part": "noun",
    "pron": "",
    "definition": "Generating music, sound effects, speech, or other audio from text or conditioning signals.",
    "example": "“The team used audio generation while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in audio & speech and modern AI practice.",
    "note": "Audio AI includes understanding, generation, identity, timing, and acoustic signal processing.",
    "related": [
      "text-to-audio",
      "noise suppression",
      "music generation"
    ],
    "aliases": [],
    "category": "Audio & Speech"
  },
  {
    "word": "text-to-audio",
    "part": "noun",
    "pron": "",
    "definition": "Generating general audio content from a text description.",
    "example": "“The team used text-to-audio while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in audio & speech and modern AI practice.",
    "note": "Audio AI includes understanding, generation, identity, timing, and acoustic signal processing.",
    "related": [
      "music generation",
      "audio generation",
      "source separation"
    ],
    "aliases": [
      "t2a"
    ],
    "category": "Audio & Speech"
  },
  {
    "word": "music generation",
    "part": "noun",
    "pron": "",
    "definition": "Generating musical audio, symbolic music, or compositions using AI.",
    "example": "“The team used music generation while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in audio & speech and modern AI practice.",
    "note": "Audio AI includes understanding, generation, identity, timing, and acoustic signal processing.",
    "related": [
      "source separation",
      "text-to-audio",
      "speech translation"
    ],
    "aliases": [],
    "category": "Audio & Speech"
  },
  {
    "word": "source separation",
    "part": "noun",
    "pron": "",
    "definition": "Separating a mixed audio recording into constituent sources such as vocals, drums, or speakers.",
    "example": "“The team used source separation while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in audio & speech and modern AI practice.",
    "note": "Audio AI includes understanding, generation, identity, timing, and acoustic signal processing.",
    "related": [
      "speech translation",
      "music generation",
      "phoneme"
    ],
    "aliases": [
      "audio separation"
    ],
    "category": "Audio & Speech"
  },
  {
    "word": "speech translation",
    "part": "noun",
    "pron": "",
    "definition": "Translating spoken language into text or speech in another language.",
    "example": "“The team used speech translation while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in audio & speech and modern AI practice.",
    "note": "Audio AI includes understanding, generation, identity, timing, and acoustic signal processing.",
    "related": [
      "phoneme",
      "source separation",
      "mel spectrogram"
    ],
    "aliases": [],
    "category": "Audio & Speech"
  },
  {
    "word": "phoneme",
    "part": "noun",
    "pron": "",
    "definition": "A basic unit of sound used to distinguish meaning in spoken language.",
    "example": "“The team used phoneme while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in audio & speech and modern AI practice.",
    "note": "Audio AI includes understanding, generation, identity, timing, and acoustic signal processing.",
    "related": [
      "mel spectrogram",
      "speech translation",
      "codec model"
    ],
    "aliases": [],
    "category": "Audio & Speech"
  },
  {
    "word": "mel spectrogram",
    "part": "noun",
    "pron": "",
    "definition": "A time-frequency audio representation using a perceptual mel frequency scale.",
    "example": "“The team used mel spectrogram while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in audio & speech and modern AI practice.",
    "note": "Audio AI includes understanding, generation, identity, timing, and acoustic signal processing.",
    "related": [
      "codec model",
      "phoneme",
      "automatic speech recognition"
    ],
    "aliases": [
      "mel-spectrum"
    ],
    "category": "Audio & Speech"
  },
  {
    "word": "codec model",
    "part": "noun",
    "pron": "",
    "definition": "A neural model that compresses and reconstructs audio or video into discrete or continuous latent codes.",
    "example": "“The team used codec model while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in audio & speech and modern AI practice.",
    "note": "Audio AI includes understanding, generation, identity, timing, and acoustic signal processing.",
    "related": [
      "automatic speech recognition",
      "mel spectrogram",
      "speech-to-text"
    ],
    "aliases": [
      "neural codec"
    ],
    "category": "Audio & Speech"
  },
  {
    "word": "dataset",
    "part": "noun",
    "pron": "",
    "definition": "A collection of examples used for training, validation, evaluation, retrieval, or analysis.",
    "example": "“The team used dataset while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in data & mlops and modern AI practice.",
    "note": "Data and operations determine whether a model can be trained, deployed, monitored, and improved reliably.",
    "related": [
      "training set",
      "reproducibility",
      "validation set"
    ],
    "aliases": [],
    "category": "Data & MLOps"
  },
  {
    "word": "training set",
    "part": "noun",
    "pron": "",
    "definition": "The portion of a dataset used to fit model parameters.",
    "example": "“The team used training set while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in data & mlops and modern AI practice.",
    "note": "Data and operations determine whether a model can be trained, deployed, monitored, and improved reliably.",
    "related": [
      "validation set",
      "dataset",
      "test set"
    ],
    "aliases": [
      "train set"
    ],
    "category": "Data & MLOps"
  },
  {
    "word": "validation set",
    "part": "noun",
    "pron": "",
    "definition": "Data used during development to tune choices and monitor generalization without fitting final reported test metrics.",
    "example": "“The team used validation set while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in data & mlops and modern AI practice.",
    "note": "Data and operations determine whether a model can be trained, deployed, monitored, and improved reliably.",
    "related": [
      "test set",
      "training set",
      "label"
    ],
    "aliases": [
      "dev set"
    ],
    "category": "Data & MLOps"
  },
  {
    "word": "test set",
    "part": "noun",
    "pron": "",
    "definition": "Data held out for final evaluation of model or system performance.",
    "example": "“The team used test set while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in data & mlops and modern AI practice.",
    "note": "Data and operations determine whether a model can be trained, deployed, monitored, and improved reliably.",
    "related": [
      "label",
      "validation set",
      "annotation"
    ],
    "aliases": [
      "evaluation set"
    ],
    "category": "Data & MLOps"
  },
  {
    "word": "label",
    "part": "noun",
    "pron": "",
    "definition": "A target value, category, annotation, or desired output associated with a training or evaluation example.",
    "example": "“The team used label while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in data & mlops and modern AI practice.",
    "note": "Data and operations determine whether a model can be trained, deployed, monitored, and improved reliably.",
    "related": [
      "annotation",
      "test set",
      "data cleaning"
    ],
    "aliases": [],
    "category": "Data & MLOps"
  },
  {
    "word": "annotation",
    "part": "noun",
    "pron": "",
    "definition": "Human- or machine-produced metadata, labels, spans, rankings, or notes attached to data.",
    "example": "“The team used annotation while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in data & mlops and modern AI practice.",
    "note": "Data and operations determine whether a model can be trained, deployed, monitored, and improved reliably.",
    "related": [
      "data cleaning",
      "label",
      "data preprocessing"
    ],
    "aliases": [],
    "category": "Data & MLOps"
  },
  {
    "word": "data cleaning",
    "part": "noun",
    "pron": "",
    "definition": "Detecting and correcting malformed, duplicated, low-quality, unsafe, or irrelevant data.",
    "example": "“The team used data cleaning while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in data & mlops and modern AI practice.",
    "note": "Data and operations determine whether a model can be trained, deployed, monitored, and improved reliably.",
    "related": [
      "data preprocessing",
      "annotation",
      "data pipeline"
    ],
    "aliases": [],
    "category": "Data & MLOps"
  },
  {
    "word": "data preprocessing",
    "part": "noun",
    "pron": "",
    "definition": "Transforming raw data into a form suitable for training, evaluation, retrieval, or inference.",
    "example": "“The team used data preprocessing while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in data & mlops and modern AI practice.",
    "note": "Data and operations determine whether a model can be trained, deployed, monitored, and improved reliably.",
    "related": [
      "data pipeline",
      "data cleaning",
      "ETL"
    ],
    "aliases": [],
    "category": "Data & MLOps"
  },
  {
    "word": "data pipeline",
    "part": "noun",
    "pron": "",
    "definition": "Automated steps for collecting, transforming, validating, storing, and delivering data.",
    "example": "“The team used data pipeline while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in data & mlops and modern AI practice.",
    "note": "Data and operations determine whether a model can be trained, deployed, monitored, and improved reliably.",
    "related": [
      "ETL",
      "data preprocessing",
      "data deduplication"
    ],
    "aliases": [],
    "category": "Data & MLOps"
  },
  {
    "word": "ETL",
    "part": "noun",
    "pron": "",
    "definition": "Extract, transform, load; a common pattern for moving and preparing data.",
    "example": "“The team used ETL while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in data & mlops and modern AI practice.",
    "note": "Data and operations determine whether a model can be trained, deployed, monitored, and improved reliably.",
    "related": [
      "data deduplication",
      "data pipeline",
      "data filtering"
    ],
    "aliases": [
      "extract transform load"
    ],
    "category": "Data & MLOps"
  },
  {
    "word": "data deduplication",
    "part": "noun",
    "pron": "",
    "definition": "Removing duplicate or near-duplicate examples from a dataset.",
    "example": "“The team used data deduplication while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in data & mlops and modern AI practice.",
    "note": "Data and operations determine whether a model can be trained, deployed, monitored, and improved reliably.",
    "related": [
      "data filtering",
      "ETL",
      "data mixture"
    ],
    "aliases": [
      "deduplication"
    ],
    "category": "Data & MLOps"
  },
  {
    "word": "data filtering",
    "part": "noun",
    "pron": "",
    "definition": "Selecting or excluding examples according to quality, safety, language, domain, or other criteria.",
    "example": "“The team used data filtering while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in data & mlops and modern AI practice.",
    "note": "Data and operations determine whether a model can be trained, deployed, monitored, and improved reliably.",
    "related": [
      "data mixture",
      "data deduplication",
      "data quality"
    ],
    "aliases": [],
    "category": "Data & MLOps"
  },
  {
    "word": "data mixture",
    "part": "noun",
    "pron": "",
    "definition": "The proportions and sources of different datasets combined for training.",
    "example": "“The team used data mixture while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in data & mlops and modern AI practice.",
    "note": "Data and operations determine whether a model can be trained, deployed, monitored, and improved reliably.",
    "related": [
      "data quality",
      "data filtering",
      "data curation"
    ],
    "aliases": [
      "training mixture"
    ],
    "category": "Data & MLOps"
  },
  {
    "word": "data quality",
    "part": "noun",
    "pron": "",
    "definition": "The usefulness, correctness, coverage, cleanliness, and representativeness of data for a target purpose.",
    "example": "“The team used data quality while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in data & mlops and modern AI practice.",
    "note": "Data and operations determine whether a model can be trained, deployed, monitored, and improved reliably.",
    "related": [
      "data curation",
      "data mixture",
      "web-scale data"
    ],
    "aliases": [],
    "category": "Data & MLOps"
  },
  {
    "word": "data curation",
    "part": "noun",
    "pron": "",
    "definition": "Deliberately selecting, organizing, filtering, and documenting data for model development.",
    "example": "“The team used data curation while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in data & mlops and modern AI practice.",
    "note": "Data and operations determine whether a model can be trained, deployed, monitored, and improved reliably.",
    "related": [
      "web-scale data",
      "data quality",
      "synthetic data pipeline"
    ],
    "aliases": [],
    "category": "Data & MLOps"
  },
  {
    "word": "web-scale data",
    "part": "noun",
    "pron": "",
    "definition": "Very large datasets collected from broad internet sources, usually requiring significant filtering and deduplication.",
    "example": "“The team used web-scale data while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in data & mlops and modern AI practice.",
    "note": "Data and operations determine whether a model can be trained, deployed, monitored, and improved reliably.",
    "related": [
      "synthetic data pipeline",
      "data curation",
      "label noise"
    ],
    "aliases": [],
    "category": "Data & MLOps"
  },
  {
    "word": "synthetic data pipeline",
    "part": "noun",
    "pron": "",
    "definition": "A repeatable process for generating, filtering, validating, and using model-produced training data.",
    "example": "“The team used synthetic data pipeline while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in data & mlops and modern AI practice.",
    "note": "Data and operations determine whether a model can be trained, deployed, monitored, and improved reliably.",
    "related": [
      "label noise",
      "web-scale data",
      "class imbalance"
    ],
    "aliases": [],
    "category": "Data & MLOps"
  },
  {
    "word": "label noise",
    "part": "noun",
    "pron": "",
    "definition": "Incorrect, inconsistent, or ambiguous labels in supervised data.",
    "example": "“The team used label noise while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in data & mlops and modern AI practice.",
    "note": "Data and operations determine whether a model can be trained, deployed, monitored, and improved reliably.",
    "related": [
      "class imbalance",
      "synthetic data pipeline",
      "data drift"
    ],
    "aliases": [],
    "category": "Data & MLOps"
  },
  {
    "word": "class imbalance",
    "part": "noun",
    "pron": "",
    "definition": "A dataset condition where some target classes have far more examples than others.",
    "example": "“The team used class imbalance while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in data & mlops and modern AI practice.",
    "note": "Data and operations determine whether a model can be trained, deployed, monitored, and improved reliably.",
    "related": [
      "data drift",
      "label noise",
      "concept drift"
    ],
    "aliases": [],
    "category": "Data & MLOps"
  },
  {
    "word": "data drift",
    "part": "noun",
    "pron": "",
    "definition": "Changes over time in input data distributions seen by a deployed system.",
    "example": "“The team used data drift while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in data & mlops and modern AI practice.",
    "note": "Data and operations determine whether a model can be trained, deployed, monitored, and improved reliably.",
    "related": [
      "concept drift",
      "class imbalance",
      "model drift"
    ],
    "aliases": [
      "feature drift"
    ],
    "category": "Data & MLOps"
  },
  {
    "word": "concept drift",
    "part": "noun",
    "pron": "",
    "definition": "Changes over time in the relationship between inputs and the target outcome.",
    "example": "“The team used concept drift while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in data & mlops and modern AI practice.",
    "note": "Data and operations determine whether a model can be trained, deployed, monitored, and improved reliably.",
    "related": [
      "model drift",
      "data drift",
      "MLOps"
    ],
    "aliases": [
      "target drift"
    ],
    "category": "Data & MLOps"
  },
  {
    "word": "model drift",
    "part": "noun",
    "pron": "",
    "definition": "A broad operational term for degradation in deployed model behavior as data, users, or environments change.",
    "example": "“The team used model drift while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in data & mlops and modern AI practice.",
    "note": "Data and operations determine whether a model can be trained, deployed, monitored, and improved reliably.",
    "related": [
      "MLOps",
      "concept drift",
      "LLMOps"
    ],
    "aliases": [],
    "category": "Data & MLOps"
  },
  {
    "word": "MLOps",
    "part": "noun",
    "pron": "",
    "definition": "Practices and infrastructure for reliably training, deploying, monitoring, versioning, and operating machine-learning systems.",
    "example": "“The team used MLOps while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in data & mlops and modern AI practice.",
    "note": "Data and operations determine whether a model can be trained, deployed, monitored, and improved reliably.",
    "related": [
      "LLMOps",
      "model drift",
      "model registry"
    ],
    "aliases": [
      "machine learning operations"
    ],
    "category": "Data & MLOps"
  },
  {
    "word": "LLMOps",
    "part": "noun",
    "pron": "",
    "definition": "Operational practices specialized for building, evaluating, deploying, and monitoring language-model applications.",
    "example": "“The team used LLMOps while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in data & mlops and modern AI practice.",
    "note": "Data and operations determine whether a model can be trained, deployed, monitored, and improved reliably.",
    "related": [
      "model registry",
      "MLOps",
      "experiment tracking"
    ],
    "aliases": [
      "large language model operations"
    ],
    "category": "Data & MLOps"
  },
  {
    "word": "model registry",
    "part": "noun",
    "pron": "",
    "definition": "A system for tracking model versions, metadata, evaluation results, and deployment status.",
    "example": "“The team used model registry while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in data & mlops and modern AI practice.",
    "note": "Data and operations determine whether a model can be trained, deployed, monitored, and improved reliably.",
    "related": [
      "experiment tracking",
      "LLMOps",
      "model monitoring"
    ],
    "aliases": [],
    "category": "Data & MLOps"
  },
  {
    "word": "experiment tracking",
    "part": "noun",
    "pron": "",
    "definition": "Recording training runs, configurations, metrics, artifacts, and code versions so experiments can be compared and reproduced.",
    "example": "“The team used experiment tracking while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in data & mlops and modern AI practice.",
    "note": "Data and operations determine whether a model can be trained, deployed, monitored, and improved reliably.",
    "related": [
      "model monitoring",
      "model registry",
      "feature store"
    ],
    "aliases": [],
    "category": "Data & MLOps"
  },
  {
    "word": "model monitoring",
    "part": "noun",
    "pron": "",
    "definition": "Observing deployed model quality, latency, errors, drift, safety signals, and resource usage.",
    "example": "“The team used model monitoring while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in data & mlops and modern AI practice.",
    "note": "Data and operations determine whether a model can be trained, deployed, monitored, and improved reliably.",
    "related": [
      "feature store",
      "experiment tracking",
      "feature engineering"
    ],
    "aliases": [],
    "category": "Data & MLOps"
  },
  {
    "word": "feature store",
    "part": "noun",
    "pron": "",
    "definition": "A system for managing and serving reusable machine-learning features consistently across training and inference.",
    "example": "“The team used feature store while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in data & mlops and modern AI practice.",
    "note": "Data and operations determine whether a model can be trained, deployed, monitored, and improved reliably.",
    "related": [
      "feature engineering",
      "model monitoring",
      "data lineage"
    ],
    "aliases": [],
    "category": "Data & MLOps"
  },
  {
    "word": "feature engineering",
    "part": "noun",
    "pron": "",
    "definition": "Designing input variables or transformations that make useful task information easier for a model to learn.",
    "example": "“The team used feature engineering while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in data & mlops and modern AI practice.",
    "note": "Data and operations determine whether a model can be trained, deployed, monitored, and improved reliably.",
    "related": [
      "data lineage",
      "feature store",
      "reproducibility"
    ],
    "aliases": [],
    "category": "Data & MLOps"
  },
  {
    "word": "data lineage",
    "part": "noun",
    "pron": "",
    "definition": "Records describing where data originated, how it was transformed, and where it was used.",
    "example": "“The team used data lineage while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in data & mlops and modern AI practice.",
    "note": "Data and operations determine whether a model can be trained, deployed, monitored, and improved reliably.",
    "related": [
      "reproducibility",
      "feature engineering",
      "dataset"
    ],
    "aliases": [
      "lineage"
    ],
    "category": "Data & MLOps"
  },
  {
    "word": "reproducibility",
    "part": "noun",
    "pron": "",
    "definition": "The ability to recreate an experiment or result from recorded data, code, configuration, seeds, and environment.",
    "example": "“The team used reproducibility while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in data & mlops and modern AI practice.",
    "note": "Data and operations determine whether a model can be trained, deployed, monitored, and improved reliably.",
    "related": [
      "dataset",
      "data lineage",
      "training set"
    ],
    "aliases": [],
    "category": "Data & MLOps"
  },
  {
    "word": "GPU",
    "part": "noun",
    "pron": "",
    "definition": "Graphics processing unit; massively parallel hardware widely used for training and running neural networks.",
    "example": "“The team used GPU while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in hardware & systems and modern AI practice.",
    "note": "Systems terms describe the compute and memory machinery that makes modern AI practical.",
    "related": [
      "TPU",
      "energy efficiency",
      "NPU"
    ],
    "aliases": [
      "graphics processing unit"
    ],
    "category": "Hardware & Systems"
  },
  {
    "word": "TPU",
    "part": "noun",
    "pron": "",
    "definition": "Tensor processing unit; specialized accelerator hardware designed for tensor-heavy machine-learning workloads.",
    "example": "“The team used TPU while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in hardware & systems and modern AI practice.",
    "note": "Systems terms describe the compute and memory machinery that makes modern AI practical.",
    "related": [
      "NPU",
      "GPU",
      "accelerator"
    ],
    "aliases": [
      "tensor processing unit"
    ],
    "category": "Hardware & Systems"
  },
  {
    "word": "NPU",
    "part": "noun",
    "pron": "",
    "definition": "Neural processing unit; specialized hardware for accelerating neural-network operations, often on edge devices.",
    "example": "“The team used NPU while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in hardware & systems and modern AI practice.",
    "note": "Systems terms describe the compute and memory machinery that makes modern AI practical.",
    "related": [
      "accelerator",
      "TPU",
      "HBM"
    ],
    "aliases": [
      "neural processing unit"
    ],
    "category": "Hardware & Systems"
  },
  {
    "word": "accelerator",
    "part": "noun",
    "pron": "",
    "definition": "Specialized hardware optimized for high-throughput numeric workloads such as neural-network training or inference.",
    "example": "“The team used accelerator while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in hardware & systems and modern AI practice.",
    "note": "Systems terms describe the compute and memory machinery that makes modern AI practical.",
    "related": [
      "HBM",
      "NPU",
      "VRAM"
    ],
    "aliases": [
      "ai accelerator"
    ],
    "category": "Hardware & Systems"
  },
  {
    "word": "HBM",
    "part": "noun",
    "pron": "",
    "definition": "High-bandwidth memory; fast stacked memory used by modern AI accelerators.",
    "example": "“The team used HBM while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in hardware & systems and modern AI practice.",
    "note": "Systems terms describe the compute and memory machinery that makes modern AI practical.",
    "related": [
      "VRAM",
      "accelerator",
      "memory bandwidth"
    ],
    "aliases": [
      "high bandwidth memory"
    ],
    "category": "Hardware & Systems"
  },
  {
    "word": "VRAM",
    "part": "noun",
    "pron": "",
    "definition": "Memory directly accessible to a graphics processor for weights, activations, and other computation.",
    "example": "“The team used VRAM while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in hardware & systems and modern AI practice.",
    "note": "Systems terms describe the compute and memory machinery that makes modern AI practical.",
    "related": [
      "memory bandwidth",
      "HBM",
      "compute"
    ],
    "aliases": [
      "video memory"
    ],
    "category": "Hardware & Systems"
  },
  {
    "word": "memory bandwidth",
    "part": "noun",
    "pron": "",
    "definition": "The rate at which data can move between memory and compute units, often a major AI performance bottleneck.",
    "example": "“The team used memory bandwidth while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in hardware & systems and modern AI practice.",
    "note": "Systems terms describe the compute and memory machinery that makes modern AI practical.",
    "related": [
      "compute",
      "VRAM",
      "FLOP"
    ],
    "aliases": [],
    "category": "Hardware & Systems"
  },
  {
    "word": "compute",
    "part": "noun",
    "pron": "",
    "definition": "The processing resources required to train or run a model, usually expressed through operations, accelerator time, or cost.",
    "example": "“The team used compute while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in hardware & systems and modern AI practice.",
    "note": "Systems terms describe the compute and memory machinery that makes modern AI practical.",
    "related": [
      "FLOP",
      "memory bandwidth",
      "FLOPs"
    ],
    "aliases": [],
    "category": "Hardware & Systems"
  },
  {
    "word": "FLOP",
    "part": "noun",
    "pron": "",
    "definition": "A floating-point operation; a basic unit used when estimating numerical compute.",
    "example": "“The team used FLOP while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in hardware & systems and modern AI practice.",
    "note": "Systems terms describe the compute and memory machinery that makes modern AI practical.",
    "related": [
      "FLOPs",
      "compute",
      "training compute"
    ],
    "aliases": [
      "floating point operation"
    ],
    "category": "Hardware & Systems"
  },
  {
    "word": "FLOPs",
    "part": "noun",
    "pron": "",
    "definition": "Floating-point operations per second; a measure of peak or achieved computational throughput.",
    "example": "“The team used FLOPs while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in hardware & systems and modern AI practice.",
    "note": "Systems terms describe the compute and memory machinery that makes modern AI practical.",
    "related": [
      "training compute",
      "FLOP",
      "inference compute"
    ],
    "aliases": [],
    "category": "Hardware & Systems"
  },
  {
    "word": "training compute",
    "part": "noun",
    "pron": "",
    "definition": "The total computational work consumed while fitting model parameters.",
    "example": "“The team used training compute while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in hardware & systems and modern AI practice.",
    "note": "Systems terms describe the compute and memory machinery that makes modern AI practical.",
    "related": [
      "inference compute",
      "FLOPs",
      "test-time compute"
    ],
    "aliases": [],
    "category": "Hardware & Systems"
  },
  {
    "word": "inference compute",
    "part": "noun",
    "pron": "",
    "definition": "The computational work spent while generating predictions or outputs from a trained model.",
    "example": "“The team used inference compute while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in hardware & systems and modern AI practice.",
    "note": "Systems terms describe the compute and memory machinery that makes modern AI practical.",
    "related": [
      "test-time compute",
      "training compute",
      "cluster"
    ],
    "aliases": [
      "test time compute"
    ],
    "category": "Hardware & Systems"
  },
  {
    "word": "test-time compute",
    "part": "noun",
    "pron": "",
    "definition": "Extra computation spent during inference to improve an answer through longer reasoning, sampling, search, or verification.",
    "example": "“The team used test-time compute while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in hardware & systems and modern AI practice.",
    "note": "Systems terms describe the compute and memory machinery that makes modern AI practical.",
    "related": [
      "cluster",
      "inference compute",
      "node"
    ],
    "aliases": [
      "inference-time compute"
    ],
    "category": "Hardware & Systems"
  },
  {
    "word": "cluster",
    "part": "noun",
    "pron": "",
    "definition": "A group of connected computers or accelerators used together for training, serving, or data processing.",
    "example": "“The team used cluster while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in hardware & systems and modern AI practice.",
    "note": "Systems terms describe the compute and memory machinery that makes modern AI practical.",
    "related": [
      "node",
      "test-time compute",
      "worker"
    ],
    "aliases": [],
    "category": "Hardware & Systems"
  },
  {
    "word": "node",
    "part": "noun",
    "pron": "",
    "definition": "One machine or server inside a distributed compute cluster.",
    "example": "“The team used node while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in hardware & systems and modern AI practice.",
    "note": "Systems terms describe the compute and memory machinery that makes modern AI practical.",
    "related": [
      "worker",
      "cluster",
      "interconnect"
    ],
    "aliases": [
      "worker node"
    ],
    "category": "Hardware & Systems"
  },
  {
    "word": "worker",
    "part": "noun",
    "pron": "",
    "definition": "A process or machine participating in distributed training, data processing, or inference.",
    "example": "“The team used worker while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in hardware & systems and modern AI practice.",
    "note": "Systems terms describe the compute and memory machinery that makes modern AI practical.",
    "related": [
      "interconnect",
      "node",
      "all-reduce"
    ],
    "aliases": [],
    "category": "Hardware & Systems"
  },
  {
    "word": "interconnect",
    "part": "noun",
    "pron": "",
    "definition": "High-speed networking used to move data between accelerators or machines in a distributed system.",
    "example": "“The team used interconnect while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in hardware & systems and modern AI practice.",
    "note": "Systems terms describe the compute and memory machinery that makes modern AI practical.",
    "related": [
      "all-reduce",
      "worker",
      "collective communication"
    ],
    "aliases": [],
    "category": "Hardware & Systems"
  },
  {
    "word": "all-reduce",
    "part": "noun",
    "pron": "",
    "definition": "A distributed communication operation that aggregates values such as gradients across workers and returns the result to each participant.",
    "example": "“The team used all-reduce while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in hardware & systems and modern AI practice.",
    "note": "Systems terms describe the compute and memory machinery that makes modern AI practical.",
    "related": [
      "collective communication",
      "interconnect",
      "all-gather"
    ],
    "aliases": [],
    "category": "Hardware & Systems"
  },
  {
    "word": "collective communication",
    "part": "noun",
    "pron": "",
    "definition": "Coordinated data movement operations such as all-reduce, all-gather, and reduce-scatter across distributed workers.",
    "example": "“The team used collective communication while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in hardware & systems and modern AI practice.",
    "note": "Systems terms describe the compute and memory machinery that makes modern AI practical.",
    "related": [
      "all-gather",
      "all-reduce",
      "reduce-scatter"
    ],
    "aliases": [],
    "category": "Hardware & Systems"
  },
  {
    "word": "all-gather",
    "part": "noun",
    "pron": "",
    "definition": "A distributed operation in which each worker receives the pieces held by all other workers.",
    "example": "“The team used all-gather while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in hardware & systems and modern AI practice.",
    "note": "Systems terms describe the compute and memory machinery that makes modern AI practical.",
    "related": [
      "reduce-scatter",
      "collective communication",
      "compute-bound"
    ],
    "aliases": [],
    "category": "Hardware & Systems"
  },
  {
    "word": "reduce-scatter",
    "part": "noun",
    "pron": "",
    "definition": "A distributed operation that aggregates values across workers and distributes different parts of the result back to them.",
    "example": "“The team used reduce-scatter while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in hardware & systems and modern AI practice.",
    "note": "Systems terms describe the compute and memory machinery that makes modern AI practical.",
    "related": [
      "compute-bound",
      "all-gather",
      "memory-bound"
    ],
    "aliases": [],
    "category": "Hardware & Systems"
  },
  {
    "word": "compute-bound",
    "part": "noun",
    "pron": "",
    "definition": "Describing a workload limited mainly by arithmetic throughput rather than data movement.",
    "example": "“The team used compute-bound while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in hardware & systems and modern AI practice.",
    "note": "Systems terms describe the compute and memory machinery that makes modern AI practical.",
    "related": [
      "memory-bound",
      "reduce-scatter",
      "OOM"
    ],
    "aliases": [
      "compute limited"
    ],
    "category": "Hardware & Systems"
  },
  {
    "word": "memory-bound",
    "part": "noun",
    "pron": "",
    "definition": "Describing a workload limited mainly by memory capacity or bandwidth rather than arithmetic throughput.",
    "example": "“The team used memory-bound while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in hardware & systems and modern AI practice.",
    "note": "Systems terms describe the compute and memory machinery that makes modern AI practical.",
    "related": [
      "OOM",
      "compute-bound",
      "model footprint"
    ],
    "aliases": [
      "memory limited"
    ],
    "category": "Hardware & Systems"
  },
  {
    "word": "OOM",
    "part": "noun",
    "pron": "",
    "definition": "Out of memory; a failure caused when a model or workload requires more memory than is available.",
    "example": "“The team used OOM while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in hardware & systems and modern AI practice.",
    "note": "Systems terms describe the compute and memory machinery that makes modern AI practical.",
    "related": [
      "model footprint",
      "memory-bound",
      "edge AI"
    ],
    "aliases": [
      "out of memory"
    ],
    "category": "Hardware & Systems"
  },
  {
    "word": "model footprint",
    "part": "noun",
    "pron": "",
    "definition": "The memory and storage required by model weights plus runtime state such as activations and caches.",
    "example": "“The team used model footprint while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in hardware & systems and modern AI practice.",
    "note": "Systems terms describe the compute and memory machinery that makes modern AI practical.",
    "related": [
      "edge AI",
      "OOM",
      "on-device AI"
    ],
    "aliases": [],
    "category": "Hardware & Systems"
  },
  {
    "word": "edge AI",
    "part": "noun",
    "pron": "",
    "definition": "Running AI models on local devices near where data is produced rather than relying entirely on remote cloud servers.",
    "example": "“The team used edge AI while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in hardware & systems and modern AI practice.",
    "note": "Systems terms describe the compute and memory machinery that makes modern AI practical.",
    "related": [
      "on-device AI",
      "model footprint",
      "local model"
    ],
    "aliases": [
      "edge inference"
    ],
    "category": "Hardware & Systems"
  },
  {
    "word": "on-device AI",
    "part": "noun",
    "pron": "",
    "definition": "AI inference performed directly on a user's phone, laptop, wearable, vehicle, or other device.",
    "example": "“The team used on-device AI while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in hardware & systems and modern AI practice.",
    "note": "Systems terms describe the compute and memory machinery that makes modern AI practical.",
    "related": [
      "local model",
      "edge AI",
      "datacenter"
    ],
    "aliases": [
      "local inference"
    ],
    "category": "Hardware & Systems"
  },
  {
    "word": "local model",
    "part": "noun",
    "pron": "",
    "definition": "A model run on hardware controlled by the user or organization rather than through a remote hosted API.",
    "example": "“The team used local model while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in hardware & systems and modern AI practice.",
    "note": "Systems terms describe the compute and memory machinery that makes modern AI practical.",
    "related": [
      "datacenter",
      "on-device AI",
      "energy efficiency"
    ],
    "aliases": [
      "local ai"
    ],
    "category": "Hardware & Systems"
  },
  {
    "word": "datacenter",
    "part": "noun",
    "pron": "",
    "definition": "A facility containing servers, networking, power, and cooling infrastructure used to run large-scale compute.",
    "example": "“The team used datacenter while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in hardware & systems and modern AI practice.",
    "note": "Systems terms describe the compute and memory machinery that makes modern AI practical.",
    "related": [
      "energy efficiency",
      "local model",
      "GPU"
    ],
    "aliases": [
      "data center"
    ],
    "category": "Hardware & Systems"
  },
  {
    "word": "energy efficiency",
    "part": "noun",
    "pron": "",
    "definition": "The amount of useful model training or inference achieved per unit of electrical energy.",
    "example": "“The team used energy efficiency while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in hardware & systems and modern AI practice.",
    "note": "Systems terms describe the compute and memory machinery that makes modern AI practical.",
    "related": [
      "GPU",
      "datacenter",
      "TPU"
    ],
    "aliases": [],
    "category": "Hardware & Systems"
  },
  {
    "word": "reinforcement learning",
    "part": "noun",
    "pron": "",
    "definition": "Learning behavior through interaction with an environment using rewards or returns as feedback.",
    "example": "“The team used reinforcement learning while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in reinforcement learning & classical ml and modern AI practice.",
    "note": "These concepts predate the current generative-AI wave and still underpin much of modern AI.",
    "related": [
      "agent-environment loop",
      "boosting",
      "state"
    ],
    "aliases": [
      "rl"
    ],
    "category": "Reinforcement Learning & Classical ML"
  },
  {
    "word": "agent-environment loop",
    "part": "noun",
    "pron": "",
    "definition": "The reinforcement-learning cycle in which an agent observes state, takes an action, receives a reward, and moves to a new state.",
    "example": "“The team used agent-environment loop while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in reinforcement learning & classical ml and modern AI practice.",
    "note": "These concepts predate the current generative-AI wave and still underpin much of modern AI.",
    "related": [
      "state",
      "reinforcement learning",
      "action"
    ],
    "aliases": [
      "rl loop"
    ],
    "category": "Reinforcement Learning & Classical ML"
  },
  {
    "word": "action",
    "part": "noun",
    "pron": "",
    "definition": "A choice available to an agent that can affect the environment or subsequent state.",
    "example": "“The team used action while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in reinforcement learning & classical ml and modern AI practice.",
    "note": "These concepts predate the current generative-AI wave and still underpin much of modern AI.",
    "related": [
      "reward",
      "state",
      "return"
    ],
    "aliases": [],
    "category": "Reinforcement Learning & Classical ML"
  },
  {
    "word": "reward",
    "part": "noun",
    "pron": "",
    "definition": "A scalar feedback signal indicating how desirable an outcome or transition is under the training objective.",
    "example": "“The team used reward while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in reinforcement learning & classical ml and modern AI practice.",
    "note": "These concepts predate the current generative-AI wave and still underpin much of modern AI.",
    "related": [
      "return",
      "action",
      "policy"
    ],
    "aliases": [],
    "category": "Reinforcement Learning & Classical ML"
  },
  {
    "word": "return",
    "part": "noun",
    "pron": "",
    "definition": "The accumulated discounted reward used to evaluate a trajectory or policy.",
    "example": "“The team used return while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in reinforcement learning & classical ml and modern AI practice.",
    "note": "These concepts predate the current generative-AI wave and still underpin much of modern AI.",
    "related": [
      "policy",
      "reward",
      "value function"
    ],
    "aliases": [],
    "category": "Reinforcement Learning & Classical ML"
  },
  {
    "word": "value function",
    "part": "noun",
    "pron": "",
    "definition": "A function estimating expected future return from a state or state-action pair.",
    "example": "“The team used value function while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in reinforcement learning & classical ml and modern AI practice.",
    "note": "These concepts predate the current generative-AI wave and still underpin much of modern AI.",
    "related": [
      "Q-function",
      "policy",
      "actor-critic"
    ],
    "aliases": [
      "value model"
    ],
    "category": "Reinforcement Learning & Classical ML"
  },
  {
    "word": "Q-function",
    "part": "noun",
    "pron": "",
    "definition": "A function estimating expected return for taking an action in a state and then following a policy.",
    "example": "“The team used Q-function while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in reinforcement learning & classical ml and modern AI practice.",
    "note": "These concepts predate the current generative-AI wave and still underpin much of modern AI.",
    "related": [
      "actor-critic",
      "value function",
      "exploration"
    ],
    "aliases": [
      "q value"
    ],
    "category": "Reinforcement Learning & Classical ML"
  },
  {
    "word": "actor-critic",
    "part": "noun",
    "pron": "",
    "definition": "A reinforcement-learning architecture combining a policy model called the actor with a value estimator called the critic.",
    "example": "“The team used actor-critic while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in reinforcement learning & classical ml and modern AI practice.",
    "note": "These concepts predate the current generative-AI wave and still underpin much of modern AI.",
    "related": [
      "exploration",
      "Q-function",
      "exploitation"
    ],
    "aliases": [],
    "category": "Reinforcement Learning & Classical ML"
  },
  {
    "word": "exploration",
    "part": "noun",
    "pron": "",
    "definition": "Trying actions that may reveal new information or higher rewards rather than always choosing the current best-known action.",
    "example": "“The team used exploration while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in reinforcement learning & classical ml and modern AI practice.",
    "note": "These concepts predate the current generative-AI wave and still underpin much of modern AI.",
    "related": [
      "exploitation",
      "actor-critic",
      "Markov decision process"
    ],
    "aliases": [],
    "category": "Reinforcement Learning & Classical ML"
  },
  {
    "word": "exploitation",
    "part": "noun",
    "pron": "",
    "definition": "Choosing actions currently believed to produce high reward based on learned knowledge.",
    "example": "“The team used exploitation while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in reinforcement learning & classical ml and modern AI practice.",
    "note": "These concepts predate the current generative-AI wave and still underpin much of modern AI.",
    "related": [
      "Markov decision process",
      "exploration",
      "bandit"
    ],
    "aliases": [],
    "category": "Reinforcement Learning & Classical ML"
  },
  {
    "word": "Markov decision process",
    "part": "noun",
    "pron": "",
    "definition": "A formal model of sequential decision-making with states, actions, transition probabilities, and rewards.",
    "example": "“The team used Markov decision process while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in reinforcement learning & classical ml and modern AI practice.",
    "note": "These concepts predate the current generative-AI wave and still underpin much of modern AI.",
    "related": [
      "bandit",
      "exploitation",
      "Q-learning"
    ],
    "aliases": [
      "mdp"
    ],
    "category": "Reinforcement Learning & Classical ML"
  },
  {
    "word": "bandit",
    "part": "noun",
    "pron": "",
    "definition": "A simplified decision problem where actions produce rewards without a rich evolving state.",
    "example": "“The team used bandit while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in reinforcement learning & classical ml and modern AI practice.",
    "note": "These concepts predate the current generative-AI wave and still underpin much of modern AI.",
    "related": [
      "Q-learning",
      "Markov decision process",
      "temporal-difference learning"
    ],
    "aliases": [
      "multi-armed bandit"
    ],
    "category": "Reinforcement Learning & Classical ML"
  },
  {
    "word": "Q-learning",
    "part": "noun",
    "pron": "",
    "definition": "An off-policy reinforcement-learning algorithm that learns action values and derives a policy from them.",
    "example": "“The team used Q-learning while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in reinforcement learning & classical ml and modern AI practice.",
    "note": "These concepts predate the current generative-AI wave and still underpin much of modern AI.",
    "related": [
      "temporal-difference learning",
      "bandit",
      "Monte Carlo method"
    ],
    "aliases": [],
    "category": "Reinforcement Learning & Classical ML"
  },
  {
    "word": "temporal-difference learning",
    "part": "noun",
    "pron": "",
    "definition": "Learning value estimates from the difference between successive predictions without waiting for final outcomes.",
    "example": "“The team used temporal-difference learning while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in reinforcement learning & classical ml and modern AI practice.",
    "note": "These concepts predate the current generative-AI wave and still underpin much of modern AI.",
    "related": [
      "Monte Carlo method",
      "Q-learning",
      "classification"
    ],
    "aliases": [
      "td learning"
    ],
    "category": "Reinforcement Learning & Classical ML"
  },
  {
    "word": "Monte Carlo method",
    "part": "noun",
    "pron": "",
    "definition": "Estimating values or outcomes by averaging samples from repeated random simulation or trajectories.",
    "example": "“The team used Monte Carlo method while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in reinforcement learning & classical ml and modern AI practice.",
    "note": "These concepts predate the current generative-AI wave and still underpin much of modern AI.",
    "related": [
      "classification",
      "temporal-difference learning",
      "regression task"
    ],
    "aliases": [],
    "category": "Reinforcement Learning & Classical ML"
  },
  {
    "word": "classification",
    "part": "noun",
    "pron": "",
    "definition": "Predicting a discrete category or label from input features.",
    "example": "“The team used classification while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in reinforcement learning & classical ml and modern AI practice.",
    "note": "These concepts predate the current generative-AI wave and still underpin much of modern AI.",
    "related": [
      "regression task",
      "Monte Carlo method",
      "clustering"
    ],
    "aliases": [],
    "category": "Reinforcement Learning & Classical ML"
  },
  {
    "word": "regression task",
    "part": "noun",
    "pron": "",
    "definition": "Predicting a continuous numeric value from input features.",
    "example": "“The team used regression task while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in reinforcement learning & classical ml and modern AI practice.",
    "note": "These concepts predate the current generative-AI wave and still underpin much of modern AI.",
    "related": [
      "clustering",
      "classification",
      "k-means"
    ],
    "aliases": [
      "regression"
    ],
    "category": "Reinforcement Learning & Classical ML"
  },
  {
    "word": "clustering",
    "part": "noun",
    "pron": "",
    "definition": "Grouping examples so items in the same group are more similar under a chosen representation or distance.",
    "example": "“The team used clustering while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in reinforcement learning & classical ml and modern AI practice.",
    "note": "These concepts predate the current generative-AI wave and still underpin much of modern AI.",
    "related": [
      "k-means",
      "regression task",
      "decision tree"
    ],
    "aliases": [],
    "category": "Reinforcement Learning & Classical ML"
  },
  {
    "word": "k-means",
    "part": "noun",
    "pron": "",
    "definition": "A clustering algorithm that iteratively assigns points to nearest centroids and updates those centroids.",
    "example": "“The team used k-means while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in reinforcement learning & classical ml and modern AI practice.",
    "note": "These concepts predate the current generative-AI wave and still underpin much of modern AI.",
    "related": [
      "decision tree",
      "clustering",
      "random forest"
    ],
    "aliases": [],
    "category": "Reinforcement Learning & Classical ML"
  },
  {
    "word": "decision tree",
    "part": "noun",
    "pron": "",
    "definition": "A predictive model that recursively splits examples according to feature-based decision rules.",
    "example": "“The team used decision tree while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in reinforcement learning & classical ml and modern AI practice.",
    "note": "These concepts predate the current generative-AI wave and still underpin much of modern AI.",
    "related": [
      "random forest",
      "k-means",
      "gradient boosting"
    ],
    "aliases": [],
    "category": "Reinforcement Learning & Classical ML"
  },
  {
    "word": "random forest",
    "part": "noun",
    "pron": "",
    "definition": "An ensemble of decision trees whose predictions are combined for stronger generalization.",
    "example": "“The team used random forest while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in reinforcement learning & classical ml and modern AI practice.",
    "note": "These concepts predate the current generative-AI wave and still underpin much of modern AI.",
    "related": [
      "gradient boosting",
      "decision tree",
      "support vector machine"
    ],
    "aliases": [],
    "category": "Reinforcement Learning & Classical ML"
  },
  {
    "word": "gradient boosting",
    "part": "noun",
    "pron": "",
    "definition": "An ensemble method that sequentially adds weak learners to correct prior prediction errors.",
    "example": "“The team used gradient boosting while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in reinforcement learning & classical ml and modern AI practice.",
    "note": "These concepts predate the current generative-AI wave and still underpin much of modern AI.",
    "related": [
      "support vector machine",
      "random forest",
      "k-nearest neighbors"
    ],
    "aliases": [],
    "category": "Reinforcement Learning & Classical ML"
  },
  {
    "word": "support vector machine",
    "part": "noun",
    "pron": "",
    "definition": "A supervised model that finds a separating boundary with maximum margin between classes.",
    "example": "“The team used support vector machine while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in reinforcement learning & classical ml and modern AI practice.",
    "note": "These concepts predate the current generative-AI wave and still underpin much of modern AI.",
    "related": [
      "k-nearest neighbors",
      "gradient boosting",
      "naive Bayes"
    ],
    "aliases": [
      "svm"
    ],
    "category": "Reinforcement Learning & Classical ML"
  },
  {
    "word": "k-nearest neighbors",
    "part": "noun",
    "pron": "",
    "definition": "A method that predicts from the labels or values of nearby training examples under a distance measure.",
    "example": "“The team used k-nearest neighbors while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in reinforcement learning & classical ml and modern AI practice.",
    "note": "These concepts predate the current generative-AI wave and still underpin much of modern AI.",
    "related": [
      "naive Bayes",
      "support vector machine",
      "principal component analysis"
    ],
    "aliases": [
      "k-nn"
    ],
    "category": "Reinforcement Learning & Classical ML"
  },
  {
    "word": "naive Bayes",
    "part": "noun",
    "pron": "",
    "definition": "A probabilistic classifier based on Bayes' rule with simplifying conditional-independence assumptions.",
    "example": "“The team used naive Bayes while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in reinforcement learning & classical ml and modern AI practice.",
    "note": "These concepts predate the current generative-AI wave and still underpin much of modern AI.",
    "related": [
      "principal component analysis",
      "k-nearest neighbors",
      "dimensionality reduction"
    ],
    "aliases": [],
    "category": "Reinforcement Learning & Classical ML"
  },
  {
    "word": "principal component analysis",
    "part": "noun",
    "pron": "",
    "definition": "A linear dimensionality-reduction method that projects data onto directions of greatest variance.",
    "example": "“The team used principal component analysis while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in reinforcement learning & classical ml and modern AI practice.",
    "note": "These concepts predate the current generative-AI wave and still underpin much of modern AI.",
    "related": [
      "dimensionality reduction",
      "naive Bayes",
      "feature selection"
    ],
    "aliases": [
      "pca"
    ],
    "category": "Reinforcement Learning & Classical ML"
  },
  {
    "word": "dimensionality reduction",
    "part": "noun",
    "pron": "",
    "definition": "Transforming data into fewer dimensions while trying to preserve useful structure.",
    "example": "“The team used dimensionality reduction while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in reinforcement learning & classical ml and modern AI practice.",
    "note": "These concepts predate the current generative-AI wave and still underpin much of modern AI.",
    "related": [
      "feature selection",
      "principal component analysis",
      "ensemble"
    ],
    "aliases": [],
    "category": "Reinforcement Learning & Classical ML"
  },
  {
    "word": "feature selection",
    "part": "noun",
    "pron": "",
    "definition": "Choosing a subset of available features for a model or analysis.",
    "example": "“The team used feature selection while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in reinforcement learning & classical ml and modern AI practice.",
    "note": "These concepts predate the current generative-AI wave and still underpin much of modern AI.",
    "related": [
      "ensemble",
      "dimensionality reduction",
      "bagging"
    ],
    "aliases": [],
    "category": "Reinforcement Learning & Classical ML"
  },
  {
    "word": "ensemble",
    "part": "noun",
    "pron": "",
    "definition": "A system that combines predictions from multiple models to improve robustness or accuracy.",
    "example": "“The team used ensemble while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in reinforcement learning & classical ml and modern AI practice.",
    "note": "These concepts predate the current generative-AI wave and still underpin much of modern AI.",
    "related": [
      "bagging",
      "feature selection",
      "boosting"
    ],
    "aliases": [
      "model ensemble"
    ],
    "category": "Reinforcement Learning & Classical ML"
  },
  {
    "word": "bagging",
    "part": "noun",
    "pron": "",
    "definition": "Training models on resampled datasets and averaging their predictions to reduce variance.",
    "example": "“The team used bagging while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in reinforcement learning & classical ml and modern AI practice.",
    "note": "These concepts predate the current generative-AI wave and still underpin much of modern AI.",
    "related": [
      "boosting",
      "ensemble",
      "reinforcement learning"
    ],
    "aliases": [
      "bootstrap aggregating"
    ],
    "category": "Reinforcement Learning & Classical ML"
  },
  {
    "word": "boosting",
    "part": "noun",
    "pron": "",
    "definition": "Building an ensemble sequentially so new weak learners emphasize errors made by earlier learners.",
    "example": "“The team used boosting while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in reinforcement learning & classical ml and modern AI practice.",
    "note": "These concepts predate the current generative-AI wave and still underpin much of modern AI.",
    "related": [
      "reinforcement learning",
      "bagging",
      "agent-environment loop"
    ],
    "aliases": [],
    "category": "Reinforcement Learning & Classical ML"
  },
  {
    "word": "AI-native",
    "part": "noun",
    "pron": "",
    "definition": "Describing a product or workflow designed around AI capabilities from the beginning rather than adding AI as a minor feature.",
    "example": "“The team used AI-native while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in ai product, coding & culture and modern AI practice.",
    "note": "These terms describe how people build with, talk about, and organize work around modern AI systems.",
    "related": [
      "AI-first",
      "latency budget",
      "copilot"
    ],
    "aliases": [
      "ai native"
    ],
    "category": "AI Product, Coding & Culture"
  },
  {
    "word": "AI-first",
    "part": "noun",
    "pron": "",
    "definition": "A strategy or design approach that considers AI the primary mechanism for solving a product or workflow problem.",
    "example": "“The team used AI-first while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in ai product, coding & culture and modern AI practice.",
    "note": "These terms describe how people build with, talk about, and organize work around modern AI systems.",
    "related": [
      "copilot",
      "AI-native",
      "AI assistant"
    ],
    "aliases": [
      "ai first"
    ],
    "category": "AI Product, Coding & Culture"
  },
  {
    "word": "copilot",
    "part": "noun",
    "pron": "",
    "definition": "A product pattern where AI assists a human who remains actively responsible for direction and decisions.",
    "example": "“The team used copilot while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in ai product, coding & culture and modern AI practice.",
    "note": "These terms describe how people build with, talk about, and organize work around modern AI systems.",
    "related": [
      "AI assistant",
      "AI-first",
      "pair programmer"
    ],
    "aliases": [
      "ai copilot"
    ],
    "category": "AI Product, Coding & Culture"
  },
  {
    "word": "AI assistant",
    "part": "noun",
    "pron": "",
    "definition": "An AI system designed to help users through conversation, generation, retrieval, tools, or actions.",
    "example": "“The team used AI assistant while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in ai product, coding & culture and modern AI practice.",
    "note": "These terms describe how people build with, talk about, and organize work around modern AI systems.",
    "related": [
      "pair programmer",
      "copilot",
      "coding agent"
    ],
    "aliases": [
      "assistant"
    ],
    "category": "AI Product, Coding & Culture"
  },
  {
    "word": "pair programmer",
    "part": "noun",
    "pron": "",
    "definition": "A coding partner role in which an AI helps write, review, explain, test, or debug software.",
    "example": "“The team used pair programmer while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in ai product, coding & culture and modern AI practice.",
    "note": "These terms describe how people build with, talk about, and organize work around modern AI systems.",
    "related": [
      "coding agent",
      "AI assistant",
      "research agent"
    ],
    "aliases": [
      "ai pair programmer"
    ],
    "category": "AI Product, Coding & Culture"
  },
  {
    "word": "coding agent",
    "part": "noun",
    "pron": "",
    "definition": "An agent specialized for reading code, editing files, running commands, testing, and iterating on software tasks.",
    "example": "“The team used coding agent while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in ai product, coding & culture and modern AI practice.",
    "note": "These terms describe how people build with, talk about, and organize work around modern AI systems.",
    "related": [
      "research agent",
      "pair programmer",
      "voice agent"
    ],
    "aliases": [
      "software agent"
    ],
    "category": "AI Product, Coding & Culture"
  },
  {
    "word": "research agent",
    "part": "noun",
    "pron": "",
    "definition": "An agent specialized for searching, reading, comparing, synthesizing, and citing information.",
    "example": "“The team used research agent while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in ai product, coding & culture and modern AI practice.",
    "note": "These terms describe how people build with, talk about, and organize work around modern AI systems.",
    "related": [
      "voice agent",
      "coding agent",
      "multimodal agent"
    ],
    "aliases": [
      "deep research agent"
    ],
    "category": "AI Product, Coding & Culture"
  },
  {
    "word": "voice agent",
    "part": "noun",
    "pron": "",
    "definition": "An interactive agent that communicates primarily through spoken audio, often with real-time speech recognition and synthesis.",
    "example": "“The team used voice agent while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in ai product, coding & culture and modern AI practice.",
    "note": "These terms describe how people build with, talk about, and organize work around modern AI systems.",
    "related": [
      "multimodal agent",
      "research agent",
      "deep research"
    ],
    "aliases": [],
    "category": "AI Product, Coding & Culture"
  },
  {
    "word": "multimodal agent",
    "part": "noun",
    "pron": "",
    "definition": "An agent that works across several modalities such as text, images, audio, files, or video.",
    "example": "“The team used multimodal agent while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in ai product, coding & culture and modern AI practice.",
    "note": "These terms describe how people build with, talk about, and organize work around modern AI systems.",
    "related": [
      "deep research",
      "voice agent",
      "vibe coding"
    ],
    "aliases": [],
    "category": "AI Product, Coding & Culture"
  },
  {
    "word": "deep research",
    "part": "noun",
    "pron": "",
    "definition": "A long-running agentic workflow that gathers, analyzes, and synthesizes information from many sources into a researched answer or report.",
    "example": "“The team used deep research while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in ai product, coding & culture and modern AI practice.",
    "note": "These terms describe how people build with, talk about, and organize work around modern AI systems.",
    "related": [
      "vibe coding",
      "multimodal agent",
      "vibe coder"
    ],
    "aliases": [
      "agentic research"
    ],
    "category": "AI Product, Coding & Culture"
  },
  {
    "word": "vibe coder",
    "part": "noun",
    "pron": "",
    "definition": "A person who builds software primarily by directing AI coding systems in natural language and iterating on the results.",
    "example": "“The team used vibe coder while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in ai product, coding & culture and modern AI practice.",
    "note": "These terms describe how people build with, talk about, and organize work around modern AI systems.",
    "related": [
      "ship loop",
      "vibe coding",
      "diff"
    ],
    "aliases": [
      "ai coder"
    ],
    "category": "AI Product, Coding & Culture"
  },
  {
    "word": "AI slop",
    "part": "noun",
    "pron": "",
    "definition": "Pejorative slang for low-effort, repetitive, or poorly curated content produced at scale with generative AI.",
    "example": "“The team used AI slop while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in ai product, coding & culture and modern AI practice.",
    "note": "These terms describe how people build with, talk about, and organize work around modern AI systems.",
    "related": [
      "AI spam",
      "prompt debt",
      "model collapse"
    ],
    "aliases": [
      "slop"
    ],
    "category": "AI Product, Coding & Culture"
  },
  {
    "word": "AI spam",
    "part": "noun",
    "pron": "",
    "definition": "High-volume AI-generated content distributed with little relevance, quality control, or user value.",
    "example": "“The team used AI spam while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in ai product, coding & culture and modern AI practice.",
    "note": "These terms describe how people build with, talk about, and organize work around modern AI systems.",
    "related": [
      "model collapse",
      "AI slop",
      "synthetic content"
    ],
    "aliases": [
      "synthetic spam"
    ],
    "category": "AI Product, Coding & Culture"
  },
  {
    "word": "model collapse",
    "part": "noun",
    "pron": "",
    "definition": "Degradation that can occur when models are repeatedly trained on low-quality synthetic outputs or a narrowing data distribution.",
    "example": "“The team used model collapse while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in ai product, coding & culture and modern AI practice.",
    "note": "These terms describe how people build with, talk about, and organize work around modern AI systems.",
    "related": [
      "synthetic content",
      "AI spam",
      "prompt-to-product"
    ],
    "aliases": [
      "recursive training collapse"
    ],
    "category": "AI Product, Coding & Culture"
  },
  {
    "word": "synthetic content",
    "part": "noun",
    "pron": "",
    "definition": "Text, images, audio, video, or data generated partly or entirely by algorithms.",
    "example": "“The team used synthetic content while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in ai product, coding & culture and modern AI practice.",
    "note": "These terms describe how people build with, talk about, and organize work around modern AI systems.",
    "related": [
      "prompt-to-product",
      "model collapse",
      "prototype-first"
    ],
    "aliases": [
      "ai generated content"
    ],
    "category": "AI Product, Coding & Culture"
  },
  {
    "word": "prompt-to-product",
    "part": "noun",
    "pron": "",
    "definition": "An informal idea of moving from natural-language intent to a working software artifact through AI-assisted generation and iteration.",
    "example": "“The team used prompt-to-product while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in ai product, coding & culture and modern AI practice.",
    "note": "These terms describe how people build with, talk about, and organize work around modern AI systems.",
    "related": [
      "prototype-first",
      "synthetic content",
      "human review"
    ],
    "aliases": [],
    "category": "AI Product, Coding & Culture"
  },
  {
    "word": "prototype-first",
    "part": "noun",
    "pron": "",
    "definition": "A workflow that uses fast AI generation to make a tangible prototype early, then improves correctness and architecture through feedback.",
    "example": "“The team used prototype-first while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in ai product, coding & culture and modern AI practice.",
    "note": "These terms describe how people build with, talk about, and organize work around modern AI systems.",
    "related": [
      "human review",
      "prompt-to-product",
      "verification"
    ],
    "aliases": [],
    "category": "AI Product, Coding & Culture"
  },
  {
    "word": "human review",
    "part": "noun",
    "pron": "",
    "definition": "A person inspecting or approving AI-generated content, decisions, or actions before they are accepted.",
    "example": "“The team used human review while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in ai product, coding & culture and modern AI practice.",
    "note": "These terms describe how people build with, talk about, and organize work around modern AI systems.",
    "related": [
      "verification",
      "prototype-first",
      "critique"
    ],
    "aliases": [
      "manual review"
    ],
    "category": "AI Product, Coding & Culture"
  },
  {
    "word": "verification",
    "part": "noun",
    "pron": "",
    "definition": "Checking AI output against tests, tools, sources, constraints, or independent evidence rather than trusting fluency alone.",
    "example": "“The team used verification while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in ai product, coding & culture and modern AI practice.",
    "note": "These terms describe how people build with, talk about, and organize work around modern AI systems.",
    "related": [
      "critique",
      "human review",
      "taste"
    ],
    "aliases": [
      "verify"
    ],
    "category": "AI Product, Coding & Culture"
  },
  {
    "word": "critique",
    "part": "noun",
    "pron": "",
    "definition": "Structured analysis of weaknesses, errors, trade-offs, or improvement opportunities in an AI-generated result.",
    "example": "“The team used critique while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in ai product, coding & culture and modern AI practice.",
    "note": "These terms describe how people build with, talk about, and organize work around modern AI systems.",
    "related": [
      "taste",
      "verification",
      "iteration"
    ],
    "aliases": [],
    "category": "AI Product, Coding & Culture"
  },
  {
    "word": "iteration",
    "part": "noun",
    "pron": "",
    "definition": "Repeatedly refining prompts, code, data, tools, or outputs using feedback from prior attempts.",
    "example": "“The team used iteration while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in ai product, coding & culture and modern AI practice.",
    "note": "These terms describe how people build with, talk about, and organize work around modern AI systems.",
    "related": [
      "AI wrapper",
      "taste",
      "model routing"
    ],
    "aliases": [],
    "category": "AI Product, Coding & Culture"
  },
  {
    "word": "AI wrapper",
    "part": "noun",
    "pron": "",
    "definition": "Informal, sometimes dismissive term for a product whose core value is largely a user experience or workflow built around an existing model API.",
    "example": "“The team used AI wrapper while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in ai product, coding & culture and modern AI practice.",
    "note": "These terms describe how people build with, talk about, and organize work around modern AI systems.",
    "related": [
      "model routing",
      "iteration",
      "fallback model"
    ],
    "aliases": [
      "llm wrapper"
    ],
    "category": "AI Product, Coding & Culture"
  },
  {
    "word": "model routing",
    "part": "noun",
    "pron": "",
    "definition": "Choosing among models dynamically according to task type, cost, latency, context length, or quality needs.",
    "example": "“The team used model routing while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in ai product, coding & culture and modern AI practice.",
    "note": "These terms describe how people build with, talk about, and organize work around modern AI systems.",
    "related": [
      "fallback model",
      "AI wrapper",
      "local-first AI"
    ],
    "aliases": [
      "llm routing"
    ],
    "category": "AI Product, Coding & Culture"
  },
  {
    "word": "fallback model",
    "part": "noun",
    "pron": "",
    "definition": "A secondary model used when the preferred model fails, is unavailable, or exceeds budget or latency constraints.",
    "example": "“The team used fallback model while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in ai product, coding & culture and modern AI practice.",
    "note": "These terms describe how people build with, talk about, and organize work around modern AI systems.",
    "related": [
      "local-first AI",
      "model routing",
      "open weights"
    ],
    "aliases": [],
    "category": "AI Product, Coding & Culture"
  },
  {
    "word": "local-first AI",
    "part": "noun",
    "pron": "",
    "definition": "A product approach that prioritizes on-device or user-controlled AI processing, often for privacy, latency, or offline use.",
    "example": "“The team used local-first AI while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in ai product, coding & culture and modern AI practice.",
    "note": "These terms describe how people build with, talk about, and organize work around modern AI systems.",
    "related": [
      "open weights",
      "fallback model",
      "open-source AI"
    ],
    "aliases": [],
    "category": "AI Product, Coding & Culture"
  },
  {
    "word": "open weights",
    "part": "noun",
    "pron": "",
    "definition": "A release model where trained model weights are publicly downloadable under specified license terms.",
    "example": "“The team used open weights while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in ai product, coding & culture and modern AI practice.",
    "note": "These terms describe how people build with, talk about, and organize work around modern AI systems.",
    "related": [
      "open-source AI",
      "local-first AI",
      "closed model"
    ],
    "aliases": [
      "open-weight model"
    ],
    "category": "AI Product, Coding & Culture"
  },
  {
    "word": "open-source AI",
    "part": "noun",
    "pron": "",
    "definition": "AI software released under open-source licenses; model weights, data, or training code may have separate licensing conditions.",
    "example": "“The team used open-source AI while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in ai product, coding & culture and modern AI practice.",
    "note": "These terms describe how people build with, talk about, and organize work around modern AI systems.",
    "related": [
      "closed model",
      "open weights",
      "model API"
    ],
    "aliases": [
      "open source model"
    ],
    "category": "AI Product, Coding & Culture"
  },
  {
    "word": "closed model",
    "part": "noun",
    "pron": "",
    "definition": "A model whose weights are not publicly distributed and are typically accessed through a hosted product or API.",
    "example": "“The team used closed model while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in ai product, coding & culture and modern AI practice.",
    "note": "These terms describe how people build with, talk about, and organize work around modern AI systems.",
    "related": [
      "model API",
      "open-source AI",
      "rate limit"
    ],
    "aliases": [
      "proprietary model"
    ],
    "category": "AI Product, Coding & Culture"
  },
  {
    "word": "model API",
    "part": "noun",
    "pron": "",
    "definition": "A hosted interface for sending model inputs and receiving generated outputs or tool events.",
    "example": "“The team used model API while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in ai product, coding & culture and modern AI practice.",
    "note": "These terms describe how people build with, talk about, and organize work around modern AI systems.",
    "related": [
      "rate limit",
      "closed model",
      "usage tier"
    ],
    "aliases": [
      "ai api"
    ],
    "category": "AI Product, Coding & Culture"
  },
  {
    "word": "rate limit",
    "part": "noun",
    "pron": "",
    "definition": "A service constraint limiting how many requests, tokens, or operations can be used within a time window.",
    "example": "“The team used rate limit while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in ai product, coding & culture and modern AI practice.",
    "note": "These terms describe how people build with, talk about, and organize work around modern AI systems.",
    "related": [
      "usage tier",
      "model API",
      "token budget"
    ],
    "aliases": [
      "quota"
    ],
    "category": "AI Product, Coding & Culture"
  },
  {
    "word": "usage tier",
    "part": "noun",
    "pron": "",
    "definition": "A service level that controls available quotas, features, or throughput according to account status or spend.",
    "example": "“The team used usage tier while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in ai product, coding & culture and modern AI practice.",
    "note": "These terms describe how people build with, talk about, and organize work around modern AI systems.",
    "related": [
      "token budget",
      "rate limit",
      "cost per token"
    ],
    "aliases": [],
    "category": "AI Product, Coding & Culture"
  },
  {
    "word": "token budget",
    "part": "noun",
    "pron": "",
    "definition": "A limit or planned allocation for input, output, and sometimes reasoning tokens within a workflow.",
    "example": "“The team used token budget while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in ai product, coding & culture and modern AI practice.",
    "note": "These terms describe how people build with, talk about, and organize work around modern AI systems.",
    "related": [
      "cost per token",
      "usage tier",
      "latency budget"
    ],
    "aliases": [
      "context budget"
    ],
    "category": "AI Product, Coding & Culture"
  },
  {
    "word": "cost per token",
    "part": "noun",
    "pron": "",
    "definition": "A pricing model where model usage cost is based partly on the number of processed input or output tokens.",
    "example": "“The team used cost per token while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in ai product, coding & culture and modern AI practice.",
    "note": "These terms describe how people build with, talk about, and organize work around modern AI systems.",
    "related": [
      "latency budget",
      "token budget",
      "AI-native"
    ],
    "aliases": [],
    "category": "AI Product, Coding & Culture"
  },
  {
    "word": "latency budget",
    "part": "noun",
    "pron": "",
    "definition": "The maximum response time a product can tolerate before user experience or workflow performance degrades.",
    "example": "“The team used latency budget while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in ai product, coding & culture and modern AI practice.",
    "note": "These terms describe how people build with, talk about, and organize work around modern AI systems.",
    "related": [
      "AI-native",
      "cost per token",
      "AI-first"
    ],
    "aliases": [],
    "category": "AI Product, Coding & Culture"
  },
  {
    "word": "responsible AI",
    "part": "noun",
    "pron": "",
    "definition": "Practices for developing and using AI with attention to safety, fairness, privacy, transparency, accountability, and social impact.",
    "example": "“The team used responsible AI while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in governance & responsible ai and modern AI practice.",
    "note": "Governance terms concern accountability, evidence, process, and acceptable use around AI systems.",
    "related": [
      "AI governance",
      "human oversight",
      "model governance"
    ],
    "aliases": [
      "rai"
    ],
    "category": "Governance & Responsible AI"
  },
  {
    "word": "AI governance",
    "part": "noun",
    "pron": "",
    "definition": "Policies, processes, roles, and controls used to manage AI development and use inside an organization.",
    "example": "“The team used AI governance while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in governance & responsible ai and modern AI practice.",
    "note": "Governance terms concern accountability, evidence, process, and acceptable use around AI systems.",
    "related": [
      "model governance",
      "responsible AI",
      "risk assessment"
    ],
    "aliases": [
      "model governance"
    ],
    "category": "Governance & Responsible AI"
  },
  {
    "word": "model governance",
    "part": "noun",
    "pron": "",
    "definition": "Processes for approving, documenting, monitoring, and controlling models throughout their lifecycle.",
    "example": "“The team used model governance while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in governance & responsible ai and modern AI practice.",
    "note": "Governance terms concern accountability, evidence, process, and acceptable use around AI systems.",
    "related": [
      "risk assessment",
      "AI governance",
      "impact assessment"
    ],
    "aliases": [],
    "category": "Governance & Responsible AI"
  },
  {
    "word": "risk assessment",
    "part": "noun",
    "pron": "",
    "definition": "A structured process for identifying possible harms, estimating likelihood and severity, and planning mitigations.",
    "example": "“The team used risk assessment while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in governance & responsible ai and modern AI practice.",
    "note": "Governance terms concern accountability, evidence, process, and acceptable use around AI systems.",
    "related": [
      "impact assessment",
      "model governance",
      "algorithmic audit"
    ],
    "aliases": [
      "ai risk assessment"
    ],
    "category": "Governance & Responsible AI"
  },
  {
    "word": "impact assessment",
    "part": "noun",
    "pron": "",
    "definition": "A documented evaluation of how an AI system may affect people, organizations, rights, or environments.",
    "example": "“The team used impact assessment while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in governance & responsible ai and modern AI practice.",
    "note": "Governance terms concern accountability, evidence, process, and acceptable use around AI systems.",
    "related": [
      "algorithmic audit",
      "risk assessment",
      "compliance"
    ],
    "aliases": [
      "ai impact assessment"
    ],
    "category": "Governance & Responsible AI"
  },
  {
    "word": "algorithmic audit",
    "part": "noun",
    "pron": "",
    "definition": "A systematic review of an automated system's data, design, behavior, controls, and impacts.",
    "example": "“The team used algorithmic audit while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in governance & responsible ai and modern AI practice.",
    "note": "Governance terms concern accountability, evidence, process, and acceptable use around AI systems.",
    "related": [
      "compliance",
      "impact assessment",
      "accountability"
    ],
    "aliases": [
      "ai audit"
    ],
    "category": "Governance & Responsible AI"
  },
  {
    "word": "compliance",
    "part": "noun",
    "pron": "",
    "definition": "Meeting applicable laws, regulations, contractual requirements, policies, and standards.",
    "example": "“The team used compliance while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in governance & responsible ai and modern AI practice.",
    "note": "Governance terms concern accountability, evidence, process, and acceptable use around AI systems.",
    "related": [
      "accountability",
      "algorithmic audit",
      "transparency"
    ],
    "aliases": [
      "ai compliance"
    ],
    "category": "Governance & Responsible AI"
  },
  {
    "word": "accountability",
    "part": "noun",
    "pron": "",
    "definition": "Clear responsibility for decisions, controls, outcomes, and remediation associated with an AI system.",
    "example": "“The team used accountability while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in governance & responsible ai and modern AI practice.",
    "note": "Governance terms concern accountability, evidence, process, and acceptable use around AI systems.",
    "related": [
      "transparency",
      "compliance",
      "disclosure"
    ],
    "aliases": [],
    "category": "Governance & Responsible AI"
  },
  {
    "word": "transparency",
    "part": "noun",
    "pron": "",
    "definition": "Providing understandable information about how an AI system is built, used, limited, or governed.",
    "example": "“The team used transparency while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in governance & responsible ai and modern AI practice.",
    "note": "Governance terms concern accountability, evidence, process, and acceptable use around AI systems.",
    "related": [
      "disclosure",
      "accountability",
      "model card"
    ],
    "aliases": [],
    "category": "Governance & Responsible AI"
  },
  {
    "word": "disclosure",
    "part": "noun",
    "pron": "",
    "definition": "Informing users when AI is being used or when content is generated or materially altered by AI.",
    "example": "“The team used disclosure while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in governance & responsible ai and modern AI practice.",
    "note": "Governance terms concern accountability, evidence, process, and acceptable use around AI systems.",
    "related": [
      "model card",
      "transparency",
      "system card"
    ],
    "aliases": [],
    "category": "Governance & Responsible AI"
  },
  {
    "word": "model card",
    "part": "noun",
    "pron": "",
    "definition": "A document describing a model's intended use, evaluation, limitations, risks, and other relevant facts.",
    "example": "“The team used model card while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in governance & responsible ai and modern AI practice.",
    "note": "Governance terms concern accountability, evidence, process, and acceptable use around AI systems.",
    "related": [
      "system card",
      "disclosure",
      "dataset card"
    ],
    "aliases": [],
    "category": "Governance & Responsible AI"
  },
  {
    "word": "system card",
    "part": "noun",
    "pron": "",
    "definition": "A document describing a deployed AI system's capabilities, evaluations, safeguards, limitations, and risk considerations.",
    "example": "“The team used system card while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in governance & responsible ai and modern AI practice.",
    "note": "Governance terms concern accountability, evidence, process, and acceptable use around AI systems.",
    "related": [
      "dataset card",
      "model card",
      "datasheet for datasets"
    ],
    "aliases": [],
    "category": "Governance & Responsible AI"
  },
  {
    "word": "dataset card",
    "part": "noun",
    "pron": "",
    "definition": "Documentation describing a dataset's composition, collection, intended use, limitations, and risks.",
    "example": "“The team used dataset card while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in governance & responsible ai and modern AI practice.",
    "note": "Governance terms concern accountability, evidence, process, and acceptable use around AI systems.",
    "related": [
      "datasheet for datasets",
      "system card",
      "acceptable use policy"
    ],
    "aliases": [],
    "category": "Governance & Responsible AI"
  },
  {
    "word": "datasheet for datasets",
    "part": "noun",
    "pron": "",
    "definition": "A structured documentation practice for describing dataset motivation, composition, collection, preprocessing, and recommended uses.",
    "example": "“The team used datasheet for datasets while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in governance & responsible ai and modern AI practice.",
    "note": "Governance terms concern accountability, evidence, process, and acceptable use around AI systems.",
    "related": [
      "acceptable use policy",
      "dataset card",
      "incident"
    ],
    "aliases": [
      "datasheet"
    ],
    "category": "Governance & Responsible AI"
  },
  {
    "word": "acceptable use policy",
    "part": "noun",
    "pron": "",
    "definition": "Rules describing permitted and prohibited uses of an AI product or service.",
    "example": "“The team used acceptable use policy while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in governance & responsible ai and modern AI practice.",
    "note": "Governance terms concern accountability, evidence, process, and acceptable use around AI systems.",
    "related": [
      "incident",
      "datasheet for datasets",
      "incident response"
    ],
    "aliases": [
      "aup"
    ],
    "category": "Governance & Responsible AI"
  },
  {
    "word": "incident",
    "part": "noun",
    "pron": "",
    "definition": "An event where an AI system causes, contributes to, or exposes a significant failure, harm, policy breach, or security issue.",
    "example": "“The team used incident while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in governance & responsible ai and modern AI practice.",
    "note": "Governance terms concern accountability, evidence, process, and acceptable use around AI systems.",
    "related": [
      "incident response",
      "acceptable use policy",
      "model inventory"
    ],
    "aliases": [
      "ai incident"
    ],
    "category": "Governance & Responsible AI"
  },
  {
    "word": "incident response",
    "part": "noun",
    "pron": "",
    "definition": "Processes for detecting, containing, investigating, communicating, and remediating AI-related incidents.",
    "example": "“The team used incident response while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in governance & responsible ai and modern AI practice.",
    "note": "Governance terms concern accountability, evidence, process, and acceptable use around AI systems.",
    "related": [
      "model inventory",
      "incident",
      "model lifecycle"
    ],
    "aliases": [],
    "category": "Governance & Responsible AI"
  },
  {
    "word": "model inventory",
    "part": "noun",
    "pron": "",
    "definition": "An organizational record of models, owners, use cases, risk levels, versions, and deployment status.",
    "example": "“The team used model inventory while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in governance & responsible ai and modern AI practice.",
    "note": "Governance terms concern accountability, evidence, process, and acceptable use around AI systems.",
    "related": [
      "model lifecycle",
      "incident response",
      "change management"
    ],
    "aliases": [],
    "category": "Governance & Responsible AI"
  },
  {
    "word": "model lifecycle",
    "part": "noun",
    "pron": "",
    "definition": "The stages through which a model moves from data and development to validation, deployment, monitoring, and retirement.",
    "example": "“The team used model lifecycle while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in governance & responsible ai and modern AI practice.",
    "note": "Governance terms concern accountability, evidence, process, and acceptable use around AI systems.",
    "related": [
      "change management",
      "model inventory",
      "audit trail"
    ],
    "aliases": [],
    "category": "Governance & Responsible AI"
  },
  {
    "word": "change management",
    "part": "noun",
    "pron": "",
    "definition": "Controlled processes for reviewing, testing, approving, and documenting changes to AI systems.",
    "example": "“The team used change management while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in governance & responsible ai and modern AI practice.",
    "note": "Governance terms concern accountability, evidence, process, and acceptable use around AI systems.",
    "related": [
      "audit trail",
      "model lifecycle",
      "traceability"
    ],
    "aliases": [],
    "category": "Governance & Responsible AI"
  },
  {
    "word": "audit trail",
    "part": "noun",
    "pron": "",
    "definition": "A record of important actions, versions, approvals, data access, and system events that supports accountability and investigation.",
    "example": "“The team used audit trail while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in governance & responsible ai and modern AI practice.",
    "note": "Governance terms concern accountability, evidence, process, and acceptable use around AI systems.",
    "related": [
      "traceability",
      "change management",
      "assurance"
    ],
    "aliases": [],
    "category": "Governance & Responsible AI"
  },
  {
    "word": "traceability",
    "part": "noun",
    "pron": "",
    "definition": "The ability to connect outputs and decisions back to models, data, prompts, tools, versions, and responsible owners.",
    "example": "“The team used traceability while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in governance & responsible ai and modern AI practice.",
    "note": "Governance terms concern accountability, evidence, process, and acceptable use around AI systems.",
    "related": [
      "assurance",
      "audit trail",
      "safety case"
    ],
    "aliases": [],
    "category": "Governance & Responsible AI"
  },
  {
    "word": "assurance",
    "part": "noun",
    "pron": "",
    "definition": "Evidence-building activities intended to justify confidence that an AI system meets specified requirements.",
    "example": "“The team used assurance while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in governance & responsible ai and modern AI practice.",
    "note": "Governance terms concern accountability, evidence, process, and acceptable use around AI systems.",
    "related": [
      "safety case",
      "traceability",
      "redress"
    ],
    "aliases": [
      "ai assurance"
    ],
    "category": "Governance & Responsible AI"
  },
  {
    "word": "safety case",
    "part": "noun",
    "pron": "",
    "definition": "A structured argument, supported by evidence, that a system is acceptably safe for a defined context.",
    "example": "“The team used safety case while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in governance & responsible ai and modern AI practice.",
    "note": "Governance terms concern accountability, evidence, process, and acceptable use around AI systems.",
    "related": [
      "redress",
      "assurance",
      "human oversight"
    ],
    "aliases": [
      "assurance case"
    ],
    "category": "Governance & Responsible AI"
  },
  {
    "word": "redress",
    "part": "noun",
    "pron": "",
    "definition": "Mechanisms that let affected people challenge, correct, appeal, or seek remedy for AI-driven outcomes.",
    "example": "“The team used redress while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in governance & responsible ai and modern AI practice.",
    "note": "Governance terms concern accountability, evidence, process, and acceptable use around AI systems.",
    "related": [
      "human oversight",
      "safety case",
      "responsible AI"
    ],
    "aliases": [],
    "category": "Governance & Responsible AI"
  },
  {
    "word": "human oversight",
    "part": "noun",
    "pron": "",
    "definition": "Processes that keep people meaningfully able to supervise, override, review, or stop AI systems.",
    "example": "“The team used human oversight while designing, building, or evaluating the AI system.”",
    "origin": "A standard term in governance & responsible ai and modern AI practice.",
    "note": "Governance terms concern accountability, evidence, process, and acceptable use around AI systems.",
    "related": [
      "responsible AI",
      "redress",
      "AI governance"
    ],
    "aliases": [
      "oversight"
    ],
    "category": "Governance & Responsible AI"
  },
  {
    "word": "generative AI",
    "part": "noun",
    "pron": "",
    "definition": "AI systems designed to create new text, images, audio, video, code, data, or other content from learned patterns.",
    "example": "“The team used generative AI while designing, building, or evaluating the AI system.”",
    "origin": "A widely used term in foundations and AI practice.",
    "note": "This is a foundational term worth distinguishing from nearby concepts in the same part of AI.",
    "related": [
      "generative model",
      "foundation model",
      "multimodal"
    ],
    "aliases": [
      "genai",
      "generative artificial intelligence"
    ],
    "category": "Foundations"
  },
  {
    "word": "generative model",
    "part": "noun",
    "pron": "",
    "definition": "A model that learns a data distribution well enough to produce new samples rather than only classify or score existing inputs.",
    "example": "“The team used generative model while designing, building, or evaluating the AI system.”",
    "origin": "A widely used term in foundations and AI practice.",
    "note": "This is a foundational term worth distinguishing from nearby concepts in the same part of AI.",
    "related": [
      "generative AI",
      "diffusion model",
      "autoregressive model"
    ],
    "aliases": [],
    "category": "Foundations"
  },
  {
    "word": "language model",
    "part": "noun",
    "pron": "",
    "definition": "A model that assigns probabilities to sequences of language or generates language by predicting tokens.",
    "example": "“The team used language model while designing, building, or evaluating the AI system.”",
    "origin": "A widely used term in foundations and AI practice.",
    "note": "This is a foundational term worth distinguishing from nearby concepts in the same part of AI.",
    "related": [
      "large language model",
      "token",
      "causal language model"
    ],
    "aliases": [
      "lm"
    ],
    "category": "Foundations"
  },
  {
    "word": "reasoning model",
    "part": "noun",
    "pron": "",
    "definition": "A model optimized to spend additional inference-time computation on multi-step problems before producing an answer.",
    "example": "“The team used reasoning model while designing, building, or evaluating the AI system.”",
    "origin": "A widely used term in foundations and AI practice.",
    "note": "This is a foundational term worth distinguishing from nearby concepts in the same part of AI.",
    "related": [
      "reasoning",
      "test-time compute",
      "verifier"
    ],
    "aliases": [
      "thinking model"
    ],
    "category": "Foundations"
  },
  {
    "word": "instruct model",
    "part": "noun",
    "pron": "",
    "definition": "A model adapted to follow natural-language instructions more reliably than a raw base model.",
    "example": "“The team used instruct model while designing, building, or evaluating the AI system.”",
    "origin": "A widely used term in foundations and AI practice.",
    "note": "This is a foundational term worth distinguishing from nearby concepts in the same part of AI.",
    "related": [
      "instruction tuning",
      "base model",
      "chat model"
    ],
    "aliases": [
      "instruction-tuned model"
    ],
    "category": "Foundations"
  },
  {
    "word": "chat model",
    "part": "noun",
    "pron": "",
    "definition": "A language model adapted for multi-turn conversational interaction with role-structured messages.",
    "example": "“The team used chat model while designing, building, or evaluating the AI system.”",
    "origin": "A widely used term in foundations and AI practice.",
    "note": "This is a foundational term worth distinguishing from nearby concepts in the same part of AI.",
    "related": [
      "instruct model",
      "system prompt",
      "assistant"
    ],
    "aliases": [
      "conversational model"
    ],
    "category": "Foundations"
  },
  {
    "word": "multimodal model",
    "part": "noun",
    "pron": "",
    "definition": "A model that can process or generate more than one modality such as text, image, audio, or video.",
    "example": "“The team used multimodal model while designing, building, or evaluating the AI system.”",
    "origin": "A widely used term in foundations and AI practice.",
    "note": "This is a foundational term worth distinguishing from nearby concepts in the same part of AI.",
    "related": [
      "multimodal",
      "vision-language model",
      "large multimodal model"
    ],
    "aliases": [],
    "category": "Foundations"
  },
  {
    "word": "vision model",
    "part": "noun",
    "pron": "",
    "definition": "A model specialized for understanding, representing, or generating visual information.",
    "example": "“The team used vision model while designing, building, or evaluating the AI system.”",
    "origin": "A widely used term in foundations and AI practice.",
    "note": "This is a foundational term worth distinguishing from nearby concepts in the same part of AI.",
    "related": [
      "computer vision",
      "vision transformer",
      "image generation"
    ],
    "aliases": [
      "computer vision model"
    ],
    "category": "Foundations"
  },
  {
    "word": "speech model",
    "part": "noun",
    "pron": "",
    "definition": "A model specialized for recognizing, understanding, generating, translating, or transforming speech.",
    "example": "“The team used speech model while designing, building, or evaluating the AI system.”",
    "origin": "A widely used term in foundations and AI practice.",
    "note": "This is a foundational term worth distinguishing from nearby concepts in the same part of AI.",
    "related": [
      "automatic speech recognition",
      "text-to-speech",
      "audio generation"
    ],
    "aliases": [
      "audio model"
    ],
    "category": "Foundations"
  },
  {
    "word": "GPT",
    "part": "noun",
    "pron": "",
    "definition": "Generative Pre-trained Transformer; a family name and architecture pattern associated with autoregressive transformer language models.",
    "example": "“The team used GPT while designing, building, or evaluating the AI system.”",
    "origin": "A widely used term in architectures and AI practice.",
    "note": "This is a foundational term worth distinguishing from nearby concepts in the same part of AI.",
    "related": [
      "transformer",
      "causal language model",
      "autoregressive model"
    ],
    "aliases": [
      "generative pretrained transformer"
    ],
    "category": "Architectures"
  },
  {
    "word": "BERT",
    "part": "noun",
    "pron": "",
    "definition": "Bidirectional Encoder Representations from Transformers; an encoder-only transformer model originally trained with masked-language objectives.",
    "example": "“The team used BERT while designing, building, or evaluating the AI system.”",
    "origin": "A widely used term in architectures and AI practice.",
    "note": "This is a foundational term worth distinguishing from nearby concepts in the same part of AI.",
    "related": [
      "transformer",
      "masked language model",
      "encoder-only transformer"
    ],
    "aliases": [
      "bidirectional encoder representations from transformers"
    ],
    "category": "Architectures"
  },
  {
    "word": "T5",
    "part": "noun",
    "pron": "",
    "definition": "Text-to-Text Transfer Transformer; an encoder-decoder model framing many NLP tasks as text-in, text-out generation.",
    "example": "“The team used T5 while designing, building, or evaluating the AI system.”",
    "origin": "A widely used term in architectures and AI practice.",
    "note": "This is a foundational term worth distinguishing from nearby concepts in the same part of AI.",
    "related": [
      "encoder-decoder",
      "sequence-to-sequence",
      "transformer"
    ],
    "aliases": [
      "text to text transfer transformer"
    ],
    "category": "Architectures"
  },
  {
    "word": "encoder-only transformer",
    "part": "noun",
    "pron": "",
    "definition": "A transformer architecture that uses an encoder stack to produce contextual representations, commonly for understanding tasks.",
    "example": "“The team used encoder-only transformer while designing, building, or evaluating the AI system.”",
    "origin": "A widely used term in architectures and AI practice.",
    "note": "This is a foundational term worth distinguishing from nearby concepts in the same part of AI.",
    "related": [
      "encoder",
      "BERT",
      "masked language model"
    ],
    "aliases": [
      "encoder only"
    ],
    "category": "Architectures"
  },
  {
    "word": "decoder-only transformer",
    "part": "noun",
    "pron": "",
    "definition": "A transformer architecture that generates autoregressively with a causal decoder stack, common in modern LLMs.",
    "example": "“The team used decoder-only transformer while designing, building, or evaluating the AI system.”",
    "origin": "A widely used term in architectures and AI practice.",
    "note": "This is a foundational term worth distinguishing from nearby concepts in the same part of AI.",
    "related": [
      "decoder",
      "GPT",
      "causal language model"
    ],
    "aliases": [
      "decoder only"
    ],
    "category": "Architectures"
  },
  {
    "word": "U-Net",
    "part": "noun",
    "pron": "",
    "definition": "An encoder-decoder convolutional architecture with skip connections, widely used in segmentation and diffusion-model denoisers.",
    "example": "“The team used U-Net while designing, building, or evaluating the AI system.”",
    "origin": "A widely used term in architectures and AI practice.",
    "note": "This is a foundational term worth distinguishing from nearby concepts in the same part of AI.",
    "related": [
      "diffusion model",
      "semantic segmentation",
      "encoder-decoder"
    ],
    "aliases": [
      "unet"
    ],
    "category": "Architectures"
  },
  {
    "word": "ResNet",
    "part": "noun",
    "pron": "",
    "definition": "Residual Network; a deep neural architecture that popularized residual connections for training very deep vision models.",
    "example": "“The team used ResNet while designing, building, or evaluating the AI system.”",
    "origin": "A widely used term in architectures and AI practice.",
    "note": "This is a foundational term worth distinguishing from nearby concepts in the same part of AI.",
    "related": [
      "residual connection",
      "convolutional neural network",
      "computer vision"
    ],
    "aliases": [
      "residual network"
    ],
    "category": "Architectures"
  },
  {
    "word": "masked autoencoder",
    "part": "noun",
    "pron": "",
    "definition": "An autoencoder trained to reconstruct missing parts of an input, often used for self-supervised representation learning.",
    "example": "“The team used masked autoencoder while designing, building, or evaluating the AI system.”",
    "origin": "A widely used term in architectures and AI practice.",
    "note": "This is a foundational term worth distinguishing from nearby concepts in the same part of AI.",
    "related": [
      "autoencoder",
      "self-supervised learning",
      "vision transformer"
    ],
    "aliases": [
      "mae"
    ],
    "category": "Architectures"
  },
  {
    "word": "VQ-VAE",
    "part": "noun",
    "pron": "",
    "definition": "Vector-quantized variational autoencoder; a generative model that learns discrete latent codes through vector quantization.",
    "example": "“The team used VQ-VAE while designing, building, or evaluating the AI system.”",
    "origin": "A widely used term in architectures and AI practice.",
    "note": "This is a foundational term worth distinguishing from nearby concepts in the same part of AI.",
    "related": [
      "variational autoencoder",
      "latent space",
      "codec model"
    ],
    "aliases": [
      "vector quantized variational autoencoder"
    ],
    "category": "Architectures"
  },
  {
    "word": "VQGAN",
    "part": "noun",
    "pron": "",
    "definition": "A vector-quantized generative adversarial model combining discrete latents with adversarial image reconstruction objectives.",
    "example": "“The team used VQGAN while designing, building, or evaluating the AI system.”",
    "origin": "A widely used term in architectures and AI practice.",
    "note": "This is a foundational term worth distinguishing from nearby concepts in the same part of AI.",
    "related": [
      "VQ-VAE",
      "GAN",
      "image generation"
    ],
    "aliases": [
      "vector quantized gan"
    ],
    "category": "Architectures"
  },
  {
    "word": "neural radiance field",
    "part": "noun",
    "pron": "",
    "definition": "A neural representation that models a 3D scene by predicting color and density along camera rays.",
    "example": "“The team used neural radiance field while designing, building, or evaluating the AI system.”",
    "origin": "A widely used term in architectures and AI practice.",
    "note": "This is a foundational term worth distinguishing from nearby concepts in the same part of AI.",
    "related": [
      "3D reconstruction",
      "novel view synthesis",
      "computer vision"
    ],
    "aliases": [
      "nerf"
    ],
    "category": "Architectures"
  },
  {
    "word": "3D Gaussian splatting",
    "part": "noun",
    "pron": "",
    "definition": "A scene-representation technique that renders collections of learned 3D Gaussian primitives efficiently for novel-view synthesis.",
    "example": "“The team used 3D Gaussian splatting while designing, building, or evaluating the AI system.”",
    "origin": "A widely used term in architectures and AI practice.",
    "note": "This is a foundational term worth distinguishing from nearby concepts in the same part of AI.",
    "related": [
      "neural radiance field",
      "3D reconstruction",
      "novel view synthesis"
    ],
    "aliases": [
      "gaussian splatting",
      "3dgs"
    ],
    "category": "Architectures"
  },
  {
    "word": "agent router",
    "part": "noun",
    "pron": "",
    "definition": "A routing component that chooses which agent or specialized worker should handle a request or subtask.",
    "example": "“The team used agent router while designing, building, or evaluating the AI system.”",
    "origin": "A widely used term in agents, tools & mcp and AI practice.",
    "note": "This is a foundational term worth distinguishing from nearby concepts in the same part of AI.",
    "related": [
      "router",
      "multi-agent system",
      "handoff"
    ],
    "aliases": [],
    "category": "Agents, Tools & MCP"
  },
  {
    "word": "MCP sampling",
    "part": "noun",
    "pron": "",
    "definition": "In Model Context Protocol, a client capability that lets an MCP server request language-model generation through the client.",
    "example": "“The team used MCP sampling while designing, building, or evaluating the AI system.”",
    "origin": "A widely used term in agents, tools & mcp and AI practice.",
    "note": "This is a foundational term worth distinguishing from nearby concepts in the same part of AI.",
    "related": [
      "MCP",
      "MCP client",
      "MCP server"
    ],
    "aliases": [
      "sampling in mcp"
    ],
    "category": "Agents, Tools & MCP"
  },
  {
    "word": "RL state",
    "part": "noun",
    "pron": "",
    "definition": "The representation of the current situation used by a reinforcement-learning agent when selecting an action.",
    "example": "“The team used RL state while designing, building, or evaluating the AI system.”",
    "origin": "A widely used term in reinforcement learning & classical ml and AI practice.",
    "note": "This is a foundational term worth distinguishing from nearby concepts in the same part of AI.",
    "related": [
      "reinforcement learning",
      "action",
      "policy"
    ],
    "aliases": [
      "state in reinforcement learning"
    ],
    "category": "Reinforcement Learning & Classical ML"
  },
  {
    "word": "RL policy",
    "part": "noun",
    "pron": "",
    "definition": "The mapping from states or observations to actions or action probabilities in reinforcement learning.",
    "example": "“The team used RL policy while designing, building, or evaluating the AI system.”",
    "origin": "A widely used term in reinforcement learning & classical ml and AI practice.",
    "note": "This is a foundational term worth distinguishing from nearby concepts in the same part of AI.",
    "related": [
      "reinforcement learning",
      "RL state",
      "reward"
    ],
    "aliases": [
      "policy in reinforcement learning"
    ],
    "category": "Reinforcement Learning & Classical ML"
  },
  {
    "word": "tool use",
    "part": "noun",
    "pron": "",
    "definition": "The broader capability of a model or agent to select and work with external tools, functions, APIs, or environments.",
    "example": "“The team used tool use while designing, building, or evaluating the AI system.”",
    "origin": "A widely used term in agents, tools & mcp and AI practice.",
    "note": "This is a foundational term worth distinguishing from nearby concepts in the same part of AI.",
    "related": [
      "tool calling",
      "tool",
      "agent"
    ],
    "aliases": [
      "use of tools"
    ],
    "category": "Agents, Tools & MCP"
  },
  {
    "word": "AI agent",
    "part": "noun",
    "pron": "",
    "definition": "An AI system that can pursue a goal across multiple steps by reasoning, using tools, and updating state.",
    "example": "“The team used AI agent while designing, building, or evaluating the AI system.”",
    "origin": "A widely used term in agents, tools & mcp and AI practice.",
    "note": "This is a foundational term worth distinguishing from nearby concepts in the same part of AI.",
    "related": [
      "agent",
      "agentic",
      "agent loop"
    ],
    "aliases": [
      "agentic ai"
    ],
    "category": "Agents, Tools & MCP"
  },
  {
    "word": "long-horizon task",
    "part": "noun",
    "pron": "",
    "definition": "A task that requires many dependent steps, sustained state, retries, or extended execution time before completion.",
    "example": "“The team used long-horizon task while designing, building, or evaluating the AI system.”",
    "origin": "A widely used term in agents, tools & mcp and AI practice.",
    "note": "This is a foundational term worth distinguishing from nearby concepts in the same part of AI.",
    "related": [
      "agent harness",
      "background task",
      "checkpointing"
    ],
    "aliases": [
      "long horizon task"
    ],
    "category": "Agents, Tools & MCP"
  },
  {
    "word": "semantic similarity",
    "part": "noun",
    "pron": "",
    "definition": "A measure of how similar two items are in meaning rather than exact surface wording.",
    "example": "“The team used semantic similarity while designing, building, or evaluating the AI system.”",
    "origin": "A widely used term in retrieval & knowledge and AI practice.",
    "note": "This is a foundational term worth distinguishing from nearby concepts in the same part of AI.",
    "related": [
      "embedding",
      "cosine similarity",
      "semantic search"
    ],
    "aliases": [
      "meaning similarity"
    ],
    "category": "Retrieval & Knowledge"
  },
  {
    "word": "natural language processing",
    "part": "noun",
    "pron": "",
    "definition": "The field of building computational systems that analyze, understand, transform, or generate human language.",
    "example": "“The team used natural language processing while designing, building, or evaluating the AI system.”",
    "origin": "A widely used term in natural language processing and AI practice.",
    "note": "Language tasks differ in whether the model is understanding, transforming, retrieving, or generating text.",
    "related": [
      "natural language processing",
      "language model",
      "transformer"
    ],
    "aliases": [
      "nlp"
    ],
    "category": "Natural Language Processing"
  },
  {
    "word": "natural language understanding",
    "part": "noun",
    "pron": "",
    "definition": "Tasks focused on extracting meaning, intent, structure, or facts from language.",
    "example": "“The team used natural language understanding while designing, building, or evaluating the AI system.”",
    "origin": "A widely used term in natural language processing and AI practice.",
    "note": "Language tasks differ in whether the model is understanding, transforming, retrieving, or generating text.",
    "related": [
      "natural language processing",
      "language model",
      "transformer"
    ],
    "aliases": [
      "nlu"
    ],
    "category": "Natural Language Processing"
  },
  {
    "word": "natural language generation",
    "part": "noun",
    "pron": "",
    "definition": "Tasks focused on producing human-readable language from models, data, or structured representations.",
    "example": "“The team used natural language generation while designing, building, or evaluating the AI system.”",
    "origin": "A widely used term in natural language processing and AI practice.",
    "note": "Language tasks differ in whether the model is understanding, transforming, retrieving, or generating text.",
    "related": [
      "natural language processing",
      "language model",
      "transformer"
    ],
    "aliases": [
      "nlg"
    ],
    "category": "Natural Language Processing"
  },
  {
    "word": "language modeling",
    "part": "noun",
    "pron": "",
    "definition": "Learning or using a probability distribution over sequences of language tokens.",
    "example": "“The team used language modeling while designing, building, or evaluating the AI system.”",
    "origin": "A widely used term in natural language processing and AI practice.",
    "note": "Language tasks differ in whether the model is understanding, transforming, retrieving, or generating text.",
    "related": [
      "natural language processing",
      "language model",
      "transformer"
    ],
    "aliases": [
      "lm task"
    ],
    "category": "Natural Language Processing"
  },
  {
    "word": "causal language modeling",
    "part": "noun",
    "pron": "",
    "definition": "Training a model to predict the next token using only earlier tokens in the sequence.",
    "example": "“The team used causal language modeling while designing, building, or evaluating the AI system.”",
    "origin": "A widely used term in natural language processing and AI practice.",
    "note": "Language tasks differ in whether the model is understanding, transforming, retrieving, or generating text.",
    "related": [
      "natural language processing",
      "language model",
      "transformer"
    ],
    "aliases": [
      "clm"
    ],
    "category": "Natural Language Processing"
  },
  {
    "word": "masked language modeling",
    "part": "noun",
    "pron": "",
    "definition": "Training a model to reconstruct tokens hidden from an input sequence.",
    "example": "“The team used masked language modeling while designing, building, or evaluating the AI system.”",
    "origin": "A widely used term in natural language processing and AI practice.",
    "note": "Language tasks differ in whether the model is understanding, transforming, retrieving, or generating text.",
    "related": [
      "natural language processing",
      "language model",
      "transformer"
    ],
    "aliases": [
      "mlm"
    ],
    "category": "Natural Language Processing"
  },
  {
    "word": "machine translation",
    "part": "noun",
    "pron": "",
    "definition": "Automatically translating text or speech from one language into another.",
    "example": "“The team used machine translation while designing, building, or evaluating the AI system.”",
    "origin": "A widely used term in natural language processing and AI practice.",
    "note": "Language tasks differ in whether the model is understanding, transforming, retrieving, or generating text.",
    "related": [
      "natural language processing",
      "language model",
      "transformer"
    ],
    "aliases": [
      "mt"
    ],
    "category": "Natural Language Processing"
  },
  {
    "word": "summarization",
    "part": "noun",
    "pron": "",
    "definition": "Producing a shorter representation of content while preserving its most important information.",
    "example": "“The team used summarization while designing, building, or evaluating the AI system.”",
    "origin": "A widely used term in natural language processing and AI practice.",
    "note": "Language tasks differ in whether the model is understanding, transforming, retrieving, or generating text.",
    "related": [
      "natural language processing",
      "language model",
      "transformer"
    ],
    "aliases": [
      "text summarization"
    ],
    "category": "Natural Language Processing"
  },
  {
    "word": "extractive summarization",
    "part": "noun",
    "pron": "",
    "definition": "Summarization that selects important spans or sentences directly from the source.",
    "example": "“The team used extractive summarization while designing, building, or evaluating the AI system.”",
    "origin": "A widely used term in natural language processing and AI practice.",
    "note": "Language tasks differ in whether the model is understanding, transforming, retrieving, or generating text.",
    "related": [
      "natural language processing",
      "language model",
      "transformer"
    ],
    "aliases": [],
    "category": "Natural Language Processing"
  },
  {
    "word": "abstractive summarization",
    "part": "noun",
    "pron": "",
    "definition": "Summarization that generates new wording to express the source content more compactly.",
    "example": "“The team used abstractive summarization while designing, building, or evaluating the AI system.”",
    "origin": "A widely used term in natural language processing and AI practice.",
    "note": "Language tasks differ in whether the model is understanding, transforming, retrieving, or generating text.",
    "related": [
      "natural language processing",
      "language model",
      "transformer"
    ],
    "aliases": [],
    "category": "Natural Language Processing"
  },
  {
    "word": "question answering",
    "part": "noun",
    "pron": "",
    "definition": "Producing an answer to a question from model knowledge, supplied context, retrieval, or structured data.",
    "example": "“The team used question answering while designing, building, or evaluating the AI system.”",
    "origin": "A widely used term in natural language processing and AI practice.",
    "note": "Language tasks differ in whether the model is understanding, transforming, retrieving, or generating text.",
    "related": [
      "natural language processing",
      "language model",
      "transformer"
    ],
    "aliases": [
      "qa"
    ],
    "category": "Natural Language Processing"
  },
  {
    "word": "open-domain question answering",
    "part": "noun",
    "pron": "",
    "definition": "Question answering over broad knowledge rather than a single supplied document or narrow domain.",
    "example": "“The team used open-domain question answering while designing, building, or evaluating the AI system.”",
    "origin": "A widely used term in natural language processing and AI practice.",
    "note": "Language tasks differ in whether the model is understanding, transforming, retrieving, or generating text.",
    "related": [
      "natural language processing",
      "language model",
      "transformer"
    ],
    "aliases": [
      "open domain qa"
    ],
    "category": "Natural Language Processing"
  },
  {
    "word": "reading comprehension",
    "part": "noun",
    "pron": "",
    "definition": "Answering questions or making predictions that require understanding a supplied passage.",
    "example": "“The team used reading comprehension while designing, building, or evaluating the AI system.”",
    "origin": "A widely used term in natural language processing and AI practice.",
    "note": "Language tasks differ in whether the model is understanding, transforming, retrieving, or generating text.",
    "related": [
      "natural language processing",
      "language model",
      "transformer"
    ],
    "aliases": [
      "machine reading comprehension"
    ],
    "category": "Natural Language Processing"
  },
  {
    "word": "text classification",
    "part": "noun",
    "pron": "",
    "definition": "Assigning one or more labels to a piece of text.",
    "example": "“The team used text classification while designing, building, or evaluating the AI system.”",
    "origin": "A widely used term in natural language processing and AI practice.",
    "note": "Language tasks differ in whether the model is understanding, transforming, retrieving, or generating text.",
    "related": [
      "natural language processing",
      "language model",
      "transformer"
    ],
    "aliases": [],
    "category": "Natural Language Processing"
  },
  {
    "word": "sentiment analysis",
    "part": "noun",
    "pron": "",
    "definition": "Classifying or scoring expressed sentiment such as positive, negative, or neutral.",
    "example": "“The team used sentiment analysis while designing, building, or evaluating the AI system.”",
    "origin": "A widely used term in natural language processing and AI practice.",
    "note": "Language tasks differ in whether the model is understanding, transforming, retrieving, or generating text.",
    "related": [
      "natural language processing",
      "language model",
      "transformer"
    ],
    "aliases": [
      "opinion mining"
    ],
    "category": "Natural Language Processing"
  },
  {
    "word": "intent classification",
    "part": "noun",
    "pron": "",
    "definition": "Predicting the goal or intent expressed in a user utterance.",
    "example": "“The team used intent classification while designing, building, or evaluating the AI system.”",
    "origin": "A widely used term in natural language processing and AI practice.",
    "note": "Language tasks differ in whether the model is understanding, transforming, retrieving, or generating text.",
    "related": [
      "natural language processing",
      "language model",
      "transformer"
    ],
    "aliases": [
      "intent detection"
    ],
    "category": "Natural Language Processing"
  },
  {
    "word": "named entity recognition",
    "part": "noun",
    "pron": "",
    "definition": "Identifying spans such as people, organizations, places, dates, products, or other entity types in text.",
    "example": "“The team used named entity recognition while designing, building, or evaluating the AI system.”",
    "origin": "A widely used term in natural language processing and AI practice.",
    "note": "Language tasks differ in whether the model is understanding, transforming, retrieving, or generating text.",
    "related": [
      "natural language processing",
      "language model",
      "transformer"
    ],
    "aliases": [
      "ner"
    ],
    "category": "Natural Language Processing"
  },
  {
    "word": "entity linking",
    "part": "noun",
    "pron": "",
    "definition": "Connecting an entity mention in text to a canonical entity in a knowledge base.",
    "example": "“The team used entity linking while designing, building, or evaluating the AI system.”",
    "origin": "A widely used term in natural language processing and AI practice.",
    "note": "Language tasks differ in whether the model is understanding, transforming, retrieving, or generating text.",
    "related": [
      "natural language processing",
      "language model",
      "transformer"
    ],
    "aliases": [
      "entity disambiguation"
    ],
    "category": "Natural Language Processing"
  },
  {
    "word": "relation extraction",
    "part": "noun",
    "pron": "",
    "definition": "Identifying semantic relationships between entities or concepts mentioned in text.",
    "example": "“The team used relation extraction while designing, building, or evaluating the AI system.”",
    "origin": "A widely used term in natural language processing and AI practice.",
    "note": "Language tasks differ in whether the model is understanding, transforming, retrieving, or generating text.",
    "related": [
      "natural language processing",
      "language model",
      "transformer"
    ],
    "aliases": [],
    "category": "Natural Language Processing"
  },
  {
    "word": "information extraction",
    "part": "noun",
    "pron": "",
    "definition": "Converting unstructured text into structured facts, entities, relations, events, or fields.",
    "example": "“The team used information extraction while designing, building, or evaluating the AI system.”",
    "origin": "A widely used term in natural language processing and AI practice.",
    "note": "Language tasks differ in whether the model is understanding, transforming, retrieving, or generating text.",
    "related": [
      "natural language processing",
      "language model",
      "transformer"
    ],
    "aliases": [
      "ie"
    ],
    "category": "Natural Language Processing"
  },
  {
    "word": "coreference resolution",
    "part": "noun",
    "pron": "",
    "definition": "Determining when different expressions in text refer to the same entity or concept.",
    "example": "“The team used coreference resolution while designing, building, or evaluating the AI system.”",
    "origin": "A widely used term in natural language processing and AI practice.",
    "note": "Language tasks differ in whether the model is understanding, transforming, retrieving, or generating text.",
    "related": [
      "natural language processing",
      "language model",
      "transformer"
    ],
    "aliases": [
      "coreference"
    ],
    "category": "Natural Language Processing"
  },
  {
    "word": "part-of-speech tagging",
    "part": "noun",
    "pron": "",
    "definition": "Assigning grammatical categories such as noun, verb, or adjective to tokens.",
    "example": "“The team used part-of-speech tagging while designing, building, or evaluating the AI system.”",
    "origin": "A widely used term in natural language processing and AI practice.",
    "note": "Language tasks differ in whether the model is understanding, transforming, retrieving, or generating text.",
    "related": [
      "natural language processing",
      "language model",
      "transformer"
    ],
    "aliases": [
      "pos tagging"
    ],
    "category": "Natural Language Processing"
  },
  {
    "word": "dependency parsing",
    "part": "noun",
    "pron": "",
    "definition": "Analyzing grammatical dependency relationships between words in a sentence.",
    "example": "“The team used dependency parsing while designing, building, or evaluating the AI system.”",
    "origin": "A widely used term in natural language processing and AI practice.",
    "note": "Language tasks differ in whether the model is understanding, transforming, retrieving, or generating text.",
    "related": [
      "natural language processing",
      "language model",
      "transformer"
    ],
    "aliases": [],
    "category": "Natural Language Processing"
  },
  {
    "word": "constituency parsing",
    "part": "noun",
    "pron": "",
    "definition": "Analyzing a sentence as nested grammatical phrases or constituents.",
    "example": "“The team used constituency parsing while designing, building, or evaluating the AI system.”",
    "origin": "A widely used term in natural language processing and AI practice.",
    "note": "Language tasks differ in whether the model is understanding, transforming, retrieving, or generating text.",
    "related": [
      "natural language processing",
      "language model",
      "transformer"
    ],
    "aliases": [],
    "category": "Natural Language Processing"
  },
  {
    "word": "lemmatization",
    "part": "noun",
    "pron": "",
    "definition": "Reducing inflected words to a canonical dictionary form such as mapping “running” to “run.”",
    "example": "“The team used lemmatization while designing, building, or evaluating the AI system.”",
    "origin": "A widely used term in natural language processing and AI practice.",
    "note": "Language tasks differ in whether the model is understanding, transforming, retrieving, or generating text.",
    "related": [
      "natural language processing",
      "language model",
      "transformer"
    ],
    "aliases": [
      "lemmatising"
    ],
    "category": "Natural Language Processing"
  },
  {
    "word": "stemming",
    "part": "noun",
    "pron": "",
    "definition": "Reducing words to rough roots by rule-based affix removal, often without producing valid dictionary forms.",
    "example": "“The team used stemming while designing, building, or evaluating the AI system.”",
    "origin": "A widely used term in natural language processing and AI practice.",
    "note": "Language tasks differ in whether the model is understanding, transforming, retrieving, or generating text.",
    "related": [
      "natural language processing",
      "language model",
      "transformer"
    ],
    "aliases": [],
    "category": "Natural Language Processing"
  },
  {
    "word": "stop word",
    "part": "noun",
    "pron": "",
    "definition": "A very common word sometimes removed or downweighted in traditional text-processing pipelines.",
    "example": "“The team used stop word while designing, building, or evaluating the AI system.”",
    "origin": "A widely used term in natural language processing and AI practice.",
    "note": "Language tasks differ in whether the model is understanding, transforming, retrieving, or generating text.",
    "related": [
      "natural language processing",
      "language model",
      "transformer"
    ],
    "aliases": [
      "stopword"
    ],
    "category": "Natural Language Processing"
  },
  {
    "word": "n-gram",
    "part": "noun",
    "pron": "",
    "definition": "A contiguous sequence of n tokens, characters, or other units used in language modeling and text analysis.",
    "example": "“The team used n-gram while designing, building, or evaluating the AI system.”",
    "origin": "A widely used term in natural language processing and AI practice.",
    "note": "Language tasks differ in whether the model is understanding, transforming, retrieving, or generating text.",
    "related": [
      "natural language processing",
      "language model",
      "transformer"
    ],
    "aliases": [
      "ngram"
    ],
    "category": "Natural Language Processing"
  },
  {
    "word": "topic modeling",
    "part": "noun",
    "pron": "",
    "definition": "Discovering recurring latent themes or topic distributions in a collection of documents.",
    "example": "“The team used topic modeling while designing, building, or evaluating the AI system.”",
    "origin": "A widely used term in natural language processing and AI practice.",
    "note": "Language tasks differ in whether the model is understanding, transforming, retrieving, or generating text.",
    "related": [
      "natural language processing",
      "language model",
      "transformer"
    ],
    "aliases": [],
    "category": "Natural Language Processing"
  },
  {
    "word": "semantic parsing",
    "part": "noun",
    "pron": "",
    "definition": "Mapping natural language into a structured meaning representation, logical form, query, or executable program.",
    "example": "“The team used semantic parsing while designing, building, or evaluating the AI system.”",
    "origin": "A widely used term in natural language processing and AI practice.",
    "note": "Language tasks differ in whether the model is understanding, transforming, retrieving, or generating text.",
    "related": [
      "natural language processing",
      "language model",
      "transformer"
    ],
    "aliases": [],
    "category": "Natural Language Processing"
  },
  {
    "word": "slot filling",
    "part": "noun",
    "pron": "",
    "definition": "Extracting task-specific fields from an utterance, commonly paired with intent classification.",
    "example": "“The team used slot filling while designing, building, or evaluating the AI system.”",
    "origin": "A widely used term in natural language processing and AI practice.",
    "note": "Language tasks differ in whether the model is understanding, transforming, retrieving, or generating text.",
    "related": [
      "natural language processing",
      "language model",
      "transformer"
    ],
    "aliases": [],
    "category": "Natural Language Processing"
  },
  {
    "word": "text embedding",
    "part": "noun",
    "pron": "",
    "definition": "An embedding representation of text designed for similarity, retrieval, clustering, or downstream modeling.",
    "example": "“The team used text embedding while designing, building, or evaluating the AI system.”",
    "origin": "A widely used term in natural language processing and AI practice.",
    "note": "Language tasks differ in whether the model is understanding, transforming, retrieving, or generating text.",
    "related": [
      "natural language processing",
      "language model",
      "transformer"
    ],
    "aliases": [
      "sentence embedding"
    ],
    "category": "Natural Language Processing"
  },
  {
    "word": "sentence embedding",
    "part": "noun",
    "pron": "",
    "definition": "A fixed-size vector representation intended to capture the meaning of a sentence or passage.",
    "example": "“The team used sentence embedding while designing, building, or evaluating the AI system.”",
    "origin": "A widely used term in natural language processing and AI practice.",
    "note": "Language tasks differ in whether the model is understanding, transforming, retrieving, or generating text.",
    "related": [
      "natural language processing",
      "language model",
      "transformer"
    ],
    "aliases": [
      "text embedding"
    ],
    "category": "Natural Language Processing"
  },
  {
    "word": "cross-lingual",
    "part": "noun",
    "pron": "",
    "definition": "Describing models or methods that transfer knowledge or representations across multiple languages.",
    "example": "“The team used cross-lingual while designing, building, or evaluating the AI system.”",
    "origin": "A widely used term in natural language processing and AI practice.",
    "note": "Language tasks differ in whether the model is understanding, transforming, retrieving, or generating text.",
    "related": [
      "natural language processing",
      "language model",
      "transformer"
    ],
    "aliases": [
      "multilingual transfer"
    ],
    "category": "Natural Language Processing"
  },
  {
    "word": "multilingual model",
    "part": "noun",
    "pron": "",
    "definition": "A model trained to understand or generate more than one human language.",
    "example": "“The team used multilingual model while designing, building, or evaluating the AI system.”",
    "origin": "A widely used term in natural language processing and AI practice.",
    "note": "Language tasks differ in whether the model is understanding, transforming, retrieving, or generating text.",
    "related": [
      "natural language processing",
      "language model",
      "transformer"
    ],
    "aliases": [],
    "category": "Natural Language Processing"
  },
  {
    "word": "robotics",
    "part": "noun",
    "pron": "",
    "definition": "The field of designing machines that sense, plan, and act in the physical world.",
    "example": "“The team used robotics while designing, building, or evaluating the AI system.”",
    "origin": "A widely used term in embodied ai & robotics and AI practice.",
    "note": "Embodied systems must connect perception and reasoning to actions that obey physical dynamics and safety constraints.",
    "related": [
      "embodied AI",
      "robotics",
      "world model"
    ],
    "aliases": [],
    "category": "Embodied AI & Robotics"
  },
  {
    "word": "embodied AI",
    "part": "noun",
    "pron": "",
    "definition": "AI that learns or acts through a body, robot, simulated embodiment, or physical environment.",
    "example": "“The team used embodied AI while designing, building, or evaluating the AI system.”",
    "origin": "A widely used term in embodied ai & robotics and AI practice.",
    "note": "Embodied systems must connect perception and reasoning to actions that obey physical dynamics and safety constraints.",
    "related": [
      "embodied AI",
      "robotics",
      "world model"
    ],
    "aliases": [
      "embodied intelligence"
    ],
    "category": "Embodied AI & Robotics"
  },
  {
    "word": "embodied agent",
    "part": "noun",
    "pron": "",
    "definition": "An agent whose actions affect a physical or simulated environment through a body or actuator.",
    "example": "“The team used embodied agent while designing, building, or evaluating the AI system.”",
    "origin": "A widely used term in embodied ai & robotics and AI practice.",
    "note": "Embodied systems must connect perception and reasoning to actions that obey physical dynamics and safety constraints.",
    "related": [
      "embodied AI",
      "robotics",
      "world model"
    ],
    "aliases": [],
    "category": "Embodied AI & Robotics"
  },
  {
    "word": "vision-language-action model",
    "part": "noun",
    "pron": "",
    "definition": "A multimodal model that maps visual observations and language instructions to actions, especially in robotics.",
    "example": "“The team used vision-language-action model while designing, building, or evaluating the AI system.”",
    "origin": "A widely used term in embodied ai & robotics and AI practice.",
    "note": "Embodied systems must connect perception and reasoning to actions that obey physical dynamics and safety constraints.",
    "related": [
      "embodied AI",
      "robotics",
      "world model"
    ],
    "aliases": [
      "vla",
      "vision language action",
      "vla model",
      "vision-language-action"
    ],
    "category": "Embodied AI & Robotics"
  },
  {
    "word": "robot policy",
    "part": "noun",
    "pron": "",
    "definition": "A learned or programmed mapping from robot observations and goals to actions.",
    "example": "“The team used robot policy while designing, building, or evaluating the AI system.”",
    "origin": "A widely used term in embodied ai & robotics and AI practice.",
    "note": "Embodied systems must connect perception and reasoning to actions that obey physical dynamics and safety constraints.",
    "related": [
      "embodied AI",
      "robotics",
      "world model"
    ],
    "aliases": [
      "robot control policy"
    ],
    "category": "Embodied AI & Robotics"
  },
  {
    "word": "robot learning",
    "part": "noun",
    "pron": "",
    "definition": "Using machine learning to acquire perception, control, manipulation, or planning capabilities for robots.",
    "example": "“The team used robot learning while designing, building, or evaluating the AI system.”",
    "origin": "A widely used term in embodied ai & robotics and AI practice.",
    "note": "Embodied systems must connect perception and reasoning to actions that obey physical dynamics and safety constraints.",
    "related": [
      "embodied AI",
      "robotics",
      "world model"
    ],
    "aliases": [],
    "category": "Embodied AI & Robotics"
  },
  {
    "word": "imitation learning",
    "part": "noun",
    "pron": "",
    "definition": "Learning a policy from demonstrations of desired behavior rather than only from rewards.",
    "example": "“The team used imitation learning while designing, building, or evaluating the AI system.”",
    "origin": "A widely used term in embodied ai & robotics and AI practice.",
    "note": "Embodied systems must connect perception and reasoning to actions that obey physical dynamics and safety constraints.",
    "related": [
      "embodied AI",
      "robotics",
      "world model"
    ],
    "aliases": [
      "learning from demonstration"
    ],
    "category": "Embodied AI & Robotics"
  },
  {
    "word": "behavior cloning",
    "part": "noun",
    "pron": "",
    "definition": "A form of imitation learning that trains a policy to predict demonstrated actions from observed states.",
    "example": "“The team used behavior cloning while designing, building, or evaluating the AI system.”",
    "origin": "A widely used term in embodied ai & robotics and AI practice.",
    "note": "Embodied systems must connect perception and reasoning to actions that obey physical dynamics and safety constraints.",
    "related": [
      "embodied AI",
      "robotics",
      "world model"
    ],
    "aliases": [
      "bc"
    ],
    "category": "Embodied AI & Robotics"
  },
  {
    "word": "inverse reinforcement learning",
    "part": "noun",
    "pron": "",
    "definition": "Inferring a reward function from observed expert behavior.",
    "example": "“The team used inverse reinforcement learning while designing, building, or evaluating the AI system.”",
    "origin": "A widely used term in embodied ai & robotics and AI practice.",
    "note": "Embodied systems must connect perception and reasoning to actions that obey physical dynamics and safety constraints.",
    "related": [
      "embodied AI",
      "robotics",
      "world model"
    ],
    "aliases": [
      "irl"
    ],
    "category": "Embodied AI & Robotics"
  },
  {
    "word": "motion planning",
    "part": "noun",
    "pron": "",
    "definition": "Computing a collision-free or goal-directed sequence of robot configurations or movements.",
    "example": "“The team used motion planning while designing, building, or evaluating the AI system.”",
    "origin": "A widely used term in embodied ai & robotics and AI practice.",
    "note": "Embodied systems must connect perception and reasoning to actions that obey physical dynamics and safety constraints.",
    "related": [
      "embodied AI",
      "robotics",
      "world model"
    ],
    "aliases": [
      "path planning"
    ],
    "category": "Embodied AI & Robotics"
  },
  {
    "word": "path planning",
    "part": "noun",
    "pron": "",
    "definition": "Finding a route through a space from a start state to a goal while respecting constraints or obstacles.",
    "example": "“The team used path planning while designing, building, or evaluating the AI system.”",
    "origin": "A widely used term in embodied ai & robotics and AI practice.",
    "note": "Embodied systems must connect perception and reasoning to actions that obey physical dynamics and safety constraints.",
    "related": [
      "embodied AI",
      "robotics",
      "world model"
    ],
    "aliases": [],
    "category": "Embodied AI & Robotics"
  },
  {
    "word": "trajectory",
    "part": "noun",
    "pron": "",
    "definition": "A time-ordered sequence of states, positions, actions, or controls followed by an agent or robot.",
    "example": "“The team used trajectory while designing, building, or evaluating the AI system.”",
    "origin": "A widely used term in embodied ai & robotics and AI practice.",
    "note": "Embodied systems must connect perception and reasoning to actions that obey physical dynamics and safety constraints.",
    "related": [
      "embodied AI",
      "robotics",
      "world model"
    ],
    "aliases": [],
    "category": "Embodied AI & Robotics"
  },
  {
    "word": "trajectory optimization",
    "part": "noun",
    "pron": "",
    "definition": "Optimizing a robot or agent trajectory according to dynamics, constraints, and an objective.",
    "example": "“The team used trajectory optimization while designing, building, or evaluating the AI system.”",
    "origin": "A widely used term in embodied ai & robotics and AI practice.",
    "note": "Embodied systems must connect perception and reasoning to actions that obey physical dynamics and safety constraints.",
    "related": [
      "embodied AI",
      "robotics",
      "world model"
    ],
    "aliases": [],
    "category": "Embodied AI & Robotics"
  },
  {
    "word": "control policy",
    "part": "noun",
    "pron": "",
    "definition": "A rule or model that maps observations or states to control commands.",
    "example": "“The team used control policy while designing, building, or evaluating the AI system.”",
    "origin": "A widely used term in embodied ai & robotics and AI practice.",
    "note": "Embodied systems must connect perception and reasoning to actions that obey physical dynamics and safety constraints.",
    "related": [
      "embodied AI",
      "robotics",
      "world model"
    ],
    "aliases": [
      "controller"
    ],
    "category": "Embodied AI & Robotics"
  },
  {
    "word": "model predictive control",
    "part": "noun",
    "pron": "",
    "definition": "A control method that repeatedly optimizes future actions over a moving horizon using a system model.",
    "example": "“The team used model predictive control while designing, building, or evaluating the AI system.”",
    "origin": "A widely used term in embodied ai & robotics and AI practice.",
    "note": "Embodied systems must connect perception and reasoning to actions that obey physical dynamics and safety constraints.",
    "related": [
      "embodied AI",
      "robotics",
      "world model"
    ],
    "aliases": [
      "mpc"
    ],
    "category": "Embodied AI & Robotics"
  },
  {
    "word": "inverse kinematics",
    "part": "noun",
    "pron": "",
    "definition": "Computing joint configurations needed to place a robot end effector at a desired pose.",
    "example": "“The team used inverse kinematics while designing, building, or evaluating the AI system.”",
    "origin": "A widely used term in embodied ai & robotics and AI practice.",
    "note": "Embodied systems must connect perception and reasoning to actions that obey physical dynamics and safety constraints.",
    "related": [
      "embodied AI",
      "robotics",
      "world model"
    ],
    "aliases": [
      "ik"
    ],
    "category": "Embodied AI & Robotics"
  },
  {
    "word": "forward kinematics",
    "part": "noun",
    "pron": "",
    "definition": "Computing the pose of a robot link or end effector from joint values.",
    "example": "“The team used forward kinematics while designing, building, or evaluating the AI system.”",
    "origin": "A widely used term in embodied ai & robotics and AI practice.",
    "note": "Embodied systems must connect perception and reasoning to actions that obey physical dynamics and safety constraints.",
    "related": [
      "embodied AI",
      "robotics",
      "world model"
    ],
    "aliases": [
      "fk"
    ],
    "category": "Embodied AI & Robotics"
  },
  {
    "word": "sim-to-real",
    "part": "noun",
    "pron": "",
    "definition": "Transferring policies or models learned in simulation to real-world hardware.",
    "example": "“The team used sim-to-real while designing, building, or evaluating the AI system.”",
    "origin": "A widely used term in embodied ai & robotics and AI practice.",
    "note": "Embodied systems must connect perception and reasoning to actions that obey physical dynamics and safety constraints.",
    "related": [
      "embodied AI",
      "robotics",
      "world model"
    ],
    "aliases": [
      "simulation to reality"
    ],
    "category": "Embodied AI & Robotics"
  },
  {
    "word": "domain randomization",
    "part": "noun",
    "pron": "",
    "definition": "Varying simulation conditions during training so a policy becomes robust enough to transfer to the real world.",
    "example": "“The team used domain randomization while designing, building, or evaluating the AI system.”",
    "origin": "A widely used term in embodied ai & robotics and AI practice.",
    "note": "Embodied systems must connect perception and reasoning to actions that obey physical dynamics and safety constraints.",
    "related": [
      "embodied AI",
      "robotics",
      "world model"
    ],
    "aliases": [],
    "category": "Embodied AI & Robotics"
  },
  {
    "word": "digital twin",
    "part": "noun",
    "pron": "",
    "definition": "A digital representation of a physical system used for monitoring, simulation, prediction, or control.",
    "example": "“The team used digital twin while designing, building, or evaluating the AI system.”",
    "origin": "A widely used term in embodied ai & robotics and AI practice.",
    "note": "Embodied systems must connect perception and reasoning to actions that obey physical dynamics and safety constraints.",
    "related": [
      "embodied AI",
      "robotics",
      "world model"
    ],
    "aliases": [],
    "category": "Embodied AI & Robotics"
  },
  {
    "word": "SLAM",
    "part": "noun",
    "pron": "",
    "definition": "Simultaneous localization and mapping; estimating an agent’s position while building a map of an unknown environment.",
    "example": "“The team used SLAM while designing, building, or evaluating the AI system.”",
    "origin": "A widely used term in embodied ai & robotics and AI practice.",
    "note": "Embodied systems must connect perception and reasoning to actions that obey physical dynamics and safety constraints.",
    "related": [
      "embodied AI",
      "robotics",
      "world model"
    ],
    "aliases": [
      "simultaneous localization and mapping"
    ],
    "category": "Embodied AI & Robotics"
  },
  {
    "word": "localization",
    "part": "noun",
    "pron": "",
    "definition": "Estimating a robot, device, or agent’s position and orientation in an environment.",
    "example": "“The team used localization while designing, building, or evaluating the AI system.”",
    "origin": "A widely used term in embodied ai & robotics and AI practice.",
    "note": "Embodied systems must connect perception and reasoning to actions that obey physical dynamics and safety constraints.",
    "related": [
      "embodied AI",
      "robotics",
      "world model"
    ],
    "aliases": [],
    "category": "Embodied AI & Robotics"
  },
  {
    "word": "mapping",
    "part": "noun",
    "pron": "",
    "definition": "Building a representation of an environment from sensor observations.",
    "example": "“The team used mapping while designing, building, or evaluating the AI system.”",
    "origin": "A widely used term in embodied ai & robotics and AI practice.",
    "note": "Embodied systems must connect perception and reasoning to actions that obey physical dynamics and safety constraints.",
    "related": [
      "embodied AI",
      "robotics",
      "world model"
    ],
    "aliases": [],
    "category": "Embodied AI & Robotics"
  },
  {
    "word": "sensor fusion",
    "part": "noun",
    "pron": "",
    "definition": "Combining information from multiple sensors to obtain a more reliable estimate than any one sensor alone.",
    "example": "“The team used sensor fusion while designing, building, or evaluating the AI system.”",
    "origin": "A widely used term in embodied ai & robotics and AI practice.",
    "note": "Embodied systems must connect perception and reasoning to actions that obey physical dynamics and safety constraints.",
    "related": [
      "embodied AI",
      "robotics",
      "world model"
    ],
    "aliases": [],
    "category": "Embodied AI & Robotics"
  },
  {
    "word": "lidar",
    "part": "noun",
    "pron": "",
    "definition": "Light detection and ranging; a sensor that measures distances with laser pulses and is widely used in robotics and autonomy.",
    "example": "“The team used lidar while designing, building, or evaluating the AI system.”",
    "origin": "A widely used term in embodied ai & robotics and AI practice.",
    "note": "Embodied systems must connect perception and reasoning to actions that obey physical dynamics and safety constraints.",
    "related": [
      "embodied AI",
      "robotics",
      "world model"
    ],
    "aliases": [
      "lidar"
    ],
    "category": "Embodied AI & Robotics"
  },
  {
    "word": "manipulation",
    "part": "noun",
    "pron": "",
    "definition": "Robotic interaction with objects through grasping, pushing, placing, tool use, or other physical actions.",
    "example": "“The team used manipulation while designing, building, or evaluating the AI system.”",
    "origin": "A widely used term in embodied ai & robotics and AI practice.",
    "note": "Embodied systems must connect perception and reasoning to actions that obey physical dynamics and safety constraints.",
    "related": [
      "embodied AI",
      "robotics",
      "world model"
    ],
    "aliases": [
      "robot manipulation"
    ],
    "category": "Embodied AI & Robotics"
  },
  {
    "word": "grasp planning",
    "part": "noun",
    "pron": "",
    "definition": "Selecting how a robot should position and close a gripper to pick up an object.",
    "example": "“The team used grasp planning while designing, building, or evaluating the AI system.”",
    "origin": "A widely used term in embodied ai & robotics and AI practice.",
    "note": "Embodied systems must connect perception and reasoning to actions that obey physical dynamics and safety constraints.",
    "related": [
      "embodied AI",
      "robotics",
      "world model"
    ],
    "aliases": [],
    "category": "Embodied AI & Robotics"
  },
  {
    "word": "navigation",
    "part": "noun",
    "pron": "",
    "definition": "Planning and executing movement through an environment while avoiding obstacles and reaching goals.",
    "example": "“The team used navigation while designing, building, or evaluating the AI system.”",
    "origin": "A widely used term in embodied ai & robotics and AI practice.",
    "note": "Embodied systems must connect perception and reasoning to actions that obey physical dynamics and safety constraints.",
    "related": [
      "embodied AI",
      "robotics",
      "world model"
    ],
    "aliases": [
      "robot navigation"
    ],
    "category": "Embodied AI & Robotics"
  },
  {
    "word": "autonomous system",
    "part": "noun",
    "pron": "",
    "definition": "A system capable of sensing, deciding, and acting with limited direct human control.",
    "example": "“The team used autonomous system while designing, building, or evaluating the AI system.”",
    "origin": "A widely used term in embodied ai & robotics and AI practice.",
    "note": "Embodied systems must connect perception and reasoning to actions that obey physical dynamics and safety constraints.",
    "related": [
      "embodied AI",
      "robotics",
      "world model"
    ],
    "aliases": [],
    "category": "Embodied AI & Robotics"
  },
  {
    "word": "autonomous vehicle",
    "part": "noun",
    "pron": "",
    "definition": "A vehicle that uses sensors, perception, planning, and control systems to drive with reduced human input.",
    "example": "“The team used autonomous vehicle while designing, building, or evaluating the AI system.”",
    "origin": "A widely used term in embodied ai & robotics and AI practice.",
    "note": "Embodied systems must connect perception and reasoning to actions that obey physical dynamics and safety constraints.",
    "related": [
      "embodied AI",
      "robotics",
      "world model"
    ],
    "aliases": [
      "self-driving car"
    ],
    "category": "Embodied AI & Robotics"
  },
  {
    "word": "perception stack",
    "part": "noun",
    "pron": "",
    "definition": "The collection of models and algorithms that transform sensor data into usable estimates of objects, lanes, depth, motion, or scene state.",
    "example": "“The team used perception stack while designing, building, or evaluating the AI system.”",
    "origin": "A widely used term in embodied ai & robotics and AI practice.",
    "note": "Embodied systems must connect perception and reasoning to actions that obey physical dynamics and safety constraints.",
    "related": [
      "embodied AI",
      "robotics",
      "world model"
    ],
    "aliases": [],
    "category": "Embodied AI & Robotics"
  },
  {
    "word": "occupancy grid",
    "part": "noun",
    "pron": "",
    "definition": "A map representation dividing space into cells with probabilities or labels indicating whether each cell is occupied.",
    "example": "“The team used occupancy grid while designing, building, or evaluating the AI system.”",
    "origin": "A widely used term in embodied ai & robotics and AI practice.",
    "note": "Embodied systems must connect perception and reasoning to actions that obey physical dynamics and safety constraints.",
    "related": [
      "embodied AI",
      "robotics",
      "world model"
    ],
    "aliases": [],
    "category": "Embodied AI & Robotics"
  },
  {
    "word": "world coordinate frame",
    "part": "noun",
    "pron": "",
    "definition": "A reference coordinate system used to express positions and orientations consistently in robotics and vision.",
    "example": "“The team used world coordinate frame while designing, building, or evaluating the AI system.”",
    "origin": "A widely used term in embodied ai & robotics and AI practice.",
    "note": "Embodied systems must connect perception and reasoning to actions that obey physical dynamics and safety constraints.",
    "related": [
      "embodied AI",
      "robotics",
      "world model"
    ],
    "aliases": [],
    "category": "Embodied AI & Robotics"
  },
  {
    "word": "end effector",
    "part": "noun",
    "pron": "",
    "definition": "The tool or mechanism at the end of a robot arm that interacts with the environment.",
    "example": "“The team used end effector while designing, building, or evaluating the AI system.”",
    "origin": "A widely used term in embodied ai & robotics and AI practice.",
    "note": "Embodied systems must connect perception and reasoning to actions that obey physical dynamics and safety constraints.",
    "related": [
      "embodied AI",
      "robotics",
      "world model"
    ],
    "aliases": [],
    "category": "Embodied AI & Robotics"
  },
  {
    "word": "actuator",
    "part": "noun",
    "pron": "",
    "definition": "A component that converts control commands into physical motion or force.",
    "example": "“The team used actuator while designing, building, or evaluating the AI system.”",
    "origin": "A widely used term in embodied ai & robotics and AI practice.",
    "note": "Embodied systems must connect perception and reasoning to actions that obey physical dynamics and safety constraints.",
    "related": [
      "embodied AI",
      "robotics",
      "world model"
    ],
    "aliases": [],
    "category": "Embodied AI & Robotics"
  },
  {
    "word": "3D reconstruction",
    "part": "noun",
    "pron": "",
    "definition": "Recovering three-dimensional scene geometry or structure from images, video, depth, or other sensor data.",
    "example": "“The team used 3D reconstruction while designing, building, or evaluating the AI system.”",
    "origin": "A widely used term in vision, image & video and AI practice.",
    "note": "Visual AI spans recognition, grounding, geometry, temporal understanding, editing, and generation.",
    "related": [
      "computer vision",
      "vision-language model",
      "multimodal model"
    ],
    "aliases": [],
    "category": "Vision, Image & Video"
  },
  {
    "word": "novel view synthesis",
    "part": "noun",
    "pron": "",
    "definition": "Generating how a scene would look from a camera viewpoint not present in the original observations.",
    "example": "“The team used novel view synthesis while designing, building, or evaluating the AI system.”",
    "origin": "A widely used term in vision, image & video and AI practice.",
    "note": "Visual AI spans recognition, grounding, geometry, temporal understanding, editing, and generation.",
    "related": [
      "computer vision",
      "vision-language model",
      "multimodal model"
    ],
    "aliases": [],
    "category": "Vision, Image & Video"
  },
  {
    "word": "point cloud",
    "part": "noun",
    "pron": "",
    "definition": "A set of 3D points representing surfaces or geometry, often produced by depth sensors or reconstruction pipelines.",
    "example": "“The team used point cloud while designing, building, or evaluating the AI system.”",
    "origin": "A widely used term in vision, image & video and AI practice.",
    "note": "Visual AI spans recognition, grounding, geometry, temporal understanding, editing, and generation.",
    "related": [
      "computer vision",
      "vision-language model",
      "multimodal model"
    ],
    "aliases": [],
    "category": "Vision, Image & Video"
  },
  {
    "word": "bounding box",
    "part": "noun",
    "pron": "",
    "definition": "A rectangular region used to represent the location and extent of an object in an image or video.",
    "example": "“The team used bounding box while designing, building, or evaluating the AI system.”",
    "origin": "A widely used term in vision, image & video and AI practice.",
    "note": "Visual AI spans recognition, grounding, geometry, temporal understanding, editing, and generation.",
    "related": [
      "computer vision",
      "vision-language model",
      "multimodal model"
    ],
    "aliases": [
      "bbox"
    ],
    "category": "Vision, Image & Video"
  },
  {
    "word": "keypoint detection",
    "part": "noun",
    "pron": "",
    "definition": "Predicting important landmark coordinates such as joints, corners, or facial points.",
    "example": "“The team used keypoint detection while designing, building, or evaluating the AI system.”",
    "origin": "A widely used term in vision, image & video and AI practice.",
    "note": "Visual AI spans recognition, grounding, geometry, temporal understanding, editing, and generation.",
    "related": [
      "computer vision",
      "vision-language model",
      "multimodal model"
    ],
    "aliases": [
      "landmark detection"
    ],
    "category": "Vision, Image & Video"
  },
  {
    "word": "tracking",
    "part": "noun",
    "pron": "",
    "definition": "Maintaining the identity and location of objects, people, or features across video frames.",
    "example": "“The team used tracking while designing, building, or evaluating the AI system.”",
    "origin": "A widely used term in vision, image & video and AI practice.",
    "note": "Visual AI spans recognition, grounding, geometry, temporal understanding, editing, and generation.",
    "related": [
      "computer vision",
      "vision-language model",
      "multimodal model"
    ],
    "aliases": [
      "object tracking"
    ],
    "category": "Vision, Image & Video"
  },
  {
    "word": "multi-object tracking",
    "part": "noun",
    "pron": "",
    "definition": "Tracking several object identities simultaneously across video frames.",
    "example": "“The team used multi-object tracking while designing, building, or evaluating the AI system.”",
    "origin": "A widely used term in vision, image & video and AI practice.",
    "note": "Visual AI spans recognition, grounding, geometry, temporal understanding, editing, and generation.",
    "related": [
      "computer vision",
      "vision-language model",
      "multimodal model"
    ],
    "aliases": [
      "mot"
    ],
    "category": "Vision, Image & Video"
  },
  {
    "word": "optical flow estimation",
    "part": "noun",
    "pron": "",
    "definition": "Predicting apparent motion vectors between image frames.",
    "example": "“The team used optical flow estimation while designing, building, or evaluating the AI system.”",
    "origin": "A widely used term in vision, image & video and AI practice.",
    "note": "Visual AI spans recognition, grounding, geometry, temporal understanding, editing, and generation.",
    "related": [
      "computer vision",
      "vision-language model",
      "multimodal model"
    ],
    "aliases": [],
    "category": "Vision, Image & Video"
  },
  {
    "word": "visual grounding",
    "part": "noun",
    "pron": "",
    "definition": "Linking language phrases to specific regions, objects, or coordinates in visual content.",
    "example": "“The team used visual grounding while designing, building, or evaluating the AI system.”",
    "origin": "A widely used term in vision, image & video and AI practice.",
    "note": "Visual AI spans recognition, grounding, geometry, temporal understanding, editing, and generation.",
    "related": [
      "computer vision",
      "vision-language model",
      "multimodal model"
    ],
    "aliases": [
      "phrase grounding"
    ],
    "category": "Vision, Image & Video"
  },
  {
    "word": "image-text retrieval",
    "part": "noun",
    "pron": "",
    "definition": "Retrieving images from text queries or text from image queries using shared multimodal representations.",
    "example": "“The team used image-text retrieval while designing, building, or evaluating the AI system.”",
    "origin": "A widely used term in vision, image & video and AI practice.",
    "note": "Visual AI spans recognition, grounding, geometry, temporal understanding, editing, and generation.",
    "related": [
      "computer vision",
      "vision-language model",
      "multimodal model"
    ],
    "aliases": [
      "cross-modal retrieval"
    ],
    "category": "Vision, Image & Video"
  },
  {
    "word": "video understanding",
    "part": "noun",
    "pron": "",
    "definition": "Analyzing actions, events, objects, temporal structure, or meaning in video.",
    "example": "“The team used video understanding while designing, building, or evaluating the AI system.”",
    "origin": "A widely used term in vision, image & video and AI practice.",
    "note": "Visual AI spans recognition, grounding, geometry, temporal understanding, editing, and generation.",
    "related": [
      "computer vision",
      "vision-language model",
      "multimodal model"
    ],
    "aliases": [],
    "category": "Vision, Image & Video"
  },
  {
    "word": "action recognition",
    "part": "noun",
    "pron": "",
    "definition": "Classifying actions or activities shown in video or motion data.",
    "example": "“The team used action recognition while designing, building, or evaluating the AI system.”",
    "origin": "A widely used term in vision, image & video and AI practice.",
    "note": "Visual AI spans recognition, grounding, geometry, temporal understanding, editing, and generation.",
    "related": [
      "computer vision",
      "vision-language model",
      "multimodal model"
    ],
    "aliases": [],
    "category": "Vision, Image & Video"
  },
  {
    "word": "temporal grounding",
    "part": "noun",
    "pron": "",
    "definition": "Locating the time interval in a video or sequence that corresponds to a language description or event.",
    "example": "“The team used temporal grounding while designing, building, or evaluating the AI system.”",
    "origin": "A widely used term in vision, image & video and AI practice.",
    "note": "Visual AI spans recognition, grounding, geometry, temporal understanding, editing, and generation.",
    "related": [
      "computer vision",
      "vision-language model",
      "multimodal model"
    ],
    "aliases": [],
    "category": "Vision, Image & Video"
  },
  {
    "word": "XAI",
    "part": "noun",
    "pron": "",
    "definition": "Explainable AI; methods and practices intended to make model predictions or behavior more understandable to people.",
    "example": "“The team used XAI while designing, building, or evaluating the AI system.”",
    "origin": "A widely used term in interpretability and AI practice.",
    "note": "This term is useful when comparing model methods, system behavior, or the evidence behind an AI result.",
    "related": [
      "explainability",
      "interpretability",
      "feature attribution"
    ],
    "aliases": [
      "explainable ai"
    ],
    "category": "Interpretability"
  },
  {
    "word": "XGBoost",
    "part": "noun",
    "pron": "",
    "definition": "Extreme Gradient Boosting; a highly optimized gradient-boosted decision-tree library and algorithm family widely used for tabular machine learning.",
    "example": "“The team used XGBoost while designing, building, or evaluating the AI system.”",
    "origin": "A widely used term in reinforcement learning & classical ml and AI practice.",
    "note": "This term is useful when comparing model methods, system behavior, or the evidence behind an AI result.",
    "related": [
      "gradient boosting",
      "decision tree",
      "ensemble"
    ],
    "aliases": [
      "extreme gradient boosting"
    ],
    "category": "Reinforcement Learning & Classical ML"
  },
  {
    "word": "YOLO",
    "part": "noun",
    "pron": "/ˈyō-lō/",
    "definition": "An opt-in high-autonomy mode in an agentic coding interface that lets a coding agent carry out a delegated task without pausing for per-step user approval, including reading and editing files, running commands, invoking tools, and iterating on results.",
    "example": "“I handed the issue to the coding agent in YOLO mode, then reviewed the diff and test results when it finished.”",
    "origin": "Developer slang from “You Only Live Once,” repurposed by agentic coding tools for auto-approval and full-autonomy execution settings.",
    "note": "YOLO changes the approval policy, not the agent’s judgment or correctness; depending on the tool, it may still stop for missing credentials, safety restrictions, or unresolved ambiguity. Use a trusted or isolated workspace and review the diff, commands, tests, and generated artifacts afterward; in computer vision, YOLO can also mean “You Only Look Once.”",
    "related": [
      "agentic",
      "coding agent",
      "tool calling",
      "approval gate",
      "sandbox"
    ],
    "aliases": [
      "yolo mode",
      "you only live once",
      "auto approve",
      "full auto",
      "no approval mode",
      "unattended coding"
    ],
    "category": "AI Product, Coding & Culture"
  }
];

export const specialModes: SpecialModes = {
  'vibe coding': {
    plain: 'You describe what you want, let an AI write much of the code, then steer by testing and judging the result.',
    technical: 'An AI-assisted development workflow in which natural-language intent drives code generation while a human closes the loop through inspection, testing, and iterative correction.',
    vibe: 'You say “make it feel like this,” the model writes a lot of the code, and your job becomes taste, direction, and knowing when the vibes are lying.'
  },
  'hallucination': {
    plain: 'The AI gives you an answer that sounds right but is actually made up or wrong.',
    technical: 'An unsupported model output whose fluent surface form is not grounded in reliable evidence or the supplied context.',
    vibe: 'The model says it with terrifying confidence. You copy it. The package does not exist.'
  },
  'RAG': {
    plain: 'The AI looks up relevant documents first, then uses them to answer.',
    technical: 'A retrieval-augmented generation architecture that injects retrieved external context into the model input before generation.',
    vibe: 'Give the model the receipts before asking it to talk.'
  },
  'agentic': {
    plain: 'The AI does several steps and takes actions instead of only answering once.',
    technical: 'A goal-directed system pattern in which a model selects intermediate actions, invokes tools, observes results, and continues across a multi-step loop.',
    vibe: 'It stops being a chatbot and starts touching things.'
  },
  'YOLO': {
    plain: 'You give the coding agent a task, and it keeps working—editing files, running commands, and checking its work—without stopping to ask about every action.',
    technical: 'An execution and approval policy that automatically permits an agent’s tool calls and coding actions after the initial task handoff, removing interactive confirmation gates while leaving the agent’s capabilities, workspace boundaries, and correctness unchanged.',
    vibe: 'Hand it the ticket, leave it the keyboard, and come back to inspect the diff—preferably in a disposable workspace.'
  },
  'context window': {
    plain: 'How much information the model can keep in front of it at one time.',
    technical: 'The bounded sequence of tokens and other modalities available to the model for conditioning its next output.',
    vibe: 'The model’s desk. Put too much junk on it and the useful page gets buried.'
  },
  'tool calling': {
    plain: 'The AI asks another program or service to do something it cannot do by itself.',
    technical: 'Structured model invocation of externally implemented functions, APIs, databases, browsers, or actions through a defined tool schema.',
    vibe: 'The model gets hands.'
  },
  'embedding': {
    plain: 'A set of numbers that represents meaning so similar things end up near each other.',
    technical: 'A dense vector representation learned or produced so semantic similarity can be approximated geometrically.',
    vibe: 'Meaning, converted into coordinates.'
  },
  'eval': {
    plain: 'A repeatable test that tells you whether your AI change actually made things better.',
    technical: 'A controlled evaluation case or suite measuring system behavior against explicit task, quality, regression, or safety criteria.',
    vibe: 'The thing that stops “it feels smarter now” from becoming your entire QA process.'
  }
};

export const crossRefs: Record<string, CrossRefInfo> = {
  'vibe coding': { compare: ['workflow'], confused: ['prompt'] },
  'RAG': { compare: ['retrieval', 'grounding'], confused: ['vector database'] },
  'hallucination': { compare: ['grounding'], confused: ['confidence'] },
  'agentic': { compare: ['workflow', 'tool calling'], confused: ['reasoning'] },
  'YOLO': { compare: ['agentic', 'coding agent'], confused: ['vibe coding', 'human in the loop'] },
  'chain of thought': { compare: ['reasoning'], confused: ['trace'] },
  'embedding': { compare: ['vector database'], confused: ['token'] },
  'eval': { compare: ['benchmark'], confused: ['verification'] },
  'context window': { compare: ['token'], confused: ['memory'] },
  'prompt': { compare: ['system prompt'], confused: ['context window'] },
  'tool calling': { compare: ['agentic'], confused: ['workflow'] }
};

export const timeline: TimelineItem[] = [
  {
    year: '2017',
    title: 'Transformer',
    body: 'Attention-based architectures reset the vocabulary of modern language models.',
    term: 'model'
  },
  {
    year: '2020',
    title: 'Few-shot + RAG',
    body: 'Prompting by examples and retrieval-augmented generation become durable building blocks.',
    term: 'few-shot'
  },
  {
    year: '2022',
    title: 'Chat becomes mainstream',
    body: 'Prompt, token, hallucination, and alignment move from research language into everyday product language.',
    term: 'prompt'
  },
  {
    year: '2023',
    title: 'Tool use',
    body: 'Function calling, multimodal systems, and agent-like workflows become practical product patterns.',
    term: 'tool calling'
  },
  {
    year: '2024',
    title: 'Grounded agents',
    body: 'Retrieval, evals, workflows, and tools increasingly get designed as one system.',
    term: 'grounding'
  },
  {
    year: '2025 →',
    title: 'Vibe coding',
    body: 'Natural-language software direction becomes a recognizable development style and cultural term.',
    term: 'vibe coding'
  }
];

export const sortedTerms: Term[] = [...terms].sort((a, b) => a.word.localeCompare(b.word));
export const termsByWord: Record<string, Term> = Object.fromEntries(
  sortedTerms.map((t) => [t.word.toLowerCase(), t])
);

const aliasTargets = new Map<string, Term | null>();
for (const term of sortedTerms) {
  for (const alias of term.aliases) {
    const key = alias.trim().toLowerCase();
    if (!key) continue;
    const existing = aliasTargets.get(key);
    if (existing && existing !== term) {
      aliasTargets.set(key, null);
    } else if (!aliasTargets.has(key)) {
      aliasTargets.set(key, term);
    }
  }
}

export const termsByAlias: Record<string, Term> = Object.fromEntries(
  [...aliasTargets.entries()].filter((entry): entry is [string, Term] => Boolean(entry[1]))
);

export function resolveTerm(word: string): Term | null {
  const key = word.trim().toLowerCase();
  return termsByWord[key] || termsByAlias[key] || null;
}
