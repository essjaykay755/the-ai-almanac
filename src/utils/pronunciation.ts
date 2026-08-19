/**
 * Authentic dictionary phonetic transcription dictionary and rule engine for AI Almanac.
 * Provides IPA / dictionary pronunciation guides for all AI & computing terms.
 */

const KNOWN_PRONUNCIATIONS: Record<string, string> = {
  // Common AI Acronyms & Names
  'rag': '/ræɡ/',
  'llm': '/ˌɛl.ɛlˈɛm/',
  'lora': '/ˈlɔː.rɑː/',
  'bert': '/bɜːrt/',
  'gpt': '/ˌdʒiː.piːˈtiː/',
  'dpo': '/ˌdiː.piːˈoʊ/',
  'ppo': '/ˌpiː.piːˈoʊ/',
  'rlhf': '/ˌɑːr.ɛl.eɪtʃˈɛf/',
  'moe': '/ˌɛm.oʊˈiː/',
  'clip': '/klɪp/',
  'mcp': '/ˌɛm.siːˈpiː/',
  'cuda': '/ˈkuː.də/',
  'vae': '/ˌviː.eɪˈiː/',
  'gan': '/ɡæn/',
  'api': '/ˌeɪ.piːˈaɪ/',
  'sdk': '/ˌɛs.diːˈkeɪ/',
  'json': '/ˈdʒeɪ.sɑːn/',
  'json-rpc': '/ˌdʒeɪ.sɑːn ˌɑːr.piːˈsiː/',
  'nlp': '/ˌɛn.ɛlˈpiː/',
  'cv': '/ˌsiːˈviː/',
  'agi': '/ˌeɪ.dʒiːˈaɪ/',
  'asi': '/ˌeɪ.ɛsˈaɪ/',
  'cot': '/ˌsiː.oʊˈtiː/',
  'tot': '/ˌtiː.oʊˈtiː/',
  'react': '/riˈækt/',
  'eval': '/ˈiː.væl/',
  'evals': '/ˈiː.vælz/',
  'vibe coding': '/ˈvaɪb ˈkoʊ.dɪŋ/',
  'hallucination': '/həˌluː.səˈneɪ.ʃən/',
  'agentic': '/eɪˈdʒɛn.tɪk/',
  'transformer': '/trænsˈfɔːr.mər/',
  'embedding': '/ɪmˈbɛd.ɪŋ/',
  'attention mechanism': '/əˈtɛn.ʃən ˈmɛk.ə.nɪ.zəm/',
  'self-attention': '/sɛlf əˈtɛn.ʃən/',
  'cross-attention': '/krɔːs əˈtɛn.ʃən/',
  'backpropagation': '/ˌbæk.prɑː.pəˈɡeɪ.ʃən/',
  'fine-tuning': '/ˈfaɪn ˈtuː.nɪŋ/',
  'mixture of experts': '/ˈmɪks.tʃər ʌv ˈɛk.spɜːrts/',
  'temperature': '/ˈtɛm.prə.tʃər/',
  'tokenization': '/ˌtoʊ.kən.aɪˈzeɪ.ʃən/',
  'diffusion model': '/dɪˈfjuː.ʒən ˈmɑː.dəl/',
  'reinforcement learning': '/ˌriː.ɪnˈfɔːrs.mənt ˈlɜːr.nɪŋ/',
  'chain of thought': '/tʃeɪn ʌv θɔːt/',
  'zero-shot': '/ˈzɪə.roʊ ʃɑːt/',
  'few-shot': '/ˈfjuː ʃɑːt/',
  'quantization': '/ˌkwɑːn.təˈzeɪ.ʃən/',
  'latent space': '/ˈleɪ.tənt speɪs/',
  'multimodal': '/ˌmʌl.tiˈmoʊ.dəl/',
  'benchmark': '/ˈbɛntʃ.mɑːrk/',
  'grounding': '/ˈɡraʊn.dɪŋ/',
  'guardrail': '/ˈɡɑːrd.reɪl/',
  'guardrails': '/ˈɡɑːrd.reɪlz/',
  'inference': '/ˈɪn.fər.əns/',
  'loss function': '/lɔːs ˈfʌŋk.ʃən/',
  'neural network': '/ˈnjʊə.rəl ˈnɛt.wɜːrk/',
  'parameter': '/pəˈræm.ɪ.tər/',
  'parameters': '/pəˈræm.ɪ.tərz/',
  'perplexity': '/pərˈplɛk.sə.ti/',
  'prompt engineering': '/prɑːmpt ˌɛn.dʒɪˈnɪə.rɪŋ/',
  'vector database': '/ˈvɛk.tər ˈdeɪ.tə.beɪs/',
  'weights and biases': '/weɪts ænd ˈbaɪ.ə.sɪz/',
  'alignment': '/əˈlaɪn.mənt/',
  'context window': '/ˈkɑːn.tɛkst ˈwɪn.doʊ/',
  'tool calling': '/tuːl ˈkɔː.lɪŋ/',
  'function calling': '/ˈfʌŋk.ʃən ˈkɔː.lɪŋ/',
  'speculative decoding': '/ˈspɛk.jə.lə.tɪv diːˈkoʊ.dɪŋ/',
  'stochastic gradient descent': '/stəˈkæs.tɪk ˈɡreɪ.di.ənt dɪˈsɛnt/',
  'overfitting': '/ˌoʊ.vərˈfɪt.ɪŋ/',
  'underfitting': '/ˌʌn.dərˈfɪt.ɪŋ/',
  'regularization': '/ˌrɛɡ.jə.lə.raɪˈzeɪ.ʃən/',
  'hyperparameter': '/ˌhaɪ.pər.pəˈræm.ɪ.tər/',
  'activation function': '/ˌæk.tɪˈveɪ.ʃən ˈfʌŋk.ʃən/',
  'convolutional neural network': '/ˌkɑːn.vəˈluː.ʃən.əl ˈnjʊə.rəl ˈnɛt.wɜːrk/',
  'recurrent neural network': '/rɪˈkɜːr.ənt ˈnjʊə.rəl ˈnɛt.wɜːrk/',
  'feedforward': '/ˈfiːd.fɔːr.wərd/',
  'supervised learning': '/ˈsuː.pər.vaɪzd ˈlɜːr.nɪŋ/',
  'unsupervised learning': '/ˌʌnˈsuː.pər.vaɪzd ˈlɜːr.nɪŋ/',
  'semi-supervised learning': '/ˌsɛm.i ˈsuː.pər.vaɪzd ˈlɜːr.nɪŋ/',
  'transfer learning': '/ˈtræns.fɜːr ˈlɜːr.nɪŋ/',
  'contrastive learning': '/kənˈtræs.tɪv ˈlɜːr.nɪŋ/',
  'autoencoder': '/ˌɔː.toʊ.ɛnˈkoʊ.dər/',
  'variational autoencoder': '/ˌvɛə.riˈeɪ.ʃən.əl ˌɔː.toʊ.ɛnˈkoʊ.dər/',
  'generative adversarial network': '/ˈdʒɛn.ər.ə.tɪv ˌæd.vərˈsɛə.ri.əl ˈnɛt.wɜːrk/',
  'gradient clipping': '/ˈɡreɪ.di.ənt ˈklɪp.ɪŋ/',
  'gradient accumulation': '/ˈɡreɪ.di.ənt əˌkjuː.mjəˈleɪ.ʃən/',
  'learning rate': '/ˈlɜːr.nɪŋ reɪt/',
  'learning rate schedule': '/ˈlɜːr.nɪŋ reɪt ˈskɛdʒ.uːl/',
  'cosine annealing': '/ˈkoʊ.saɪn əˈniː.lɪŋ/',
  'warmup steps': '/ˈwɔːrm.ʌp stɛps/',
  'batch size': '/bætʃ saɪz/',
  'epoch': '/ˈɛp.ək/',
  'epochs': '/ˈɛp.əks/',
  'weight decay': '/weɪt dɪˈkeɪ/',
  'dropout': '/ˈdrɑːp.aʊt/',
  'layer normalization': '/ˈleɪ.ər ˌnɔːr.mə.laɪˈzeɪ.ʃən/',
  'batch normalization': '/bætʃ ˌnɔːr.mə.laɪˈzeɪ.ʃən/',
  'root mean square error': '/ruːt miːn skwɛər ˈɛr.ər/',
  'cross-entropy loss': '/krɔːs ˈɛn.trə.pi lɔːs/',
  'softmax': '/ˈsɑːft.mæks/',
  'sigmoid': '/ˈsɪɡ.mɔɪd/',
  'gelu': '/ˈdʒɛl.uː/',
  'relu': '/ˈrɛl.uː/',
  'silu': '/ˈsaɪ.luː/',
  'swiglu': '/ˈswɪɡ.luː/',
  'rotary positional embedding': '/ˈroʊ.tə.ri pəˈzɪʃ.ən.əl ɪmˈbɛd.ɪŋ/',
  'rope': '/roʊp/',
  'flashattention': '/flæʃ əˈtɛn.ʃən/',
  'kv cache': '/ˌkeɪˈviː kæʃ/',
  'pagedattention': '/peɪdʒd əˈtɛn.ʃən/',
  'top-k sampling': '/tɑːp keɪ ˈsæm.plɪŋ/',
  'top-p sampling': '/tɑːp piː ˈsæm.plɪŋ/',
  'nucleus sampling': '/ˈnjuː.kli.əs ˈsæm.plɪŋ/',
  'repetition penalty': '/ˌrɛp.əˈtɪʃ.ən ˈpɛn.əl.ti/',
  'frequency penalty': '/ˈfriː.kwən.si ˈpɛn.əl.ti/',
  'presence penalty': '/ˈprɛz.əns ˈpɛn.əl.ti/',
  'system prompt': '/ˈsɪs.təm prɑːmpt/',
  'user prompt': '/ˈjuː.zər prɑːmpt/',
  'assistant message': '/əˈsɪs.tənt ˈmɛs.ɪdʒ/',
  'scratchpad': '/ˈskrætʃ.pæd/',
  'tree of thoughts': '/triː ʌv θɔːts/',
  'graph of thoughts': '/ɡræf ʌv θɔːts/',
  'direct preference optimization': '/dɪˈrɛkt ˈprɛf.ər.əns ˌɑːp.tə.məˈzeɪ.ʃən/',
  'proximal policy optimization': '/ˈprɑːk.sə.məl ˈpɑː.lə.si ˌɑːp.tə.məˈzeɪ.ʃən/',
  'reward model': '/rɪˈwɔːrd ˈmɑː.dəl/',
  'constitutional ai': '/ˌkɑːn.stəˈtuː.ʃən.əl ˌeɪˈaɪ/',
  'red teaming': '/rɛd ˈtiːm.ɪŋ/',
  'jailbreak': '/ˈdʒeɪl.breɪk/',
  'prompt injection': '/prɑːmpt ɪnˈdʒɛk.ʃən/',
  'indirect prompt injection': '/ˌɪn.dəˈrɛkt prɑːmpt ɪnˈdʒɛk.ʃən/',
  'sandboxing': '/ˈsænd.bɑːk.sɪŋ/',
  'determinism': '/dɪˈtɜːr.mɪ.nɪ.zəm/',
  'synthetic data': '/sɪnˈθɛt.ɪk ˈdeɪ.tə/',
  'distillation': '/ˌdɪs.təˈleɪ.ʃən/',
  'knowledge distillation': '/ˈnɑː.lɪdʒ ˌdɪs.təˈleɪ.ʃən/',
  'quantized model': '/ˈkwɑːn.taɪzd ˈmɑː.dəl/',
  'gguf': '/ˌdʒiː.dʒiː.juːˈɛf/',
  'awq': '/ˌeɪ.dʌb.əl.juːˈkjuː/',
  'gptq': '/ˌdʒiː.piː.tiːˈkjuː/',
  'bitsandbytes': '/bɪts ænd baɪts/',
  'tensor parallelism': '/ˈtɛn.sər ˈpær.ə.lɛl.ɪ.zəm/',
  'pipeline parallelism': '/ˈpaɪp.laɪn ˈpær.ə.lɛl.ɪ.zəm/',
  'data parallelism': '/ˈdeɪ.tə ˈpær.ə.lɛl.ɪ.zəm/',
  'expert parallelism': '/ˈɛk.spɜːrt ˈpær.ə.lɛl.ɪ.zəm/',
  'zero redundancy optimizer': '/ˈzɪə.roʊ rɪˈdʌn.dən.si ˈɑːp.tə.maɪ.zər/',
  'deepspeed': '/ˈdiːp.spiːd/',
  'megatron-lm': '/ˈmɛɡ.ə.trɑːn ˌɛlˈɛm/',
  'vllm': '/ˌviː.ɛl.ɛlˈɛm/',
  'ollama': '/oʊˈlɑː.mə/',
  'llama.cpp': '/ˈlɑː.mə sɪː piː piː/',
  'hugging face': '/ˈhʌɡ.ɪŋ feɪs/',
  'langchain': '/ˈlæŋ.tʃeɪn/',
  'langgraph': '/ˈlæŋ.ɡræf/',
  'llamaindex': '/ˈlɑː.mə ˈɪn.dɛks/',
  'autogen': '/ˈɔː.toʊ.dʒɛn/',
  'crewai': '/kruː ˌeɪˈaɪ/',
  'semantic kernel': '/sɪˈmæn.tɪk ˈkɜːr.nəl/',
  'chromadb': '/ˈkroʊ.mə ˌdiːˈbiː/',
  'pinecone': '/ˈpaɪn.koʊn/',
  'weaviate': '/ˈwiː.vi.eɪt/',
  'qdrant': '/ˈkjuː.drænt/',
  'milvus': '/ˈmɪl.vəs/',
  'faiss': '/feɪs/',
  'hnsw': '/ˌeɪtʃ.ɛn.ɛsˈdʌb.əl.juː/',
  'ann': '/ˌeɪ.ɛnˈɛn/',
  'knn': '/ˌkeɪ.ɛnˈɛn/',
  'bm25': '/ˌbiː.ɛm ˌtwɛn.tiˈfaɪv/',
  'hybrid search': '/ˈhaɪ.brɪd sɜːrtʃ/',
  'reciprocal rank fusion': '/rɪˈsɪp.rə.kəl ræŋk ˈfjuː.ʒən/',
  'cross-encoder': '/krɔːs ɛnˈkoʊ.dər/',
  'bi-encoder': '/baɪ ɛnˈkoʊ.dər/',
  'reranker': '/riːˈræŋ.kər/',
  'colbert': '/koʊlˈbɛər/',
  'splade': '/spleɪd/',
  'bge': '/ˌbiː.dʒiːˈiː/',
  'e5': '/ˌiːˈfaɪv/',
  'nomic': '/ˈnoʊ.mɪk/',
  'voyage': '/ˈvɔɪ.ɪdʒ/',
  'cohere': '/koʊˈhɪər/',
  'anthropic': '/ænˈθrɑː.pɪk/',
  'claude': '/klɔːd/',
  'openai': '/ˌoʊ.pən.eɪˈaɪ/',
  'chatgpt': '/tʃæt ˌdʒiː.piːˈtiː/',
  'gemini': '/ˈdʒɛm.ə.naɪ/',
  'deepseek': '/ˈdiːp.siːk/',
  'qwen': '/kwɛn/',
  'mistral': '/ˈmɪs.trəl/',
  'llama': '/ˈlɑː.mə/',
  'gemma': '/ˈdʒɛm.ə/',
  'phi': '/faɪ/',
  'cohere command': '/koʊˈhɪər kəˈmænd/',
  'perplexity ai': '/pərˈplɛk.sə.ti ˌeɪˈaɪ/'
};

