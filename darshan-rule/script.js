// Mobile Navigation
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

if (menuToggle && navLinks) {
    const setNavigationOpen = (isOpen) => {
        navLinks.classList.toggle("open", isOpen);
        menuToggle.textContent = isOpen ? "✕" : "☰";
        menuToggle.setAttribute("aria-expanded", String(isOpen));
        menuToggle.setAttribute(
            "aria-label",
            isOpen ? "Close navigation" : "Open navigation"
        );
    };

    menuToggle.addEventListener("click", () => {
        setNavigationOpen(!navLinks.classList.contains("open"));
    });

    navLinks.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", () => {
            setNavigationOpen(false);
        });
    });

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape" && navLinks.classList.contains("open")) {
            setNavigationOpen(false);
            menuToggle.focus();
        }
    });

    document.addEventListener("click", (event) => {
        if (
            navLinks.classList.contains("open") &&
            !navLinks.contains(event.target) &&
            !menuToggle.contains(event.target)
        ) {
            setNavigationOpen(false);
        }
    });
}

// Search the visitor guidelines by title or description.
const ruleSearch = document.getElementById("ruleSearch");
const ruleCards = Array.from(document.querySelectorAll(".rule-card"));
const searchStatus = document.getElementById("searchStatus");
const noSearchResults = document.getElementById("noSearchResults");

if (ruleSearch && searchStatus && noSearchResults) {
    const totalRules = ruleCards.length;

    const normalize = (text) =>
        text.toLowerCase().trim().replace(/\s+/g, " ");
    const ruleLabel = totalRules === 1 ? "guideline" : "guidelines";

    const updateRuleResults = () => {
        const query = normalize(ruleSearch.value);
        let visibleRules = 0;

        ruleCards.forEach((card) => {
            const title = card.querySelector("h3")?.textContent ?? "";
            const description = card.querySelector("p")?.textContent ?? "";
            const matches = normalize(`${title} ${description}`).includes(query);

            card.hidden = !matches;
            visibleRules += Number(matches);
        });

        searchStatus.textContent = query
            ? `Showing ${visibleRules} of ${totalRules} ${ruleLabel}`
            : `Showing all ${totalRules} ${ruleLabel}`;
        noSearchResults.hidden = visibleRules > 0;
    };

    ruleSearch.addEventListener("input", updateRuleResults);
    updateRuleResults();
}

// Automatic Current Year
const yearElement = document.getElementById("year");

if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
}