import { courses } from "./courses.js";
import { exerciseForms } from "./config.js";

const shapes = {
  home: '<path d="m3 10 9-7 9 7v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><path d="M9 21v-7h6v7"/>',
  book: '<path d="M12 6a9 9 0 0 0-9-2v14a9 9 0 0 1 9 2 9 9 0 0 1 9-2V4a9 9 0 0 0-9 2Zm0 0v14"/>',
  chart: '<path d="M4 4v16h16M9 15v-4m5 4V8m5 7V5"/>',
  download: '<path d="M12 3v12m-5-5 5 5 5-5M4 16v4h16v-4"/>',
  cloud: '<path d="M7 18H6a4 4 0 0 1-.4-8 6 6 0 0 1 11.6-1.3A4.7 4.7 0 0 1 18 18h-1"/><path d="m9 15 3-3 3 3m-3-3v8"/>',
  radar: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><path d="m12 12 7-7"/><circle cx="12" cy="12" r="1"/>',
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  stack: '<path d="m12 3 9 5-9 5-9-5zm-9 9 9 5 9-5M3 16l9 5 9-5"/>',
  play: '<path d="M8 5v14l12-7z"/>',
  quiz: '<path d="M8 4H6a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-2"/><rect x="8" y="2" width="8" height="5" rx="1"/><path d="m8 14 2 2 5-5"/>',
  file: '<path d="M6 3h8l4 4v14H6zm8 0v5h4M9 12h6m-6 4h6"/>',
  check: '<path d="m5 12 4 4L19 6"/>',
  bolt: '<path d="m13 2-9 12h7l-1 8 10-12h-7l1-8z"/>',
  upload: '<path d="M12 16V4m-5 5 5-5 5 5M4 16v4h16v-4"/>',
  spark: '<path d="M12 3c0 5 4 9 9 9-5 0-9 4-9 9 0-5-4-9-9-9 5 0 9-4 9-9Z"/>',
  terminal: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m7 10 2 2-2 2m5 0h5"/>'
};
const icon = (name, size = 20) => `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${shapes[name]}</svg>`;
const courseList = Object.values(courses);
const sections = [
  ["discussion", "Discussion", "book", "Read the lesson"],
  ["demo", "Demo", "play", "Try the simulation"],
  ["quiz", "Quiz", "quiz", "Answer 10 questions"],
  ["exercise", "Exercise", "file", "Open the manual"]
];
const links = [["home", "Home", "home"], ["courses", "Courses", "book"], ["progress", "Progress", "chart"]];
const storageKey = "secpath:progress:v1";
const main = document.querySelector("main");
let progress = {};
try {
  progress = JSON.parse(localStorage.getItem(storageKey)) || {};
} catch {
  // Learning sessions can still run without persistent storage.
}
let demo = { provider: "Netlify", stage: 0, packet: 0, checked: false };
let installEvent;
let route = { page: "home" };

function record(course) {
  return progress[course.id] ??= { completed: {}, best: null, attempts: 0, quiz: null };
}

function saveProgress() {
  try {
    localStorage.setItem(storageKey, JSON.stringify(progress));
  } catch {
    // Keep the current session available when storage is restricted.
  }
}

function setComplete(course, section) {
  record(course).completed[section] = true;
  saveProgress();
}

function count(course) {
  return sections.filter(([id]) => record(course).completed[id]).length;
}

function exerciseForm(course) {
  try {
    const url = new URL(exerciseForms[course.id]);
    const shortLink = url.hostname === "forms.gle" && /^\/[\w-]+\/?$/.test(url.pathname);
    const responderLink = url.hostname === "docs.google.com" && /^\/forms\/(?:u\/\d+\/)?d\/(?:e\/)?[\w-]+\/viewform\/?$/.test(url.pathname);
    if (url.protocol === "https:" && !url.username && !url.password && (shortLink || responderLink)) {
      return url.href.replaceAll("&", "&amp;").replaceAll('"', "&quot;").replaceAll("<", "&lt;");
    }
  } catch {
    // A course can have its manual available before a responder URL is configured.
  }
  return "";
}

