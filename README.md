# taskord

> Taskord is a cozy task management system, focusing on encouraging user to track their tasks with appealing and intuitive design

## Features
- **Auth:**
  - [x] JWT authentication with refresh tokens
  - [ ] Client input validation
  - [ ] Email validation service

- **Dashboard:**
  - [ ] Display relevant data:
    - [ ] Tasks due today / highest priority
    - [ ] Calendar widget
    - [ ] Favorite / Recent projects

- **My Projects Page:**
  - [x] Display user project cards ([design](https://www.taskord.app/design))
  - [x] Create projects

- **Project Page:**
  - [ ] Project in-depth view
  - [x] Kanban Board
  - [ ] List view

- **My Tasks Page:**
  - [ ] Display all user tasks
    - [ ] Filtering
    - [ ] Show tasks that are not assigned to any project (ability to make it a daily to-do?)

- **Calendar Page:**
  - [ ] Show calendar with various timeframes that includes tasks due dates and other metadata

## Technology

- **Backend:** Axum (Rust) running GraphQL
- **Frontend:** Next.js
- **Database:** PostgreSQL

### Backend

Most of the decisions for backend and database design come from a place of *trying to stay on free tier* for services I'm using (fly.io, Vercel, Supabase). Both Rust and GraphQL are known for utilizing resources efficiently - GraphQL helps leveraging bandwidth and Rust has a low memory footprint.

So that's why I call it... **GREEN** stack:

> **G** - GraphQL
> 
> **R** - Rust
> 
> **E**
> **E**
> **N**....

..Anyways, point of this project is to learn technologies that benefit large-scale applications. Realistically, querying Supabase's Postgres directly from Next.js would ease the development, but I want to assume that project will grow: adding friends that you can assign tasks to, editing same project at the same time. I think this specific use case justifies GraphQL.

### Frontend

Let's talk about styling first. I'm using Tailwind for this projects and components from [shadcn/ui](https://ui.shadcn.com/) - which is a very nice way to start your own component library around Radix primitives. 
I'm trying to put my components in one place, so it's probably at [taskord.app/design](https://taskord.app/design).

<img width="350px" src="https://github.com/kshyr/taskord/assets/60661103/5eecc788-25bb-4cdd-8893-4c0de9e40bb5" />

Now, why Next.js and why do I care? Next includes a set of features that are essential for building SEO-, UX-friendly websites / webapps: routing, caching, SSR and optimizations for images, fonts, etc. With Next.js 13, React Server Components became default way of rendering / data fetching. So this rendering strategy prevents layout shifts (by rendering initial HTML on server), while giving you flexibility to when to wait for data when it's being fetched or when to display loading states.
All in all, Next.js keeps improving and I'm excited to see what comes next (pun not indended).

## UI Design
at [taskord.app/design](https://taskord.app/design)



