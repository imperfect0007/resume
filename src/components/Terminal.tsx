import { useState, useRef, useEffect, useCallback } from 'react';

interface TerminalProps {
  onOpenApp?: (appId: string) => void;
}

interface Line {
  type: 'input' | 'output';
  text: string;
}

const HELP_TEXT = `Available commands:
  whoami          - Display user identity
  neofetch        - System information
  ls [dir]        - List directory contents
  cat <file>      - Display file contents
  tree skills     - Show skills tree
  git log         - Show experience history
  kubectl get pods- Show projects
  ping <target>   - Test connectivity
  open <app>      - Open application
  echo <text>     - Display text
  date            - Show current date
  uptime          - Show system uptime
  uname -a        - System information
  pwd             - Print working directory
  cd <dir>        - Change directory
  history         - Command history
  clear           - Clear terminal
  sudo <cmd>      - Run as superuser
  help            - Show this help
  exit            - Close terminal`;

const NEOFETCH = `\x1b[green]revanth\x1b[reset]@\x1b[blue]devops\x1b[reset]
──────────────────────
\x1b[blue]OS\x1b[reset]:       RevanthOS 1.0.0
\x1b[blue]Host\x1b[reset]:     RAMA.AI LABS PVT LTD
\x1b[blue]Role\x1b[reset]:     DevOps / Cloud Engineer
\x1b[blue]Location\x1b[reset]: Hyderabad, India
\x1b[blue]Uptime\x1b[reset]:   Since Jul 2025
\x1b[blue]Shell\x1b[reset]:    bash 5.2.15
\x1b[blue]DE\x1b[reset]:       RevanthOS Desktop
\x1b[blue]Skills\x1b[reset]:   AWS, K8s, Docker, Terraform
\x1b[blue]Email\x1b[reset]:    revanthkumars64@gmail.com
\x1b[blue]GitHub\x1b[reset]:   github.com/imperfect0007

█ █ █ █ █ █ █ █`;

const GIT_LOG = `\x1b[yellow]a3f7b21\x1b[reset] \x1b[green](HEAD -> main)\x1b[reset] DevOps/Cloud Engineer @ RAMA.AI LABS
│ \x1b[muted]Jul 2025 – Present | Hyderabad, India\x1b[reset]
│ - Streamlining deployment workflows & system reliability
│ - Building scalable, high-performance applications
│ - Automating CI/CD, code reviews & process improvements
│
\x1b[yellow]e8c2d04\x1b[reset] \x1b[green](origin/fullstack)\x1b[reset] Full Stack Dev Intern @ Ivis Labs
│ \x1b[muted]Feb 2025 – May 2025 | Mysore, India\x1b[reset]
│ - React.js + Node.js + MongoDB full-stack applications
│ - RESTful APIs, Git workflows, cloud deployment
│ - Agile sprints, code reviews, scalable architecture
│
\x1b[yellow]1b4a9f6\x1b[reset] \x1b[green](origin/webdev)\x1b[reset] Web Dev Intern @ Tosko Technologies
  \x1b[muted]Dec 2023 – Feb 2024 | Mysore, India\x1b[reset]
  - Dynamic, responsive web applications
  - Cross-functional collaboration
  - Front-end development & UI improvements`;

const KUBECTL = `NAME                        STATUS      AGE   STACK
protected-vault             Completed   1mo   React, TypeScript, Node, Supabase
missing-person-alert        Completed   2mo   React.js, Node.js, MongoDB
text-classification-rnn     Completed   8mo   Python, TensorFlow, RNN
covid-bed-management        Completed   2y    MySQL, DBMS, Java
place-name-nlp              Completed   1y    Python, NLP, ML`;

const SKILLS_TREE = `~/skills
├── devops-cloud/
│   ├── AWS    ├── Azure    ├── GCP
│   ├── Kubernetes    ├── Docker
│   ├── Ansible    ├── Terraform
│   └── Puppet    └── Chef
├── ci-cd/
│   ├── Git    ├── GitHub    ├── GitLab
│   ├── Bitbucket    ├── CircleCI
│   └── Maven
├── monitoring/
│   ├── Prometheus    ├── Grafana
│   └── ELK Stack
├── scripting/
│   ├── Python    ├── Shell/Bash
│   ├── Golang    ├── Ruby
│   └── Node.js
├── databases/
│   ├── Supabase    ├── MongoDB
│   └── REST APIs
└── platforms/
    ├── Linux    └── Windows

6 directories, 28 tools`;

