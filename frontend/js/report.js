document.addEventListener('DOMContentLoaded', () => {
    const reportData = sessionStorage.getItem('finSight_report');
    if (!reportData) {
        window.location.href = 'form.html';
        return;
    }

    const report = JSON.parse(reportData);
    const content = document.getElementById('report-content');

    // Build Executive Summary
    const execSummary = `
        <div class="report-section">
            <h2>Executive Summary</h2>
            <p>${report.executive_summary}</p>
        </div>
    `;

    // Build Risk Analysis
    const riskAnalysis = `
        <div class="report-section">
            <h2>Risk Analysis</h2>
            <p>${report.risk_analysis}</p>
        </div>
    `;

    // Build Fact Sheet Insights
    const factSheetInsights = `
        <div class="report-section">
            <h2>Fact Sheet Insights</h2>
            <p>${report.fact_sheet_insights}</p>
        </div>
    `;

    // Build Allocation
    const alloc = report.recommended_allocation;
    const allocation = `
        <div class="report-section">
            <h2>Recommended Asset Allocation</h2>
            <ul>
                <li>Equity: ${alloc.equity_percent}%</li>
                <li>Debt: ${alloc.debt_percent}%</li>
                <li>Gold: ${alloc.gold_percent}%</li>
                <li>Liquid: ${alloc.liquid_percent}%</li>
            </ul>
        </div>
    `;

    // Build Priorities
    const prioritiesHTML = report.priority_actions.map(action => {
        const priorityClass = `priority-${action.priority.toLowerCase()}`;
        return `
            <div class="${priorityClass}" style="margin-top: 10px; padding: 10px; background: rgba(255,255,255,0.05); border-radius: 4px;">
                <strong>${action.action}</strong> (${action.priority})
                <p style="margin: 5px 0 0 0; font-size: 0.9em;">${action.rationale}</p>
            </div>
        `;
    }).join('');

    const priorities = `
        <div class="report-section">
            <h2>Priority Actions</h2>
            ${prioritiesHTML}
        </div>
    `;

    // Projected Outcome
    const outcome = `
        <div class="report-section">
            <h2>Projected Outcome</h2>
            <p>${report.projected_outcome}</p>
        </div>
    `;

    content.innerHTML = execSummary + riskAnalysis + factSheetInsights + allocation + priorities + outcome;
});