function renderNav() {
  const current = route.course ? "courses" : route.page;
  document.querySelectorAll(".desktop-nav, .mobile-nav").forEach((nav) => {
    nav.innerHTML = links.map(([id, label, glyph]) => `<a href="#/${id}" ${id === current ? 'aria-current="page"' : ""}>${icon(glyph, 19)}${label}</a>`).join("");
  });
}

function courseCards() {
  return `<div class="course-grid">${courseList.map((course) => {
    const completed = count(course);
    return `<article class="course-card ${course.id}">
      <div class="course-top"><span class="course-icon">${icon(course.icon, 25)}</span><span class="course-label">${course.name}</span></div>
      <h3>${course.title}</h3><p>${course.description}</p>
      <div class="course-meta"><span>${icon("stack", 16)} 4 activities</span><span>${icon("clock", 16)} ${course.duration}</span></div>
      <div class="card-bottom"><span class="card-progress">${completed ? `${completed}/4 complete` : "Self-paced"}</span><a class="button course-button" href="#/${course.id}" aria-label="${completed ? "Continue" : "Open"} ${course.name}">${completed ? "Continue course" : "Open course"}</a></div>
    </article>`;
  }).join("")}</div>`;
}

function home() {
  return `<section class="hero">
    <div class="hero-copy">
      <span class="eyebrow hero-label">${icon("bolt", 17)} GROUP 7 LEARNING LAB</span>
      <h1>Build your<br>security <span>skills.</span></h1>
      <p>Explore Cloud Security and IAS 2 with hands-on demos, quick quizzes, and guided exercises.</p>
      <a class="button primary hero-cta" href="#/courses">${icon("book", 19)} Browse courses</a>
    </div>
    <div class="hero-art" aria-hidden="true">
      <span class="orbit orbit-one"></span><span class="orbit orbit-two"></span><span class="orbit orbit-three"></span>
      <span class="hero-deco hero-deco-cloud">${icon("cloud", 25)}</span><span class="hero-deco hero-deco-terminal">${icon("terminal", 25)}</span>
      <span class="star star-one">${icon("spark", 23)}</span><span class="star star-two">${icon("spark", 15)}</span>
      <img src="./assets/mascot.webp" alt="" width="640" height="740" fetchpriority="high">
    </div>
  </section>
  <section class="course-section" aria-labelledby="available-courses"><div class="section-heading">
      <div><h2 id="available-courses">Your courses</h2><p>Choose a subject to get started.</p></div>
      <span class="count-tag">2 courses</span>
    </div>${courseCards()}</section>`;
}

function catalog() {
  return `<div class="page-heading"><h1>Courses</h1><p>Choose a subject and work through the activities at your own pace.</p></div>${courseCards()}`;
}

function progressPage() {
  return `<div class="page-heading"><h1>Your progress</h1><p>Activity completion and best quiz scores saved on this device.</p></div>
    <div class="course-grid">${courseList.map((course) => {
      const state = record(course);
      return `<article class="course-card progress-card ${course.id}">
        <div class="course-top"><span class="course-icon">${icon(course.icon, 25)}</span><div><span class="course-label">${course.name}</span><h2>${course.title}</h2></div></div>
        <div class="meter-label"><span>Activities completed</span><strong>${count(course)} / 4</strong></div>
        <progress class="meter" value="${count(course)}" max="4" aria-label="${course.name} activities completed"></progress>
        <ul class="progress-list">${sections.map(([id, label, glyph]) => `<li>${icon(glyph, 17)}<span>${id === "exercise" ? "Manual reviewed" : label}</span><strong>${state.completed[id] ? "Complete" : "Pending"}</strong></li>`).join("")}</ul>
        <div class="card-bottom"><span>Best quiz <strong>${state.best === null ? "—" : `${state.best}/100`}</strong></span><a class="button course-button" href="#/${course.id}">View course</a></div>
      </article>`;
    }).join("")}</div>`;
}

