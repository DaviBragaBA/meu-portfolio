# Professional profile – English

## Who I am

I am a Business Analyst in Core Limit Policies – Excellence, working on credit card limit policies and limit increase strategies for Brazil and Mexico. My focus is to connect data, models and policy to ensure that credit limit decisions create healthy financial value, with controlled risk and a good customer experience.

## What I do day to day

### 1. Understanding how limit policies affect customer behavior

I analyze how credit limit changes affect customer behavior in terms of:

- **Purchase volume:** how much customers start spending after a limit increase.
- **Interest‑bearing average daily balance:** how much debt customers carry on average per day, which generates interest revenues.
- **Outstanding balance:** how much customers owe at a given point in time (debt stock).
- **Credit limit:** how much additional limit was granted in each experiment or policy change.

To do this, I compare test groups with control groups, computing:

- Delta purchase volume (test minus control).
- Delta interest‑bearing average daily balance.
- Delta outstanding balance.
- Delta limit.

And I derive secondary metrics such as:

- **Marginal utilization of purchase volume:** delta purchase volume divided by delta limit, showing how much extra spend is generated per unit of extra limit.
- **Marginal utilization of interest‑bearing balance:** delta interest‑bearing average daily balance divided by delta limit, showing how much extra financed balance is created per unit of extra limit.
- **Interest‑bearing balance over purchase volume:** delta interest‑bearing average daily balance divided by delta purchase volume, indicating what share of the extra spend turns into financed balance.
- **Marginal utilization of outstanding balance:** delta outstanding balance divided by delta limit, showing how much extra debt stock is created per unit of extra limit.

These metrics help me understand whether a given limit increase:

- drives healthy additional spend,
- increases interest revenues in a sustainable way,
- or pushes customers into debt levels that do not make sense for the underlying risk.

### 2. Building and maintaining monitoring datasets

I work heavily in Databricks and in data jobs repositories to create and maintain datasets that power our policy monitoring, especially:

Budget monitoring for limit increase experiments, aggregated by:

- business month,
- risk band,
- policy and policy version.

In these jobs, I:

- write transformations to join limit data, customer behavior and experiment group labels;
- compute deltas between test and control for purchase volume, interest‑bearing balance, outstanding balance and limit;
- generate ready‑to‑use tables for dashboards and monitoring.

Before any change goes to production, I run staging executions in our data orchestration environment and track them through job monitoring tools to ensure data quality and correctness.

### 3. Creating dashboards and visual narratives

I use internal dashboards as the main visualization tool for policy and budget monitoring, creating and evolving areas that concentrate budget and performance views by country.

In these dashboards I:

- organize metrics by country, risk band, policy, version and experiment type;
- display differences in:
  - purchase volume,
  - interest‑bearing average daily balance,
  - outstanding balance,
  - granted limit;
- highlight marginal utilization metrics, financing intensity and time evolution.

These dashboards are the basis for:

- discussing results in decision forums,
- identifying underperforming or overperforming policies,
- guiding adjustments in caps, blocks and eligibility rules.

### 4. Bringing changes into the production policy

When data shows that a policy change makes sense, I help implement it in the central policy and data repository.

Typical changes I work on include:

- Creating and adjusting policy blocks related to regulatory or compliance rules (for example, bank compliance blocks in Mexico).
- Adding new policy input attributes, such as the date a customer became bank‑compliant.
- Adjusting input datasets consumed by the proactive limit policy.

In the policy flow, I:

- write the business context of the change,
- link the Pull Request to validation notebooks in Databricks,
- run ad‑hoc checks on sensitive datasets,
- follow the review process with data teams, local country teams and Core Limit Policies reviewers.

### 5. Documenting, aligning and learning

I use extensively:

- **Confluence, Google Docs and Google Slides** to:
  - understand and explain how the NPV framework for credit limits works,
  - document revenue components (interchange, interest, late fee, FX, etc.) and cost components (losses, capital, funding),
  - record experiment learnings, policy decisions and caps/blocks reviews.
- **Slack** to discuss technical questions and align with engineers, data scientists, other analysts and country teams.
- **Internal search** as a unified layer across documents, PRs, conversations, dashboards and metric definitions.

I also continuously study:

- credit and risk glossaries,
- documentation for risk and ADB models,
- materials on experiments and causal inference,
- best practices for monitoring and evaluating credit policies.

## Tools I use daily

- **Databricks** – exploring data, validating monitoring datasets, testing calculation logic and understanding metric behavior.
- **Data jobs repositories** – where I create and maintain monitoring pipelines for budget by country and risk band.
- **Internal dashboards** – building visual reports for policy and budget metrics.
- **Policy and data repository** – implementing changes in blocks and policy input datasets used by the limit policy in production.
- **Job orchestration and monitoring tools** – running and tracking staging and production data jobs.
- **GitHub** – opening, reviewing and tracking Pull Requests related to policy, monitoring and dashboards.
- **Confluence, Google Docs and Google Slides** – documenting policies, models, projects and decisions.
- **Slack** – daily communication with technical and business teams.
- **Internal search** – fast search across internal knowledge (docs, code, dashboards, metrics).
