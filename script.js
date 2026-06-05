document.addEventListener('DOMContentLoaded', () => {
  // Navigation active state highlight on scroll
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (pageYOffset >= (sectionTop - 150)) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href').includes(current)) {
        link.classList.add('active');
      }
    });
  });

  // Chatbot Toggle & Logic
  const chatbotLauncher = document.getElementById('chatbot-launcher');
  const chatbotCard = document.getElementById('chatbot-card');
  const chatCloseBtn = document.getElementById('chat-close-btn');
  const chatForm = document.getElementById('chat-form');
  const chatInput = document.getElementById('chat-input');
  const chatMessages = document.getElementById('chat-messages');

  function resetChat() {
    chatMessages.innerHTML = `
      <div class="message system">
        <div class="message-content">
          Hello! I'm Mohammad's AI assistant. Ask me anything about his experience, skills, certifications, or projects!
        </div>
      </div>
    `;
    chatInput.value = '';
  }

  chatbotLauncher.addEventListener('click', () => {
    chatbotLauncher.classList.toggle('active');
    chatbotCard.classList.toggle('active');
    if (chatbotCard.classList.contains('active')) {
      setTimeout(() => chatInput.focus(), 300);
    } else {
      resetChat();
    }
  });

  chatCloseBtn.addEventListener('click', () => {
    chatbotLauncher.classList.remove('active');
    chatbotCard.classList.remove('active');
    resetChat();
  });

  const qaDatabase = [
    {
      intent: 'contact',
      keywords: ['contact', 'email', 'phone', 'reach', 'number', 'address', 'mail', 'gmail', 'call', 'locate', 'live', 'location', 'where'],
      answer: 'Mohammad Abdelqader lives in Morden, Manitoba, Canada. You can reach him by email at moha.ajori@gmail.com, phone at +1 431 300 3313, or through his LinkedIn profile (https://www.linkedin.com/in/mohammadabdelqader).'
    },
    {
      intent: 'visa',
      keywords: ['visa', 'pr', 'permanent resident', 'work permit', 'sponsorship', 'sponsor', 'eligible', 'canada', 'citizen', 'status', 'allow', 'legal'],
      answer: 'Mohammad is a Canadian Permanent Resident (PR) and is fully eligible to work in Canada immediately without any sponsorship.'
    },
    {
      intent: 'experience_summary',
      keywords: ['experience', 'years', 'how long', 'career', 'background', 'history', 'job', 'work'],
      answer: 'Mohammad has 13+ years of professional experience as a Senior DBA, Exadata Administrator, and Data Engineer. He has worked at National Bank of Kuwait, Realsoft, Al-Khaleej for Computers, and Globitel.'
    },
    {
      intent: 'nbk',
      keywords: ['nbk', 'national bank of kuwait', 'kuwait', 'senior database administrator', 'senior dba', 'data engineer'],
      answer: 'At National Bank of Kuwait (Oct 2020 – March 2026), Mohammad was a Senior DBA & Data Engineer. He designed the Enterprise Data Warehouse (EDW) infrastructure on Exadata X9M/X8M, led Oracle/Exadata patching cycles, designed high-availability RAC/Data Guard systems, improved data pipelines by 40%, and built Grafana/Prometheus database monitoring dashboards.'
    },
    {
      intent: 'realsoft',
      keywords: ['realsoft', 'jordan', 'centralized hive', 'centralized database', 'tabadul', 'al-khwarizmi', 'miyahuna', 'moe', 'ministry of education'],
      answer: 'At Realsoft (Jun 2016 – Sep 2020), Mohammad served as Senior DBA & Data Engineer. He led the migration of a 53 TB EDW from Exadata V2 to X4 with minimal downtime, integrated register-based statistics across six government agencies for the Tabadul project, migrated MSSQL schemas to Oracle for the Al-Khwarizmi project, relocated/patched Exadata machines for the Ministry of Education, and built water meter survey data models for Miyahuna.'
    },
    {
      intent: 'khaleej',
      keywords: ['al-khaleej', 'al khaleej', 'computers', 'saudi arabia', 'failover', 'cluster'],
      answer: 'At Al-Khaleej for Computers in Saudi Arabia (Apr 2013 – Jun 2016), Mohammad was a Senior DBA. He deployed multiple Oracle RAC environments, migrated 8 databases from HP-UX/Linux to Exadata, and built centralized SQL Server failover clusters.'
    },
    {
      intent: 'globitel',
      keywords: ['globitel', 'telecom', 'roam', 'ggdata', 'roaming', 'gsm', 'jquery', 'asp.net', 'java'],
      answer: 'At Globitel (Nov 2008 – Apr 2013), Mohammad worked as a Senior Database & Software Developer. He built admin web applications (using Java, ASP.NET, HTML, jQuery), troubleshooting Oracle/MSSQL performance, and developed automated routines for dynamic telecom/GSM repositories like GGData and Roam Analyze.'
    },
    {
      intent: 'education',
      keywords: ['education', 'university', 'study', 'studied', 'degree', 'bachelor', 'mis', 'management information', 'balqa', 'amman'],
      answer: 'Mohammad holds a Bachelor\'s degree in Management Information Systems (MIS) from Al-Balqa Applied University in Amman, Jordan.'
    },
    {
      intent: 'databases',
      keywords: ['database', 'databases', 'oracle', 'sql server', 'mssql', 'postgres', 'postgresql', 'rac', 'asm', 'rman', 'dataguard'],
      answer: 'Mohammad has extensive experience with databases, particularly Oracle Database (including Oracle RAC, ASM, RMAN, Data Guard), Microsoft SQL Server, and PostgreSQL.'
    },
    {
      intent: 'exadata',
      keywords: ['exadata', 'patching', 'x9m', 'x8m', 'x4', 'v2', 'patch', 'lifecycle'],
      answer: 'Mohammad is a certified Oracle Exadata Expert (OCE). He designed EDW architectures on Exadata X9M/X8M at NBK, led Exadata patch planning/execution, relocated Exadata machines for the Ministry of Education, and migrated a 53 TB warehouse from Exadata V2 to X4-2 at Realsoft.'
    },
    {
      intent: 'cloud',
      keywords: ['cloud', 'aws', 'azure', 'oci', 'amazon', 'microsoft azure', 'solutions architect', 'multi-cloud'],
      answer: 'Mohammad is a Multi-cloud Architect. He holds certifications as an AWS Certified Solutions Architect Associate and Microsoft Azure Data Fundamentals expert, and specializes in multi-cloud database solutions (AWS, Azure, OCI).'
    },
    {
      intent: 'data_engineering',
      keywords: ['data engineering', 'etl', 'python', 'databricks', 'spark', 'kafka', 'snowflake', 'airflow', 'odi', 'talend', 'hive', 'sqoop', 'pipelines', 'pipeline'],
      answer: 'His data engineering stack includes SQL, Python, Databricks, Apache Spark, Apache Kafka, Snowflake, Apache Airflow, Oracle ODI, Talend, Sqoop, and Hive. He improved data pipeline throughput by 40% at NBK.'
    },
    {
      intent: 'certifications',
      keywords: ['certification', 'certifications', 'certified', 'credentials', 'exam', 'oce', 'ocp', 'oca'],
      answer: 'Mohammad holds 11 professional certifications: Oracle Exadata OCE, Oracle Database AI@AWS, Oracle OCP, Oracle 12c Specialist, Oracle Linux Administrator OCA, AWS Solutions Architect Associate, PostgreSQL Essentials v16, Azure Data Fundamentals, Databricks Generative AI, Databricks Spark Developer, and Confluent Data Streaming Engineer.'
    },
    {
      intent: 'projects',
      keywords: ['project', 'projects', 'viva', 'tabadul', 'al-khwarizmi', 'ggdata', 'roam analyze', 'miyahuna', 'education project'],
      answer: 'Key featured projects include: 1) EDW on Exadata at NBK. 2) VIVA Kuwait 53 TB Exadata migration. 3) Roam Analyze telecom dashboard at Globitel. 4) Ministry of Education Exadata patching. 5) Miyahuna water meter surveys. 6) Tabadul statistics integration across 6 government agencies. 7) Al-Khwarizmi MSSQL to Oracle migration.'
    },
    {
      intent: 'resume_download',
      keywords: ['resume', 'download', 'pdf', 'cv', 'get resume', 'copy', 'file'],
      answer: 'You can download Mohammad\'s complete resume PDF directly by clicking the "Download Resume" button in the Quick Links section of this page, or you can contact him directly to request a copy!'
    },
    {
      intent: 'greetings',
      keywords: ['hello', 'hi', 'hey', 'greetings', 'morning', 'evening', 'assistant', 'bot', 'who are you'],
      answer: 'Hello! I am Mohammad\'s AI assistant. Ask me anything about his Oracle DBA skills, Exadata experience, AWS/Azure certifications, projects, education, or how to contact him.'
    }
  ];

  const defaultReply = "I couldn't find that specific information in Mohammad's resume. You can download his full resume using the download button on this page or contact him directly at moha.ajori@gmail.com / +1 431 300 3313 to ask him!";

  function formatTime(date) {
    let hours = date.getHours();
    let minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0'+minutes : minutes;
    return `${hours}:${minutes} ${ampm}`;
  }

  function appendMessage(sender, text) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message', sender);
    
    // Add micro-animation styling class
    messageDiv.style.opacity = '0';
    messageDiv.style.transform = 'translateY(10px)';
    messageDiv.style.transition = 'all 0.3s ease';

    const contentDiv = document.createElement('div');
    contentDiv.classList.add('message-content');
    contentDiv.textContent = text;
    messageDiv.appendChild(contentDiv);

    const timeDiv = document.createElement('div');
    timeDiv.classList.add('message-time');
    timeDiv.textContent = formatTime(new Date());
    messageDiv.appendChild(timeDiv);

    chatMessages.appendChild(messageDiv);
    
    // Trigger animation
    setTimeout(() => {
      messageDiv.style.opacity = '1';
      messageDiv.style.transform = 'translateY(0)';
    }, 50);

    // Scroll to bottom
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  function showTypingIndicator() {
    const indicatorDiv = document.createElement('div');
    indicatorDiv.classList.add('message', 'system', 'typing-indicator');
    
    const contentDiv = document.createElement('div');
    contentDiv.classList.add('message-content');
    contentDiv.style.display = 'flex';
    contentDiv.style.gap = '4px';
    contentDiv.style.alignItems = 'center';
    contentDiv.style.padding = '0.5rem 1rem';
    
    // 3 typing dots
    for (let i = 0; i < 3; i++) {
      const dot = document.createElement('span');
      dot.style.width = '6px';
      dot.style.height = '6px';
      dot.style.backgroundColor = '#667085';
      dot.style.borderRadius = '50%';
      dot.style.display = 'inline-block';
      dot.style.animation = 'typingBounce 1.4s infinite both';
      dot.style.animationDelay = `${i * 0.2}s`;
      contentDiv.appendChild(dot);
    }
    
    // Add keyframes styling inline if not in CSS
    if (!document.getElementById('typing-bounce-style')) {
      const style = document.createElement('style');
      style.id = 'typing-bounce-style';
      style.innerHTML = `
        @keyframes typingBounce {
          0%, 80%, 100% { transform: scale(0); }
          40% { transform: scale(1); }
        }
      `;
      document.head.appendChild(style);
    }

    indicatorDiv.appendChild(contentDiv);
    chatMessages.appendChild(indicatorDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
    return indicatorDiv;
  }

  chatForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const text = chatInput.value.trim();
    if (!text) return;

    appendMessage('user', text);
    chatInput.value = '';

    // Typing delay emulation
    const indicator = showTypingIndicator();

    setTimeout(() => {
      indicator.remove();
      
      // Clean and split query
      const query = text.toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?]/g,"");
      const queryWords = query.split(/\s+/);
      
      let bestMatch = null;
      let highestScore = 0;
      
      for (const item of qaDatabase) {
        let score = 0;
        
        for (const kw of item.keywords) {
          if (kw.includes(" ")) {
            if (query.includes(kw)) {
              score += 3; // weight phrases higher
            }
          } else {
            queryWords.forEach(word => {
              if (word === kw) {
                score += 2; // Exact match
              } else if (word.includes(kw) && kw.length > 3) {
                score += 1; // Contains keyword
              }
            });
          }
        }
        
        if (score > highestScore) {
          highestScore = score;
          bestMatch = item.answer;
        }
      }

      // Minimum score threshold of 2 to verify a valid match
      const replyText = (highestScore >= 2 && bestMatch) ? bestMatch : defaultReply;
      appendMessage('system', replyText);
    }, 1000);
  });
});
