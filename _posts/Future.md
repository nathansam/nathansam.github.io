---
layout: post
title:  "Are There Groups of Crohn's Disease Patients with Similar Faecal Calprotectin Over Time?"
date: 2025-04-27 12:00:00-0000
tags: calprotectin crohn's-disease
categories: PhD
comments: true
img: "fcal"
---

{% include figure.html path="assets/img/fcal-800.webp" class="img-fluid rounded z-depth-1" zoomable=true%}
<br>
People with Crohn's disease are likely very familiar with faecal calprotectin
kits; these tests use a stool sample to determine the level of gastrointestinal
inflammation a person has. Clinicians often use the
results from these kits to help determine how active a person's Crohn's disease
is without needing that person needing to undergo a colonoscopy. 

<br>

My colleagues at the University of Edinburgh have previously shown having a
calprotectin below $$250 \; (\mu g/g)$$ a year after diagnosis reduces the
likelihood of the disease worsening and needing hospitalisation or surgery due
to Crohn's disease {% cite Plevris2021 --file lcmm %}. We therefore know it is crucial that faecal calprotectin is
kept low early after diagnosis to improve the likelihood of a patient having a
good outcome. However, this previous work did not consider calprotectin as a
measurement which changes continuously over time and instead ony considered two
measurements for each person. 

<br>

We believed that across people with Crohn's disease, there were likely common patterns
for faecal calprotectin. To the best of our knowledge, no previous research had
attempted to determine if we can group people with Crohn's disease with other
Crohn's disease patients with similar calprotectin over time. In recent work, 
colleagues and I attempted to determine how many groups with distinct
calprotectin patterns can be reliably found, what these profiles look like, and
if being in one of these groups is associated with needing hospitalisation,
surgery or the disease progressing to worse behaviours such as the bowel wall
tightening or a fistula forming {% cite ConstantineCookeblog --file lcmm %}. We also aimed to determine if there are any significant associations between
belonging to one of these classes and either data usually available at the time
a patient is diagnosed or early treatments (within the first year of
diagnosis). 

<br>

For our study, we considered the calprotectin of 356 people with Crohn's disease
and followed them from diagnosis to five years afterwards. We have used highly
flexible models, known as latent class mixed models with natural cubic splines,
to determine the number of shared calprotectin profiles and their appearance.

<br>

We found four distinct groups which are presented below. These curves largely
reflect what is seen by gastroenterologists in the clinic. Being assigned to
class 2, which is characterised by having consistently high calprotectin, is
associated with being more likely to be hospitalised or experience disease
progression, but is not significantly associated with needing surgery. <br><br>

{% include figure.html path="assets/img/traj-800.webp" class="img-fluid rounded z-depth-1" zoomable=true%}
<br>
<p class = "text-sm text-gray-400">
    The four distinct calprotectin profiles we found. The gray lines are the
    calprotectin measurements for each subject deemed to have a similar profile
    to the red curve. 
</p>
<br>


Of data which is typically available at diagnosis, only smoking status and the presence
of upper gastrointestinal inflammation were found to be significantly associated
with which group a patient was assigned to. Smokers were more likely to
be assigned to class 1 or 2  whilst people with upper gastrointestinal disease
were less likely to be assigned to class 1. Whilst smokers being assigned to
class 2 makes sense as smoking is highly associated with worse disease courses,
we do not fully understand the association we found between smoking and class 1.
However, this may be due to smokers in class one giving up smoking after being
diagnosed. Unfortunately we do not have data for whether patients gave up
smoking so this is simply a potential theory. 

<br>

We found early biologic treatment being very highly associated with class
membership with those in class 2 being less likely to receive early biologic
treatment than the other groups. However, We were unable to accurately predict
class membership using all variables available at diagnosis and machine learning
techniques (random forest and multinomial logistic regression). <br><br>

Overall, we have shown latent class mixed models are an excellent tool for
finding subgroups of people with Crohn's disease with shared calprotectin
profiles which also appear to be associated with 
undesirable disease outcomes.

In the future, we want to extend this work to a tool which will predict a
patient's risk of surgery, hospitalisation, or worsening disease based on
symptoms, calprotectin, and other measures which will then  update as additional
measurements are taken. This could then help clinicians when making decisions
such as which treatment plan to place a patient on and how closely a patient
should be monitored. 

<br>

References
----------

<br>

{% bibliography --cited_in_order --file lcmm %}