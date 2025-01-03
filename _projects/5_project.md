---
layout: page
title: datefixR
description: R package for standardising dates in different formats or missing data
img: assets/img/sticker-480.webp
importance: 1
category: Software
github: https://github.com/ropensci/datefixR
--- 

<img src="/assets/img/sticker-480.webp" align="right" width="150" style="padding: 5px;"/>

`datefixR` standardizes dates in different formats or with missing data:
for example dates which have been provided from free text web forms.

There are many different formats dates are commonly represented with:
the order of day, month, or year can differ, different separators (“-”,
“/”, “.”, or whitespace) can be used, months can be numerical, names,
or abbreviations and year given as two digits or four. `datefixR` takes
dates in all these different formats and converts them to R’s built-in
date class. If `datefixR` cannot standardize a date, such as because it
is too malformed, then the user is told which date cannot be
standardized and the corresponding ID for the row. `datefixR` also
allows the imputation of missing days and months with user-controlled
behavior.

`datefixR` also supports dates provided in different languages and
provides translated warning and error messages. The following languages
are currently supported:

  - English
  - Français (French)
  - Deutsch (German)
  - español (Spanish)
  - Bahasa Indonesia (Indonesian)
  - Pусский (Russian)

<br>
Not familiar with R or want to quickly try out `datefixR`? Check out the
shiny app [here](https://nathansam.shinyapps.io/datefixr/).

<h2 class = "subheading"> Installation instructions </h2>

`datefixR` is now available on CRAN.

``` r
install.packages("datefixR")
```

The most up-to-date (hopefully) stable version of `datefixR` can be
installed via [r-universe](https://r-universe.dev/search)

``` r
# Enable universe(s) by ropensci
options(repos = c(
  ropensci = "https://ropensci.r-universe.dev",
  CRAN = "https://cloud.r-project.org"
))

install.packages("datefixR")
```

If you wish to live on the cutting edge of `datefixR` development, then
the development version can be installed via

``` r
if (!require("remotes")) install.packages("remotes")
remotes::install_github("ropensci/datefixR", "devel")
```

<h2 class = "subheading">  Package vignette </h2>

`datefixR` has a “Getting Started” vignette which describes how to use
this package in more detail than this page. View the vignette by either
calling

``` r
browseVignettes("datefixR")
```

or visiting the vignette on the [package
website](https://docs.ropensci.org/datefixR/articles/datefixR.html)

<h2 class = "subheading"> Usage </h2>

`datefixR` is most commonly used to standardize columns of date data in
a data frame or tibble. For this demonstration, we will use an example
toy dataset provided alongside the package, `exampledates`.

``` r
library(datefixR)
data("exampledates")
knitr::kable(exampledates)
```

| id | some.dates              | some.more.dates |
| :- | :---------------------- | :-------------- |
| 1  | 02 05 92                | 2015            |
| 2  | 01-04-2020              | 02/05/00        |
| 3  | 1996/05/01              | 05/1990         |
| 4  | 2020-may-01             | 2012-08         |
| 5  | 02-04-96                | jan 2020        |
| 6  | le 3 mars 2013          | 22.07.1977      |
| 7  | 7 de septiembre de 2014 | 13821           |

We can standardize these date columns by using the `fix_date_df()`
function and passing the data frame/tibble object and a character vector
of column names for the corresponding columns to fix.

``` r
fixed.df <- fix_date_df(exampledates, c("some.dates", "some.more.dates"))
knitr::kable(fixed.df)
```

| id | some.dates | some.more.dates |
| :- | :--------- | :-------------- |
| 1  | 1992-05-02 | 2015-07-01      |
| 2  | 2020-04-01 | 2000-05-02      |
| 3  | 1996-05-01 | 1990-05-01      |
| 4  | 2020-05-01 | 2012-08-01      |
| 5  | 1996-04-02 | 2020-01-01      |
| 6  | 2013-03-03 | 1977-07-22      |
| 7  | 2014-09-07 | 2007-11-04      |

By default, `datefixR` imputes missing days of the month as 01, and
missing months as 07 (July). However, this behavior can be modified via
the `day.impute` or `month.impute` arguments.

``` r
example.df <- data.frame(example = "1994")

fix_date_df(example.df, "example", month.impute = 1)
#>      example
#> 1 1994-01-01
```

Functions in `datefixR` assume day-first instead of month-first when
day, month, and year are all given (unless year is given first). However
this behavior can be modified by passing `format = "mdy"` to function
calls.

Numeric representations of dates, as used by either Excel or by R, are
also supported.

``` r
fix_date_char("19539")
#> [1] "2023-07-01"
fix_date_char("45108", excel = TRUE)
#> [1] "2023-07-01"
```

<h2 class = "subheading">  Limitations </h2>

Date and time data are often reported together in the same variable
(known as “datetime”). However datetime formats are not supported by
`datefixR`. The current rationale is this package is mostly used to
handle dates entered via free text web forms and it is much less common
for both date and time to be reported together in this input method.
However, if there is significant demand for support for datetime data in
the future this may added.

The package is written solely in R and seems fast enough for my current
use cases (a few hundred rows). However, I may convert the core for loop
to C++ in the future if speed becomes an issue.

<h2 class = "subheading"> Similar packages to datefixR </h2>

### `lubridate`

[`lubridate::guess_formats()`](https://lubridate.tidyverse.org/reference/guess_formats.html)
can be used to guess a date format and
[`lubridate::parse_date_time()`](https://lubridate.tidyverse.org/reference/parse_date_time.html)
calls this function when it attempts to parse a vector into a POSIXct
date-time object. However:

1.  When a date fails to parse in `{lubridate}` then the user is simply
    told how many dates failed to parse. In `datefixR` the user is told
    the ID (assumed to be the first column by default but can be
    user-specified) corresponding to the date which failed to parse and
    reports the considered date: making it much easier to figure out
    which dates supplied failed to parse and why.
2.  When imputing a missing day or month, there is no user-control over
    this behavior. For example, when imputing a missing month, the user
    may wish to impute July, the middle of the year, instead of January.
    However, January will always be imputed in `{lubridate}`. In
    `datefixR`, this behavior can be controlled by the `month.impute`
    argument.
3.  These functions require all possible date formats to be specified in
    the `orders` argument, which may result in a date format not being
    considered if the user forgets to list one of the possible formats.
    By contrast, `datefixR` only needs a format to be specified if
    month-first is to be preferred over day-first when guessing a date.

However, `{lubridate}` of course excels in general date manipulation and
is an excellent tool to use alongside `datefixR`.

### `anytime`

An alternative function is
[`anytime::anydate()`](https://dirk.eddelbuettel.com/code/anytime.html)
which also attempts to convert dates to a consistent format (POSIXct).
However `{anytime}` assumes year, month, and day have all been provided
and does not permit imputation. Moreover, if a date cannot be parsed,
then the date is converted to an NA object and no warning is raised-
which may lead to issues later in the analysis.

### `parsedate`

`parsedate::parse_date()` also attempts to solve the problem of handling
arbitrary dates and parses dates into the `POSIXct` type. Unfortunately,
`parse_date()` cannot handle years before 1970 – instead imputing the
year using the current year without raising a warning.

``` r
parsedate::parse_date("april 15 1969")
#> [1] "2024-04-15 UTC"
```

Moreover, `parse_date()` assumes dates are in MDY format and does not
allow the user to specify otherwise. However, `{parsedate}` has
excellent support for handling dates in ISO 8601 formats.

### `stringi`, `readr`, and `clock`

These packages all use [ICU
library](https://unicode-org.github.io/icu/userguide/format_parse/datetime/)
when parsing dates (via `stringi::stri_datetime_parse()`,
`readr::parse_date()`, or `clock::date_parse()`) and therefore all
behave very similarly. Notably, all of these functions require the date
format to be specified including specifying a priori if a date is
missing. Ultimately, this makes these packages unsuitable when numerous
dates in different formats must be parsed.

``` r
readr::parse_date("02/2010", "%m/%Y")
#> [1] "2010-02-01"
```

However, these packages have support for weekdays and months in around
211 locales whereas `datefixR` supports much fewer languages due to
support for additional languages needing to be implemented individually
by hand.

### Speed comparison

These alternative packages all use compiled code and therefore have the
potential to be orders of magnitude faster than `datefixR`. However, in
my own testing, I found `{anytime}` to actually be slower than
`datefixR`: consistently being over 3 times slower (testing up to 10,000
dates). `lubridate::parse_date_time()` (which is written in R) is an
order of magnitude of time faster than `datefixR` and
`lubridate::parse_date_time2()`, which is written in C but only allows
numeric dates, is even faster. If you are don’t mind not having control
over imputation, do not expect to have to deal with many dates which
fail to parse, are confident you will specify all potential formats the
supplied dates will be in, and you have many many dates to standardize
(hundreds of thousands or more), `{lubridate}`’s functions may be a
better option than `datefixR`.

If speed is an absolute priority and limited control over date parsing
is acceptable, then `stringi`, `readr`, and `clock` are all excellent
choices as they are around 10<sup>5</sup> times faster than `datefixR`.

<h2 class = "subheading"> Contributing to datefixR </h2>

If you are interested in contributing to `datefixR`, please read our
[contributing
guide](https://github.com/ropensci/datefixR/blob/main/.github/CONTRIBUTING.md).

Please note that this package is released with a [Contributor Code of
Conduct](https://ropensci.org/code-of-conduct/). By contributing to this
project, you agree to abide by its terms.

<h2 class = "subheading">  Citation </h2>

If you use this package in your research, please consider citing
`datefixR`\! An up-to-date citation can be obtained by running

``` r
citation("datefixR")
```