function courseHeader(course, section) {
  return `<div class="breadcrumbs"><a href="#/courses">Courses</a><span aria-hidden="true">/</span>${section ? `<a href="#/${course.id}">${course.name}</a>` : `<span>${course.name}</span>`}</div>
    <div class="course-banner ${course.id}">
      <span class="course-icon">${icon(course.icon, 31)}</span>
      <div><span class="course-label">${course.name}</span><h1>${course.title}</h1><p>${course.description}</p></div>
    </div>
    <nav class="activity-nav" aria-label="${course.name} activities" >
      ${sections.map(([id, label, glyph]) => `<a href="#/${course.id}/${id}" ${id === section ? 'aria-current="page"' : ""}>${icon(glyph, 18)}<span>${label}</span>${record(course).completed[id] ? '<i class="done-dot" aria-label="completed"></i>' : ""}</a>`).join("")}
    </nav>`;
}

function overview(course) {
  return `<section class="activity-content"><div class="section-heading"><div><h2>Course activities</h2><p>${count(course)} of 4 completed</p></div></div><div class="activity-grid">
    ${sections.map(([id, label, glyph, description]) => `<a class="activity-card" href="#/${course.id}/${id}">
      <span class="activity-icon">${icon(glyph, 22)}</span><span><strong>${label}</strong><small>${description}</small></span>
      ${record(course).completed[id] ? `<span class="completed-icon" aria-label="Completed">${icon("check", 18)}</span>` : ""}
    </a>`).join("")}</div></section>`;
}

function discussion(course) {
  return `<section class="activity-content"><div class="section-heading"><div><h2>Discussion</h2><p>Key concepts from the Group 7 presentation.</p></div></div>
    <div class="lesson-list">${course.lessons.map(([title, body], index) => `<details class="lesson" ${index === 0 ? "open" : ""}><summary>${title}</summary><p>${body}</p></details>`).join("")}</div>
    <div class="actions">${record(course).completed.discussion ? `<span class="completion-status">${icon("check", 18)} Discussion completed</span>` : `<button class="button primary" data-action="complete-discussion">${icon("check", 18)} Mark discussion complete</button>`}<a class="button secondary" href="#/${course.id}/demo">Open demo</a></div></section>`;
}

const deploySteps = [
  ["Prepare your website", "Create an index.html file and open it locally to confirm the page works."],
  ["Publish the files", "Upload the folder containing index.html to Netlify Drop.", "Upload index.html to your repository, then configure Pages to publish from the root of the main branch."],
  ["Verify the deployment", "Open the published URL and check that the page and its Test Website button work."]
];

function cloudDemo() {
  const [title, netlify, github] = deploySteps[Math.min(demo.stage, 2)];
  const done = demo.stage === 3;
  return `<div class="demo-panel">
    <div class="segmented" aria-label="Hosting provider">${["Netlify", "GitHub Pages"].map((provider) => `<button data-action="provider" data-value="${provider}" aria-pressed="${demo.provider === provider}">${provider}</button>`).join("")}</div>
    <div class="demo-stage"><span class="eyebrow">${done ? "DEPLOYMENT VERIFIED" : `STEP ${demo.stage + 1} OF 3`}</span><h3>${done ? "Your site is live in the simulation" : title}</h3><p>${done ? "The browser loaded index.html and the sample button responded." : (demo.provider === "GitHub Pages" && github ? github : netlify)}</p></div>
    <div class="console"><div class="console-head">${icon("terminal", 18)} ${demo.provider}</div><pre>${[
      "✓ Found index.html\n✓ Page passed the local preview check.",
      "✓ index.html uploaded\n✓ Static site published",
      "GET /index.html → 200 OK\n✓ Test Website button responded"
    ].slice(0, demo.stage).join("\n\n") || "Ready to run a local preview."}</pre></div>
    <div class="actions"><button class="button primary" data-action="${done ? "reset-demo" : "deploy-step"}">${done ? "Run again" : ["Run local preview", "Simulate publish", "Verify site"][demo.stage]}</button></div>
  </div>`;
}

