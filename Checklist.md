# Code Reviews

This documents how to review code. Helpful for joiners to stay aligned.

## Philosophy

Why do you perform code reviews? What are your [guiding principles](https://chiamakaikeanyi.dev/code-review-that-helps/) for these reviews?

## Preparing Code for Review

Preparation sets your reviewers up for success.

### Commit Messages

Make sure your commit messages are descriptive.

### GitHub PR Description

Your PR description should be an extension of your commit messages. Write about both what the commit changes, and how you implemented the change.

## Performing Code Reviews

### How to Review

-   Make two passes over the PR if it's substantial.
    -   On the first pass, come to an understanding of the code change at a high level.
    -   On the second pass, pay more attention to semantic details.

### Code Review Checklist

-   [ ] Check the branch locally.
-   [ ] Try to break the tests to see if they're comprehensive.

-   [ ] Are there changes to tests?
    -   [ ] Do they test important scenarios?