const CAT_ABOUT = `Name:     Revanth Kumar S
Role:     DevOps / Cloud Engineer
Company:  RAMA.AI LABS PVT LTD
Location: Hyderabad, India
Email:    revanthkumars64@gmail.com
Phone:    +91 8431005243
GitHub:   github.com/imperfect0007
LinkedIn: linkedin.com/in/revanth-kumar-s-a43672218

Motivated DevOps-focused technology professional with a
Computer Science background, dedicated to designing,
automating, and maintaining scalable, high-performance
systems. Experienced in optimizing deployment processes,
enhancing system stability, and supporting efficient
development workflows.`;

const CAT_EDUCATION = `[education.0]
degree      = "B.E. in Computer Science (AI & ML)"
institution = "ATME College of Engineering"
location    = "Mysore, India"
period      = "Oct 2021 – Jun 2025"
cgpa        = 8.57

[education.1]
degree      = "Pre-University (PCMC)"
institution = "Genius PU College"
location    = "Mysore, India"
period      = "Jun 2019 – Apr 2021"`;

const LS_HOME = `about.txt    education.conf    projects/
skills/      experience.log    contact.sh
resume.pdf   .bashrc           .gitconfig`;

const appMap: Record<string, string> = {
  about: 'about', skills: 'skills', experience: 'experience',
  education: 'education', projects: 'projects', contact: 'contact',
  terminal: 'terminal', resume: 'resume',
};