const packets = [
  ["ICMP echo request", "ICMP type 8", "Echo requests match the rule, which produces an alert."],
  ["ICMP echo reply", "ICMP type 0", "The protocol matches, but the rule only selects type 8."],
  ["UDP DNS request", "UDP port 53", "The rule selects ICMP traffic, so it skips this UDP packet."]
];

function snortDemo() {
  const [name, detail, result] = packets[demo.packet];
  const alert = demo.packet === 0;
  return `<div class="demo-panel">
    <div class="console"><div class="console-head">${icon("terminal", 18)} Detection rule</div><pre>alert icmp any any -&gt; any any (msg:"ICMP Ping Request Detected"; itype:8; sid:1000001; rev:1;)</pre></div>
    <label for="packet" class="field-label">Sample packet</label><select id="packet">${packets.map(([label], index) => `<option value="${index}" ${index === demo.packet ? "selected" : ""}>${label}</option>`).join("")}</select>
    <div class="demo-stage" aria-live="polite"><span class="eyebrow">${detail}</span><h3>${demo.checked ? (alert ? "Alert generated" : "No match") : name}</h3><p>${demo.checked ? result : "Inspect a sample packet and compare it with the rule."}</p>
      ${demo.checked && alert ? '<code class="alert-sample">[1:1000001:1] ICMP Ping Request Detected</code>' : ""}
    </div><div class="actions"><button class="button primary" data-action="inspect-packet">${icon("play", 17)} Inspect packet</button></div>
  </div>`;
}

function demoPage(course) {
  return `<section class="activity-content"><div class="section-heading"><div><h2>${course.demoTitle}</h2><p>${course.id === "cloud" ? "Walk through a deployment without creating a hosting account." : "See how Snort evaluates sample traffic against an ICMP rule."}</p></div><span class="count-tag">Simulation</span></div>
    ${course.id === "cloud" ? cloudDemo() : snortDemo()}
    ${record(course).completed.demo ? `<div class="actions"><a class="button secondary" href="#/${course.id}/quiz">Take the quiz</a></div>` : ""}
  </section>`;
}

function exercise(course) {
  const form = exerciseForm(course);
  const done = record(course).completed.exercise;
  const online = navigator.onLine;
  const deliverables = course.deliverables.map((item) => `<li>${item}</li>`).join("");
  return `<section class="activity-content exercise-content"><div class="section-heading"><div><h2>Exercise manual</h2><p>${course.manualDescription}</p></div></div>
    <div class="manual-panel"><span class="activity-icon">${icon("file", 24)}</span><div><h3>${course.manualTitle}</h3><p>Group 7 exercise manual · PDF</p></div><a class="button secondary" href="./manuals/${course.manual}" download>${icon("download", 18)} Download manual</a></div>
    <div class="panel submission"><h3>Submit your exercise</h3><p>Prepare the following for your Google Forms upload.</p><ul>${deliverables}</ul>
      <div class="actions">
        ${form && online ? `<a class="button primary" href="${form}" target="_blank" rel="noopener noreferrer">${icon("upload", 18)} Open Google Form</a>` : `<button class="button primary" disabled>${icon("upload", 18)} Open Google Form</button>`}
        <button class="button secondary" data-action="complete-exercise">${icon("check", 18)} ${done ? "Manual reviewed" : "Mark manual reviewed"}</button>
      </div>${!form ? "<p class='form-note' role='status'>The course organizer has yet to add the Google Forms submission link.</p>" : !online ? "<p class='form-note' role='status'>Connect to the internet to open Google Forms.</p>" : "<p class='form-note'>Sign in with Google to upload your files.</p>"}
    </div></section>`;
}