// Common word transcription map for compounding
const WORD_MAP: Record<string, string> = {
  'active': 'ˈæk.tɪv',
  'agent': 'ˈeɪ.dʒənt',
  'agents': 'ˈeɪ.dʒənts',
  'alignment': 'əˈlaɪn.mənt',
  'analysis': 'əˈnæl.ə.sɪs',
  'analytics': 'ˌæn.əˈlɪt.ɪks',
  'architecture': 'ˈɑːr.kɪ.tɛk.tʃər',
  'attention': 'əˈtɛn.ʃən',
  'augmented': 'ɔːɡˈmɛn.tɪd',
  'automatic': 'ˌɔː.təˈmæt.ɪk',
  'automation': 'ˌɔː.təˈmeɪ.ʃən',
  'autonomous': 'ɔːˈtɑː.nə.məs',
  'backprop': 'ˈbæk.prɑːp',
  'bayesian': 'ˈbeɪ.zi.ən',
  'benchmark': 'ˈbɛntʃ.mɑːrk',
  'bias': 'ˈbaɪ.əs',
  'biases': 'ˈbaɪ.ə.sɪz',
  'binary': 'ˈbaɪ.nə.ri',
  'buffer': 'ˈbʌf.ər',
  'cache': 'kæʃ',
  'caching': 'ˈkæʃ.ɪŋ',
  'calibration': 'ˌkæl.əˈbreɪ.ʃən',
  'capability': 'ˌkeɪ.pəˈbɪl.ə.ti',
  'chain': 'tʃeɪn',
  'classification': 'ˌklæs.ə.fəˈkeɪ.ʃən',
  'classifier': 'ˈklæs.ə.faɪ.ər',
  'cluster': 'ˈklʌs.tər',
  'clustering': 'ˈklʌs.tər.ɪŋ',
  'code': 'koʊd',
  'coder': 'ˈkoʊ.dər',
  'coding': 'ˈkoʊ.dɪŋ',
  'cognitive': 'ˈkɑːɡ.nə.tɪv',
  'compute': 'kəmˈpjuːt',
  'context': 'ˈkɑːn.tɛkst',
  'control': 'kənˈtroʊl',
  'convolution': 'ˌkɑːn.vəˈluː.ʃən',
  'corpus': 'ˈkɔːr.pəs',
  'cosine': 'ˈkoʊ.saɪn',
  'cost': 'kɔːst',
  'critic': 'ˈkrɪt.ɪk',
  'data': 'ˈdeɪ.tə',
  'dataset': 'ˈdeɪ.tə.sɛt',
  'decision': 'dɪˈsɪʒ.ən',
  'decoder': 'diːˈkoʊ.dər',
  'decoding': 'diːˈkoʊ.dɪŋ',
  'decomposition': 'ˌdiː.kɑːm.pəˈzɪʃ.ən',
  'dense': 'dɛns',
  'density': 'ˈdɛn.sə.ti',
  'detection': 'dɪˈtɛk.ʃən',
  'diffusion': 'dɪˈfjuː.ʒən',
  'dimension': 'daɪˈmɛn.ʃən',
  'dimensionality': 'daɪˌmɛn.ʃənˈæl.ə.ti',
  'discriminator': 'dɪˈskrɪm.ə.neɪ.tər',
  'distillation': 'ˌdɪs.təˈleɪ.ʃən',
  'distributed': 'dɪˈstrɪb.jə.tɪd',
  'divergence': 'daɪˈvɜːr.dʒəns',
  'domain': 'doʊˈmeɪn',
  'drift': 'drɪft',
  'dropout': 'ˈdrɑːp.aʊt',
  'dynamic': 'daɪˈnæm.ɪk',
  'edge': 'ɛdʒ',
  'efficiency': 'ɪˈfɪʃ.ən.si',
  'element': 'ˈɛl.ə.mənt',
  'embedding': 'ɪmˈbɛd.ɪŋ',
  'embeddings': 'ɪmˈbɛd.ɪŋz',
  'encoder': 'ɛnˈkoʊ.dər',
  'encoding': 'ɛnˈkoʊ.dɪŋ',
  'ensemble': 'ɑːnˈsɑːm.bəl',
  'entropy': 'ˈɛn.trə.pi',
  'epoch': 'ˈɛp.ək',
  'error': 'ˈɛr.ər',
  'eval': 'ˈiː.væl',
  'evaluation': 'ɪˌvæl.juˈeɪ.ʃən',
  'example': 'ɪɡˈzæm.pəl',
  'expert': 'ˈɛk.spɜːrt',
  'experts': 'ˈɛk.spɜːrts',
  'explanation': 'ˌɛk.spləˈneɪ.ʃən',
  'feature': 'ˈfiː.tʃər',
  'features': 'ˈfiː.tʃərz',
  'feedback': 'ˈfiːd.bæk',
  'few-shot': 'ˈfjuː ʃɑːt',
  'filter': 'ˈfɪl.tər',
  'fine-tuning': 'ˈfaɪn ˈtuː.nɪŋ',
  'flow': 'floʊ',
  'format': 'ˈfɔːr.mæt',
  'foundation': 'faʊnˈdeɪ.ʃən',
  'function': 'ˈfʌŋk.ʃən',
  'functional': 'ˈfʌŋk.ʃən.əl',
  'game': 'ɡeɪm',
  'gating': 'ˈɡeɪ.tɪŋ',
  'generation': 'ˌdʒɛn.əˈreɪ.ʃən',
  'generative': 'ˈdʒɛn.ər.ə.tɪv',
  'gradient': 'ˈɡreɪ.di.ənt',
  'graph': 'ɡræf',
  'grounding': 'ˈɡraʊn.dɪŋ',
  'guardrail': 'ˈɡɑːrd.reɪl',
  'guidance': 'ˈɡaɪ.dəns',
  'hallucination': 'həˌluː.səˈneɪ.ʃən',
  'heuristic': 'hjʊˈrɪs.tɪk',
  'hidden': 'ˈhɪd.ən',
  'hierarchical': 'ˌhaɪ.əˈrɑːr.kɪ.kəl',
  'hyperparameter': 'ˌhaɪ.pər.pəˈræm.ɪ.tər',
  'hypothesis': 'haɪˈpɑː.θə.sɪs',
  'image': 'ˈɪm.ɪdʒ',
  'index': 'ˈɪn.dɛks',
  'indexing': 'ˈɪn.dɛk.sɪŋ',
  'inference': 'ˈɪn.fər.əns',
  'information': 'ˌɪn.fərˈmeɪ.ʃən',
  'injection': 'ɪnˈdʒɛk.ʃən',
  'instruction': 'ɪnˈstrʌk.ʃən',
  'intelligence': 'ɪnˈtɛl.ə.dʒəns',
  'interaction': 'ˌɪn.tərˈæk.ʃən',
  'interpolation': 'ɪnˌtɜːr.pəˈleɪ.ʃən',
  'interpretability': 'ɪnˌtɜːr.prə.təˈbɪl.ə.ti',
  'iteration': 'ˌɪt.əˈreɪ.ʃən',
  'jailbreak': 'ˈdʒeɪl.breɪk',
  'kernel': 'ˈkɜːr.nəl',
  'knowledge': 'ˈnɑː.lɪdʒ',
  'language': 'ˈlæŋ.ɡwɪdʒ',
  'latent': 'ˈleɪ.tənt',
  'layer': 'ˈleɪ.ər',
  'learning': 'ˈlɜːr.nɪŋ',
  'likelihood': 'ˈlaɪk.li.hʊd',
  'linear': 'ˈlɪn.i.ər',
  'loss': 'lɔːs',
  'machine': 'məˈʃiːn',
  'mask': 'mæsk',
  'masked': 'mæskt',
  'matrix': 'ˈmeɪ.trɪks',
  'mechanism': 'ˈmɛk.ə.nɪ.zəm',
  'memory': 'ˈmɛm.ə.ri',
  'metric': 'ˈmɛt.rɪk',
  'metrics': 'ˈmɛt.rɪks',
  'mining': 'ˈmaɪ.nɪŋ',
  'mixture': 'ˈmɪks.tʃər',
  'modal': 'ˈmoʊ.dəl',
  'modality': 'moʊˈdæl.ə.ti',
  'model': 'ˈmɑː.dəl',
  'modeling': 'ˈmɑː.dəl.ɪŋ',
  'multimodal': 'ˌmʌl.tiˈmoʊ.dəl',
  'natural': 'ˈnætʃ.ər.əl',
  'network': 'ˈnɛt.wɜːrk',
  'neural': 'ˈnjʊə.rəl',
  'neuron': 'ˈnjʊə.rɑːn',
  'node': 'noʊd',
  'noise': 'nɔɪz',
  'normalization': 'ˌnɔːr.mə.laɪˈzeɪ.ʃən',
  'objective': 'əbˈdʒɛk.tɪv',
  'observation': 'ˌɑːb.zərˈveɪ.ʃən',
  'optimization': 'ˌɑːp.tə.məˈzeɪ.ʃən',
  'optimizer': 'ˈɑːp.tə.maɪ.zər',
  'output': 'ˈaʊt.pʊt',
  'overfitting': 'ˌoʊ.vərˈfɪt.ɪŋ',
  'parameter': 'pəˈræm.ɪ.tər',
  'pattern': 'ˈpæt.ərn',
  'penalty': 'ˈpɛn.əl.ti',
  'perception': 'pərˈsɛp.ʃən',
  'performance': 'pərˈfɔːr.məns',
  'pipeline': 'ˈpaɪp.laɪn',
  'policy': 'ˈpɑː.lə.si',
  'pooling': 'ˈpuː.lɪŋ',
  'positional': 'pəˈzɪʃ.ən.əl',
  'precision': 'prɪˈsɪʒ.ən',
  'prediction': 'prɪˈdɪk.ʃən',
  'preference': 'ˈprɛf.ər.əns',
  'pretraining': 'ˌpriːˈtreɪ.nɪŋ',
  'probability': 'ˌprɑː.bəˈbɪl.ə.ti',
  'process': 'ˈprɑː.sɛs',
  'prompt': 'prɑːmpt',
  'prompting': 'ˈprɑːmp.tɪŋ',
  'pruning': 'ˈpruː.nɪŋ',
  'quantization': 'ˌkwɑːn.təˈzeɪ.ʃən',
  'query': 'ˈkwɪə.ri',
  'random': 'ˈræn.dəm',
  'ranking': 'ˈræŋ.kɪŋ',
  'reasoning': 'ˈriː.zən.ɪŋ',
  'recall': 'ˈriː.kɔːl',
  'recognition': 'ˌrɛk.əɡˈnɪʃ.ən',
  'recurrent': 'rɪˈkɜːr.ənt',
  'regression': 'rɪˈɡrɛʃ.ən',
  'regularization': 'ˌrɛɡ.jə.lə.raɪˈzeɪ.ʃən',
  'reinforcement': 'ˌriː.ɪnˈfɔːrs.mənt',
  'representation': 'ˌrɛp.rɪ.zɛnˈteɪ.ʃən',
  'reranking': 'riːˈræŋ.kɪŋ',
  'residual': 'rɪˈzɪdʒ.u.əl',
  'retrieval': 'rɪˈtriː.vəl',
  'reward': 'rɪˈwɔːrd',
  'robustness': 'roʊˈbʌst.nəs',
  'sampling': 'ˈsæm.plɪŋ',
  'scaling': 'ˈskeɪ.lɪŋ',
  'score': 'skɔːr',
  'search': 'sɜːrtʃ',
  'segmentation': 'ˌsɛɡ.mənˈteɪ.ʃən',
  'semantic': 'sɪˈmæn.tɪk',
  'sequence': 'ˈsiː.kwəns',
  'similarity': 'ˌsɪm.əˈlær.ə.ti',
  'simulation': 'ˌsɪm.jəˈleɪ.ʃən',
  'softmax': 'ˈsɑːft.mæks',
  'sparse': 'spɑːrs',
  'sparsity': 'ˈspɑːr.sə.ti',
  'spatial': 'ˈspeɪ.ʃəl',
  'stability': 'stəˈbɪl.ə.ti',
  'state': 'steɪt',
  'stochastic': 'stəˈkæs.tɪk',
  'structure': 'ˈstrʌk.tʃər',
  'structured': 'ˈstrʌk.tʃərd',
  'supervision': 'ˌsuː.pərˈvɪʒ.ən',
  'supervised': 'ˈsuː.pər.vaɪzd',
  'synthetic': 'sɪnˈθɛt.ɪk',
  'system': 'ˈsɪs.təm',
  'target': 'ˈtɑːr.ɡɪt',
  'temperature': 'ˈtɛm.prə.tʃər',
  'temporal': 'ˈtɛm.pər.əl',
  'tensor': 'ˈtɛn.sər',
  'token': 'ˈtoʊ.kən',
  'tokens': 'ˈtoʊ.kənz',
  'tokenization': 'ˌtoʊ.kən.aɪˈzeɪ.ʃən',
  'tokenizer': 'ˈtoʊ.kən.aɪ.zər',
  'tool': 'tuːl',
  'tools': 'tuːlz',
  'training': 'ˈtreɪ.nɪŋ',
  'trajectory': 'trəˈdʒɛk.tə.ri',
  'transfer': 'ˈtræns.fɜːr',
  'transformation': 'ˌtræns.fərˈmeɪ.ʃən',
  'transformer': 'trænsˈfɔːr.mər',
  'tuning': 'ˈtuː.nɪŋ',
  'uncertainty': 'ʌnˈsɜːr.tən.ti',
  'unsupervised': 'ˌʌnˈsuː.pər.vaɪzd',
  'validation': 'ˌvæl.əˈdeɪ.ʃən',
  'variance': 'ˈvɛə.ri.əns',
  'vector': 'ˈvɛk.tər',
  'vectors': 'ˈvɛk.tərz',
  'vision': 'ˈvɪʒ.ən',
  'visual': 'ˈvɪʒ.u.əl',
  'weight': 'weɪt',
  'weights': 'weɪts',
  'window': 'ˈwɪn.doʊ',
  'zero-shot': 'ˈzɪə.roʊ ʃɑːt'
};

