# HUC-internship
1. What Git and GitHub ?

GIT is an open-source, distributed version control system for tracking changes in software development and on different types of files over time.

Developers can:

Keep many versions of their work

Go back to an earlier version of their work in case something is broken.

Create a branch or work on new features without disturbing the code in the original repository.

Be able to merge work from two or more contributors.

Most operations of GIT can be performed without the use of the Internet or online access.

GitHub is a centralized or cloud-based location that hosts GIT repositories online.

GitHub provides:

A remote location for storing GIT projects and files on the Internet

Collaboration tools for teams

Code review and code discussion functions

Issue tracking and project management functionality

Integration with CI/CD tools and deployment tools

Reasons to use Git and GitHub

2. Why they are used ?

Git

Managing code changes.

Safeguarding against code loss.

Managing different code-versions.

Providing a way for developers to work on code in parallel (through branches).

GitHub

Sharing code with others.

Working collaboratively in teams.

Reviewing and improving code quality.

Managing open source and private projects.

Automating builds, testing and deployment.

3. Basic Git workflow

Initialize a local Git Repository - git init

Check on what files are present and the current status - git status

Place files into the staging area for "commit" - git add .

Make a commit - git commit -m "Please describe what you have done"

(Optional) Create a branch

1. git branch new-feature-name
   
2. git checkout new-feature-name
   
Merge branches into the main branch

1. git checkout main
   
2. git merge new-feature-name

4. How GitHub helps in team collaboration

GitHub allows for organized workflows between multiple developers using the following features that promote teamwork.

Features providing collaboration.

Remote Repository - One place where all users push and pull code.

Branch/PR - Developers propose changes to teammates → teammates review and comment → once approved, changes are merged.

Code Review/Commenting - Teammates can comment on line items improving code quality.

Issues/Project Boards - Tracking bugs, tasks and features.

Permissions - Access control for teammates' permissions.

Automation (GitHub Actions) - Automated builds, testing and deployment.