function quiz(course) {
  const state = record(course);
  const attempt = state.quiz;
  const total = course.questions.length;
  if (!attempt) {
    return `<section class="quiz-panel quiz-intro"><img src="./assets/mascot.webp" alt="" width="114" height="132"><span class="eyebrow">${course.name} quiz</span><h2>Ready to test your knowledge?</h2><p>${total} questions, 10 points each. You’ll see feedback after every answer.</p><button class="button primary" data-action="start-quiz">${icon("play", 18)} Start quiz</button></section>`;
  }
  if (attempt.finished) {
    return `<section class="quiz-panel quiz-results"><img src="./assets/mascot.webp" alt="" width="114" height="132"><span class="eyebrow">Quiz complete</span><h2>You earned</h2><div class="score">${attempt.score}<span> / 100</span></div>
      <p>${attempt.score / 10} of ${total} correct · Best score ${state.best}/100</p>
      <div class="actions"><button class="button primary" data-action="start-quiz">Try again</button><a class="button secondary" href="#/${course.id}/exercise">Open exercise</a><a class="text-link" href="#/courses">Other courses</a></div>
    </section>`;
  }
  const { index, answers } = attempt;
  const [question, options, answer, explanation] = course.questions[index];
  const choice = answers[index];
  const revealed = choice !== undefined;
  return `<section class="quiz-panel active-quiz">
    <div class="quiz-header"><img src="./assets/mascot.webp" alt="" width="59" height="68"><span class="course-icon ${course.id}">${icon(course.icon, 22)}</span><span class="quiz-count">Question ${index + 1} of ${total}</span></div>
    <progress class="meter quiz-meter" value="${index + Number(revealed)}" max="${total}" aria-label="Questions answered"></progress>
    <div class="question-card"><h2 data-question>${question}</h2></div>
    <div class="quiz-options">${options.map((option, optionIndex) => {
      const correct = revealed && optionIndex === answer;
      const incorrect = revealed && optionIndex === choice && !correct;
      const status = correct ? "correct" : incorrect ? "incorrect" : "";
      return `<button class="answer ${status}" data-action="answer" data-value="${optionIndex}" ${revealed ? "disabled" : ""}>
        <span class="answer-letter">${"ABCD"[optionIndex]}</span><span>${option}</span>${status ? `<span class="answer-status">${correct ? "Correct" : "Your answer"}</span>` : ""}
      </button>`;
    }).join("")}</div>
    ${revealed ? `<div class="quiz-feedback ${choice === answer ? "positive" : ""}" role="status"><strong>${choice === answer ? "That’s correct!" : "The correct answer is highlighted."}</strong><p>${explanation}</p></div>
    <div class="actions"><button class="button primary" data-action="next-question">${index + 1 === total ? "See results" : "Next question"}</button></div>` : ""}
  </section>`;
}

function render() {
  const [, page = "home", section, extra] = location.hash.slice(1).split("/");
  const course = Object.hasOwn(courses, page) && !extra ? courses[page] : null;
  const currentSection = course && sections.some(([id]) => id === section) ? section : null;
  if (course !== route.course || currentSection !== route.section) {
    demo = { provider: "Netlify", stage: 0, packet: 0, checked: false };
  }
  route = { page, course, section: currentSection };
  renderNav();
  document.title = course ? `${course.name} · SecPath` : "SecPath · Cybersecurity Learning";
  if (!course) {
    main.innerHTML = page === "progress" ? progressPage() : page === "courses" ? catalog() : home();
    return;
  }
  const views = { discussion, demo: demoPage, exercise, quiz };
  const content = currentSection ? views[currentSection](course) : overview(course);
  main.innerHTML = `<div class="course-page ${course.id}">${courseHeader(course, currentSection)}${content}</div>`;
}

