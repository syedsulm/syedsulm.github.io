# syedsulm.github.io

Personal research portfolio of **Syed Sulman Ahmad** — PhD candidate in multiphase flows and acoustics at the University of Washington, Seattle.

**Live site → [syedsulm.github.io](https://syedsulm.github.io)**

Computational mechanics and data-driven control: finite-element acoustics and multiphase CFD on HPC clusters, FEA-validated mechanical design, and model-predictive / reinforcement-learning controllers built on reduced-order models.

---

## About the site

A single-file, dependency-free static site. No build step, no framework, no package manager — one `index.html` containing all markup, styling, and behavior. It loads fast, is trivial to fork, and will still work unchanged in ten years.

Every project is documented with a **Problem → Method → Impact** structure: the technical gap, the modeling and numerical approach used to close it, and the measurable outcome.

### Features

- Responsive layout, mobile navigation, and reduced-motion-safe scroll reveals
- Category filtering across CFD & Multiphase, FEA & Design, Control & ML, and Robotics
- Expandable project cards with quantified evidence bars
- Graceful fallbacks — a monogram renders if the avatar image is missing
- Zero third-party JavaScript; only Google Fonts is loaded externally

---

## Project index

| Project | Domain | Core method |
|---|---|---|
| "BASIC" underwater acoustic deterrent system (US Army ERDC, $340K) | Acoustics / CFD | FEM Helmholtz solves, parametric HPC sweeps, modal decomposition |
| Turbulent kinetic energy budget closure in multiphase sprays | CFD | Full anisotropic Reynolds stress tensor, third-order velocity moments |
| Model-predictive attitude control for post-capture spacecraft | Control | Quaternion dynamics, constrained QP under actuator saturation |
| Data-driven flight dynamics inside real-time MPC | Control / ML | SINDy sparse system ID on JSBSim 6-DoF data |
| RL–MPC hybrid control for a FANUC CRX arm | Robotics / ML | Domain randomization, sim-to-real transfer, MPC safety layer |
| Distributed multi-agent coordination | Robotics | Control barrier function QP safety filter, multi-agent RL |
| Topology-optimized FSAE chassis subcomponents | FEA | Density-based topology optimization, multi-load-case FEA |
| First-principles rear suspension design | FEA | Custom MATLAB kinematics, load-transfer analysis |
| Lightweight steering wheel and mounting interface | FEA | Load-path-driven lightweighting, von Mises validation |
| Fixed-wing VTOL and autonomous quadcopter UAVs | CFD / FEA | ANSYS Fluent campaigns cross-validated against wind tunnel |

---

## Repository structure

```
.
├── index.html          # entire site — markup, CSS, and JS
├── resume_sulman.pdf   # linked from the nav and hero
├── images/
│   └── avatar.jpg      # profile photo (falls back to a monogram if absent)
└── README.md
```

## Running locally

Open `index.html` directly in a browser, or serve it to match production behavior:

```bash
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Deployment

Hosted on **GitHub Pages** from the `main` branch, root folder. Pushing to `main` publishes within a couple of minutes.

```bash
git add .
git commit -m "Update portfolio"
git push origin main
```

---

## Tech stack

`HTML5` · `CSS3` (custom properties, grid, flexbox) · vanilla `JavaScript` (IntersectionObserver) · GitHub Pages

## Contact

- **Email** — [syedsulm@uw.edu](mailto:syedsulm@uw.edu)
- **LinkedIn** — [syed-sulman-ahmad](https://www.linkedin.com/in/syed-sulman-ahmad-phd-601a3a13b/)
- **Google Scholar** — [publications](https://scholar.google.com/citations?user=PfOpCnYAAAAJ&hl=en)
- **Location** — Seattle, WA

Open to full-time and internship roles in CFD/FEA, computational physics, controls, and applied machine learning, as well as research collaborations.

---

© Syed Sulman Ahmad. Site content and design are personal work; feel free to draw inspiration from the structure, but please don't republish the written content as your own.
