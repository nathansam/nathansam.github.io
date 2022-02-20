---
layout: page
permalink: /contact/
title: Contact Page
description: "How to contact/find me online:"
nav: true
order: 5
---


<style type="text/css">
h2.category {
    color: var(--global-divider-color);
    border-bottom: 1px solid var(--global-divider-color);
    padding-top: 0.5rem;
    margin-top: 2rem;
    margin-bottom: 1rem;
    text-align: right;
}
</style>

<h2 class = "category"></h2>

## Contact me:

<a href="mailto:{{ site.email | encode_email }}" title="email"> E-mail me <i class="fas fa-envelope"></i></a>

<a href="https://twitter.com/{{ site.twitter_username }}" title="Twitter"> Twitter <i class="fab fa-twitter"></i></a>

<a href="https://www.researchgate.net/profile/{{site.research_gate_profile}}/" title="ResearchGate"> Research Gate <i class="ai ai-researchgate"></i></a>

<a href="https://www.linkedin.com/in/{{ site.linkedin_username }}" title="LinkedIn"> LinkedIn <i class="fab fa-linkedin"></i></a>

<h2 class = "category"></h2>

## Find me on:


<a href="https://scholar.google.com/citations?user={{ site.scholar_userid }}" title="Google Scholar"> Google Scholar <i class="ai ai-google-scholar"></i></a>

<a href="https://orcid.org/{{ site.orcid_id }}" title="ORCID"> ORCID <i class="ai ai-orcid"></i></a>

<a href="https://github.com/{{ site.github_username }}" title="GitHub">GitHub <i class="fab fa-github"></i></a>

<a href="{{ site.work_url }}" title="Work"> University profile <i class="fas fa-briefcase"></i></a>

<h2 class = "category"></h2>