document.querySelector(".install-button span").innerHTML = icon("download", 18);
document.addEventListener("click", async (event) => {
  const button = event.target.closest("[data-action]");
  if (!button || button.disabled) return;
  const { action, value } = button.dataset;
  if (action === "install") {
    if (installEvent) {
      const prompt = installEvent;
      installEvent = null;
      try {
        await prompt.prompt();
      } catch {
        document.querySelector("#install-dialog").showModal();
      }
    } else {
      document.querySelector("#install-dialog").showModal();
    }
    return;
  }
  const course = route.course;
  if (!course) return;
  const state = record(course);
  const attempt = state.quiz;
  let focus = `[data-action="${action}"]`;
  switch (action) {
    case "complete-discussion":
      setComplete(course, "discussion");
      main.querySelector('[href$="/discussion"]')?.insertAdjacentHTML("beforeend", '<i class="done-dot" aria-label="completed"></i>');
      button.outerHTML = `<span class="completion-status" role="status">${icon("check", 18)} Discussion completed</span>`;
      main.querySelector(".activity-content .actions a")?.focus({ preventScroll: true });
      return;
    case "complete-exercise":
      setComplete(course, "exercise");
      break;
    case "provider":
      demo = { ...demo, provider: value, stage: 0 };
      focus = `[data-action="provider"][aria-pressed="true"]`;
      break;
    case "deploy-step":
      demo.stage += 1;
      if (demo.stage === 3) {
        setComplete(course, "demo");
        focus = '[data-action="reset-demo"]';
      }
      break;
    case "reset-demo":
      demo.stage = 0;
      focus = '[data-action="deploy-step"]';
      break;
    case "inspect-packet":
      demo.checked = true;
      if (demo.packet === 0) setComplete(course, "demo");
      break;
    case "start-quiz":
      state.quiz = { index: 0, answers: [], finished: false };
      saveProgress();
      focus = '[data-action="answer"]';
      break;
    case "answer":
      if (!attempt || attempt.finished || attempt.answers[attempt.index] !== undefined) return;
      attempt.answers[attempt.index] = Number(value);
      saveProgress();
      focus = '[data-action="next-question"]';
      break;
    case "next-question":
      if (!attempt || attempt.finished || attempt.answers[attempt.index] === undefined) return;
      if (attempt.index + 1 < course.questions.length) {
        attempt.index += 1;
        saveProgress();
        focus = '[data-question]';
      } else {
        attempt.finished = true;
        attempt.score = course.questions.reduce((score, question, index) => score + (question[2] === attempt.answers[index] ? 10 : 0), 0);
        state.best = Math.max(state.best ?? 0, attempt.score);
        state.attempts += 1;
        setComplete(course, "quiz");
        focus = ".quiz-results h2";
      }
      break;
    default:
      return;
  }
  render();
  const target = main.querySelector(focus);
  if (target) {
    if (!target.matches("button, a, select")) target.tabIndex = -1;
    target.focus({ preventScroll: true });
    if (action === "next-question" || action === "start-quiz") main.querySelector(".quiz-panel")?.scrollIntoView({ block: "start" });
  }
});

document.addEventListener("change", (event) => {
  if (event.target.id !== "packet") return;
  demo.packet = Number(event.target.value);
  demo.checked = false;
  render();
  document.querySelector("#packet").focus({ preventScroll: true });
});

window.addEventListener("hashchange", () => {
  if (location.hash === "#main") return;
  render();
  main.focus({ preventScroll: true });
  window.scrollTo(0, 0);
});
window.addEventListener("online", () => { if (route.section === "exercise") render(); });
window.addEventListener("offline", () => { if (route.section === "exercise") render(); });
window.addEventListener("beforeinstallprompt", (event) => {
  event.preventDefault();
  installEvent = event;
  document.querySelector(".install-button").hidden = false;
});
window.addEventListener("appinstalled", () => {
  installEvent = null;
  document.querySelector(".install-button").hidden = true;
});
if (matchMedia("(display-mode: standalone)").matches || navigator.standalone) {
  document.querySelector(".install-button").hidden = true;
}
if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("./sw.js").catch(() => {
    // The app remains usable in the browser when install and offline support are unavailable.
  });
}
render();
