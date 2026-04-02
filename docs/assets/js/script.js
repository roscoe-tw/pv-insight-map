document.addEventListener("DOMContentLoaded", function () {

    // ----------------------------
    // 1. TOC Toggle（手機）
    // ----------------------------
    const toc = document.querySelector("#table-of-contents");

    const toggleBtn = document.createElement("div");
    toggleBtn.innerText = "☰ TOC";
    toggleBtn.className = "toc-toggle";
    document.body.appendChild(toggleBtn);

    toggleBtn.onclick = () => {
	toc.classList.toggle("open");
    };

    // ----------------------------
    // 2. 滾動高亮（核心）
    // ----------------------------
    const headings = document.querySelectorAll("h2, h3");
    const tocLinks = document.querySelectorAll("#table-of-contents a");

    window.addEventListener("scroll", () => {
	let current = "";

	headings.forEach(section => {
	    const sectionTop = section.offsetTop - 120;
	    if (window.scrollY >= sectionTop) {
		current = section.id;
	    }
	});

	tocLinks.forEach(link => {
	    link.classList.remove("active");
	    if (link.getAttribute("href") === "#" + current) {
		link.classList.add("active");
	    }
	});
    });

    // ----------------------------
    // 3. 平滑滾動
    // ----------------------------
    tocLinks.forEach(link => {
	link.addEventListener("click", function (e) {
	    e.preventDefault();

	    const target = document.querySelector(this.getAttribute("href"));
	    target.scrollIntoView({ behavior: "smooth" });

	    // 手機點擊後關閉 TOC
	    toc.classList.remove("open");
	});
    });

    // ----------------------------
    // 4. CTA 出現
    // ----------------------------
    const cta = document.querySelector(".cta");

    if (cta) {
	window.addEventListener("scroll", () => {
	    if (window.scrollY > 400) {
		cta.classList.add("visible");
	    }
	});
    }

    // ----------------------------
    // 5. Copy Button
    // ----------------------------
    document.querySelectorAll("pre").forEach(block => {
	const btn = document.createElement("button");
	btn.innerText = "Copy";
	btn.className = "copy-btn";

	btn.onclick = () => {
	    navigator.clipboard.writeText(block.innerText);
	    btn.innerText = "Copied!";
	    setTimeout(() => btn.innerText = "Copy", 2000);
	};

	block.appendChild(btn);
    });

    // ----------------------------
    // 6. Top Button
    // ----------------------------
    const topBtn = document.createElement("button");
    topBtn.innerText = "↑";
    topBtn.className = "top-btn";
    document.body.appendChild(topBtn);

    topBtn.onclick = () => {
	window.scrollTo({ top: 0, behavior: "smooth" });
    };

    window.addEventListener("scroll", () => {
	topBtn.style.display = window.scrollY > 300 ? "block" : "none";
    });

});