/**
 * Derives a clean, standard phonetic transcription for any headword.
 */
export function getPronunciation(word: string, explicitPron?: string): string {
  if (explicitPron && explicitPron.trim()) {
    return explicitPron.startsWith('/') ? explicitPron : `/${explicitPron}/`;
  }

  const original = word.trim();
  const clean = original.toLowerCase();
  
  // 1. Direct exact lookup
  if (KNOWN_PRONUNCIATIONS[clean]) {
    return KNOWN_PRONUNCIATIONS[clean];
  }

  // 2. Multi-word phrase decomposition
  const words = original.split(/[\s_-]+/);
  if (words.length > 1) {
    const parts = words.map(w => {
      const token = w.toLowerCase();
      if (KNOWN_PRONUNCIATIONS[token]) return KNOWN_PRONUNCIATIONS[token].replace(/\//g, '');
      if (WORD_MAP[token]) return WORD_MAP[token];
      return phoneticallyEstimateWord(w);
    });
    return `/${parts.join(' ')}/`;
  }

  // 3. Single word lookup
  if (WORD_MAP[clean]) {
    return `/${WORD_MAP[clean]}/`;
  }

  // 4. Algorithmic fallback
  return `/${phoneticallyEstimateWord(original)}/`;
}

/**
 * Phonetic syllabification heuristic for unknown technical vocabulary
 */
function phoneticallyEstimateWord(w: string): string {
  if (!w) return '';

  // Handle all-caps acronym spellouts
  if (/^[A-Z0-9]{2,5}$/.test(w)) {
    const letterSounds: Record<string, string> = {
      'a': 'eɪ', 'b': 'biː', 'c': 'siː', 'd': 'diː', 'e': 'iː',
      'f': 'ɛf', 'g': 'dʒiː', 'h': 'eɪtʃ', 'i': 'aɪ', 'j': 'dʒeɪ',
      'k': 'keɪ', 'l': 'ɛl', 'm': 'ɛm', 'n': 'ɛn', 'o': 'oʊ',
      'p': 'piː', 'q': 'kjuː', 'r': 'ɑːr', 's': 'ɛs', 't': 'tiː',
      'u': 'juː', 'v': 'viː', 'w': 'ˈdʌb.əl.juː', 'x': 'ɛks', 'y': 'waɪ', 'z': 'zɛd'
    };
    return w.toLowerCase().split('').map(c => letterSounds[c] || c).join('.');
  }

  let s = w.toLowerCase();

  // Morphological prefix / suffix replacements
  const prefixes = [
    { p: 'auto', r: 'ˈɔː.toʊ.' },
    { p: 'multi', r: 'ˈmʌl.ti.' },
    { p: 'hyper', r: 'ˈhaɪ.pər.' },
    { p: 'super', r: 'ˈsuː.pər.' },
    { p: 'micro', r: 'ˈmaɪ.kroʊ.' },
    { p: 'macro', r: 'ˈmæk.roʊ.' },
    { p: 'pseudo', r: 'ˈsuː.doʊ.' },
    { p: 'cross', r: 'krɔːs.' },
    { p: 'sub', r: 'sʌb.' },
    { p: 'pre', r: 'priː.' },
    { p: 'post', r: 'poʊst.' },
    { p: 're', r: 'riː.' },
    { p: 'un', r: 'ʌn.' },
    { p: 'de', r: 'diː.' },
    { p: 'in', r: 'ɪn.' }
  ];

  let prefixIPA = '';
  for (const { p, r } of prefixes) {
    if (s.startsWith(p) && s.length > p.length + 2) {
      prefixIPA = r;
      s = s.slice(p.length);
      break;
    }
  }

  // Common suffix patterns
  s = s
    .replace(/tion$/, '.ʃən')
    .replace(/sion$/, '.ʒən')
    .replace(/ment$/, '.mənt')
    .replace(/able$/, '.ə.bəl')
    .replace(/ible$/, '.ə.bəl')
    .replace(/ality$/, '.æl.ə.ti')
    .replace(/ility$/, '.ɪl.ə.ti')
    .replace(/ing$/, '.ɪŋ')
    .replace(/ized$/, '.aɪzd')
    .replace(/ize$/, '.aɪz')
    .replace(/ism$/, '.ɪ.zəm')
    .replace(/ist$/, '.ɪst')
    .replace(/ity$/, '.ə.ti')
    .replace(/ness$/, '.nəs')
    .replace(/ence$/, '.əns')
    .replace(/ance$/, '.əns')
    .replace(/ous$/, '.əs')
    .replace(/ive$/, '.ɪv');

  // Simple vowel cluster mapping
  s = s
    .replace(/ph/g, 'f')
    .replace(/th/g, 'θ')
    .replace(/ch/g, 'tʃ')
    .replace(/sh/g, 'ʃ')
    .replace(/ck/g, 'k')
    .replace(/qu/g, 'kw')
    .replace(/ai|ay/g, 'eɪ')
    .replace(/ee|ea/g, 'iː')
    .replace(/oo/g, 'uː')
    .replace(/ou|ow/g, 'aʊ')
    .replace(/oi|oy/g, 'ɔɪ')
    .replace(/ar/g, 'ɑːr')
    .replace(/or/g, 'ɔːr')
    .replace(/er|ir|ur/g, 'ɜːr');

  const combined = (prefixIPA + s).replace(/\.{2,}/g, '.').replace(/^\.|\.$/g, '');
  return combined.startsWith('ˈ') || combined.startsWith('ˌ') ? combined : `ˈ${combined}`;
}