const Terminal = ({ onOpenApp }: TerminalProps) => {
  const [lines, setLines] = useState<Line[]>([
    { type: 'output', text: 'RevanthOS 1.0.0 (GNU/Linux 6.2.0-devops x86_64)\nType "help" for available commands.\n' },
  ]);
  const [input, setInput] = useState('');
  const [cmdHistory, setCmdHistory] = useState<string[]>([]);
  const [histIdx, setHistIdx] = useState(-1);
  const [cwd, setCwd] = useState('~');
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [lines]);

  const addOutput = useCallback((text: string) => {
    setLines((prev) => [...prev, { type: 'output', text }]);
  }, []);

  const processCommand = useCallback((raw: string) => {
    const trimmed = raw.trim();
    if (!trimmed) return;

    setLines((prev) => [...prev, { type: 'input', text: `${cwd}$ ${trimmed}` }]);
    setCmdHistory((prev) => [...prev, trimmed]);
    setHistIdx(-1);

    const parts = trimmed.split(/\s+/);
    const cmd = parts[0].toLowerCase();
    const args = parts.slice(1).join(' ');

    switch (cmd) {
      case 'help':
        addOutput(HELP_TEXT);
        break;
      case 'whoami':
        addOutput('revanth — DevOps / Cloud Engineer @ RAMA.AI LABS');
        break;
      case 'neofetch':
        addOutput(NEOFETCH);
        break;
      case 'ls': {
        const listPath = (!args || args === '.' || args === '~' || args === '/home/revanth') ? cwd : args;
        const pathNorm = listPath.replace(/^\/home\/revanth/, '~').toLowerCase();
        if (pathNorm === '~') {
          addOutput(LS_HOME);
        } else if (pathNorm.includes('skills')) {
          addOutput('devops-cloud/  ci-cd/  monitoring/  scripting/  databases/  platforms/');
        } else if (pathNorm.includes('projects')) {
          addOutput('protected-vault/  missing-person-alert/  text-classification-rnn/\ncovid-bed-management/  place-name-nlp/');
        } else if (['~/about', '~/experience', '~/education', '~/contact'].some((p) => pathNorm === p || pathNorm.startsWith(p + '/'))) {
          addOutput(listPath.includes('about') ? 'about.txt' : listPath.includes('experience') ? 'experience.log' : listPath.includes('education') ? 'education.conf' : 'contact.sh');
        } else {
          addOutput(`ls: cannot access '${args || '.'}': No such file or directory`);
        }
        break;
      }
      case 'cat':
        if (args.includes('about')) addOutput(CAT_ABOUT);
        else if (args.includes('education')) addOutput(CAT_EDUCATION);
        else if (args.includes('experience') || args.includes('.log')) addOutput('Hint: try "git log" for experience');
        else if (args.includes('skills')) addOutput('Hint: try "tree skills" for a better view');
        else if (args.includes('.bashrc')) addOutput('export PS1="\\[\\e[32m\\]\\u@devops\\[\\e[0m\\]:\\[\\e[34m\\]\\w\\[\\e[0m\\]$ "\nexport EDITOR=vim\nalias k=kubectl\nalias tf=terraform');
        else if (args.includes('.gitconfig')) addOutput('[user]\n  name = Revanth Kumar S\n  email = revanthkumars64@gmail.com\n[core]\n  editor = vim');
        else if (!args) addOutput('cat: missing operand\nTry: cat about.txt, cat education.conf');
        else addOutput(`cat: ${args}: No such file or directory`);
        break;
      case 'tree':
        addOutput(SKILLS_TREE);
        break;
      case 'git':
        if (args.startsWith('log')) addOutput(GIT_LOG);
        else if (args === 'status') addOutput('On branch main\nYour branch is up to date with \'origin/main\'.\nnothing to commit, working tree clean');
        else addOutput(`git: '${args}' is not a git command.`);
        break;
      case 'kubectl':
        if (args.includes('get') && args.includes('pod')) addOutput(KUBECTL);
        else addOutput(`error: unknown command "${args}"\nTry: kubectl get pods`);
        break;
      case 'docker':
        if (args.includes('ps')) addOutput('CONTAINER ID   IMAGE          STATUS    NAMES\na3f7b21c9e    portfolio:1.0  Running   revanthos-portfolio');
        else addOutput(`docker: '${args}' is not a docker command.`);
        break;
      case 'ping':
        if (args.includes('linkedin')) addOutput('PING linkedin.com — linkedin.com/in/revanth-kumar-s-a43672218\n64 bytes: time=12ms ✓ Connection successful');
        else if (args.includes('github')) addOutput('PING github.com — github.com/imperfect0007\n64 bytes: time=8ms ✓ Connection successful');
        else if (args) addOutput(`PING ${args} — 64 bytes: time=24ms ✓`);
        else addOutput('ping: missing destination');
        break;
      case 'open':
        if (args && appMap[args]) {
          onOpenApp?.(appMap[args]);
          addOutput(`Opening ${args}...`);
        } else {
          addOutput(args ? `open: ${args}: application not found` : 'Usage: open <app>\nApps: about, skills, experience, education, projects, contact');
        }
        break;
      case 'echo':
        addOutput(args || '');
        break;
      case 'date':
        addOutput(new Date().toString());
        break;
      case 'uptime':
        addOutput(' up since Jul 2025, load average: 0.42, 0.38, 0.35');
        break;
      case 'uname':
        addOutput('RevanthOS 1.0.0 GNU/Linux 6.2.0-devops x86_64');
        break;
      case 'pwd':
        addOutput(cwd === '~' ? '/home/revanth' : cwd);
        break;
      case 'cd': {
        const target = args || '~';
        if (['~', '..', '/home/revanth'].includes(target)) {
          setCwd('~');
        } else if (Object.keys(appMap).includes(target.replace('/', ''))) {
          setCwd(`~/${target.replace('/', '')}`);
          addOutput(`Entered ${target}`);
        } else {
          addOutput(`cd: ${target}: No such file or directory`);
        }
        break;
      }
      case 'history':
        addOutput(cmdHistory.map((c, i) => `  ${i + 1}  ${c}`).join('\n') || '  (empty)');
        break;
      case 'clear':
        setLines([]);
        return;
      case 'exit':
        addOutput('logout\nConnection to revanthos closed.');
        break;
      case 'sudo':
        addOutput('revanth is already root. Full access granted. 😎');
        break;
      case 'rm':
        if (args.includes('-rf')) addOutput('Nice try. This portfolio is protected. 🔒');
        else addOutput(`rm: cannot remove '${args}'`);
        break;
      case 'vim':
      case 'nano':
        addOutput(`${cmd}: read-only filesystem. Try "cat" instead.`);
        break;
      case 'curl':
        addOutput('HTTP/1.1 200 OK\nContent-Type: application/json\n\n{ "name": "Revanth Kumar S", "role": "DevOps Engineer", "status": "available" }');
        break;
      case 'htop':
        addOutput('  PID  USER      CPU%  MEM%  COMMAND\n  001  revanth    2.1   4.3  portfolio-server\n  002  revanth    1.8   3.1  terminal-emulator\n  003  revanth    0.5   1.2  system-monitor\n\nLoad: 0.42 | Tasks: 3 | Uptime: since Jul 2025');
        break;
      case 'terraform':
        if (args === 'plan') addOutput('Plan: 4 to add, 0 to change, 0 to destroy.\nResources: about, skills, experience, projects');
        else if (args === 'apply') addOutput('Apply complete! Resources: 4 added, 0 changed, 0 destroyed.');
        else addOutput(`Usage: terraform plan | terraform apply`);
        break;
      default:
        addOutput(`${cmd}: command not found\nType "help" for available commands.`);
    }
  }, [cwd, cmdHistory, addOutput, onOpenApp]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      processCommand(input);
      setInput('');
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (cmdHistory.length > 0) {
        const newIdx = histIdx === -1 ? cmdHistory.length - 1 : Math.max(0, histIdx - 1);
        setHistIdx(newIdx);
        setInput(cmdHistory[newIdx]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (histIdx !== -1) {
        const newIdx = histIdx + 1;
        if (newIdx >= cmdHistory.length) {
          setHistIdx(-1);
          setInput('');
        } else {
          setHistIdx(newIdx);
          setInput(cmdHistory[newIdx]);
        }
      }
    } else if (e.key === 'Tab') {
      e.preventDefault();
      const commands = ['help', 'whoami', 'neofetch', 'ls', 'cat', 'tree', 'git', 'kubectl', 'docker', 'ping', 'open', 'echo', 'date', 'uptime', 'uname', 'pwd', 'cd', 'history', 'clear', 'sudo', 'curl', 'htop', 'terraform'];
      const match = commands.find((c) => c.startsWith(input));
      if (match) setInput(match);
    } else if (e.key === 'l' && e.ctrlKey) {
      e.preventDefault();
      setLines([]);
    }
  };

  const renderText = (text: string) => {
    return text.split('\n').map((line, i) => {
      let rendered = line
        .replace(/\x1b\[green\](.*?)\x1b\[reset\]/g, '<span class="text-os-green">$1</span>')
        .replace(/\x1b\[blue\](.*?)\x1b\[reset\]/g, '<span class="text-os-accent">$1</span>')
        .replace(/\x1b\[yellow\](.*?)\x1b\[reset\]/g, '<span class="text-os-yellow">$1</span>')
        .replace(/\x1b\[muted\](.*?)\x1b\[reset\]/g, '<span class="text-os-muted">$1</span>');
      return <div key={i} dangerouslySetInnerHTML={{ __html: rendered }} />;
    });
  };

  return (
    <div
      className="terminal-pane h-full flex flex-col font-mono text-xs leading-relaxed cursor-text overflow-hidden min-h-0"
      style={{ backgroundColor: 'var(--os-bg)' }}
      onClick={() => inputRef.current?.focus()}
    >
      {/* Tab bar — like a real terminal tab */}
      <div className="terminal-tab shrink-0 flex items-center gap-2 px-3 sm:px-4 py-1.5 border-b border-os-border/80" style={{ backgroundColor: 'var(--os-panel)' }}>
        <span className="flex items-center gap-1.5 px-2 py-1 rounded bg-os-surface/80 border border-os-border/50 text-[10px]">
          <span className="w-1.5 h-1.5 rounded-full bg-os-green" />
          <span className="text-os-muted">bash</span>
        </span>
        <span className="text-os-dim text-[10px] hidden sm:inline">— revanth@devops</span>
      </div>

      {/* Scrollable output — same bg as input so it feels like one buffer */}
      <div className="terminal-output flex-1 overflow-auto pl-4 pr-4 pt-3 pb-2 min-h-0 border-l-2 border-os-green/20" style={{ backgroundColor: 'var(--os-bg)' }}>
        {lines.map((line, i) => (
          <div key={i} className={`whitespace-pre-wrap break-words ${line.type === 'input' ? 'text-os-text' : 'text-os-muted'} leading-[1.5]`}>
            {line.type === 'input' ? (
              <span>
                <span className="text-os-green font-semibold">revanth</span>
                <span className="text-os-muted">@</span>
                <span className="text-os-accent font-semibold">devops</span>
                <span className="text-os-muted">:</span>
                <span className="text-os-purple">{line.text.split('$')[0]}</span>
                <span className="text-os-text">$ {line.text.split('$ ').slice(1).join('$ ')}</span>
              </span>
            ) : (
              renderText(line.text)
            )}
          </div>
        ))}
      </div>

      {/* Current line — same bg as output, blinking cursor, thin separator */}
      <div
        className="terminal-prompt shrink-0 flex items-center gap-0 pl-4 pr-4 py-2 min-h-[48px] border-t border-os-border/60"
        style={{ backgroundColor: 'var(--os-bg)' }}
      >
        <span className="text-os-green font-semibold shrink-0 select-none">revanth</span>
        <span className="text-os-muted shrink-0 select-none">@</span>
        <span className="text-os-accent font-semibold shrink-0 select-none">devops</span>
        <span className="text-os-muted shrink-0 select-none">:</span>
        <span className="text-os-purple truncate min-w-0 max-w-[30%] sm:max-w-none select-none">{cwd}</span>
        <span className="text-os-text font-medium shrink-0 select-none">$ </span>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1 min-w-[2ch] bg-transparent outline-none text-os-text font-medium border-0 focus:ring-0 focus:outline-none"
          style={{ caretColor: 'var(--os-green)', fontSize: 'max(16px, 1rem)' }}
          autoFocus
          spellCheck={false}
          autoComplete="off"
          enterKeyHint="go"
          aria-label="Terminal input"
        />
      </div>
      <div ref={bottomRef} />
    </div>
  );
};

export default Terminal;
