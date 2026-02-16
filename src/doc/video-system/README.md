# SaaS Video Generation System - Documentation Hub

This folder contains the complete documentation system for generating high-quality SaaS explainer videos using Remotion, based on the `VideoTest` reference.

## 1. Analysis & Style
*   **[Reference Video Anatomy](./reference_video_anatomy.md)**: A deep dive into the pacing, structure, and "feel" of the reference video.
*   **[SaaS Video Guidelines](./saas_video_guidelines.md)**: The strict rules for Motion, Typography, and Color that must be followed.
*   **[Copywriting Guide](./copywriting_guide.md)**: How to write punchy scripts from raw product docs.

## 2. Technical Components
*   **[Component Library](./component_library.md)**: The reusable UI atoms (Buttons, Windows, Phones) available in the codebase.
*   **[Scene Library](./scene_library.md)**: The collection of "Battle-Tested" high-level scenes (Bubbles, Chatbots, Dashboards).
*   **[Creating New Scenes](./creating_new_scenes_guide.md)**: Standards for building *new* scenes that match the reference quality.

## 3. Workflow for Agents & Users
*   **[Workflow Input Requirements](./workflow_input_requirements.md)**: The template for Users to provide their project details.
*   **[System Prompt Rules](./system_prompt_rules.md)**: The instructions for the AI Agent to generate new videos using these docs.

## How to use
1.  **User**: Fills out `workflow_input_requirements.md` with raw product info.
2.  **Agent**: Reads `copywriting_guide.md` and generates a Motion Design Script.
3.  **Agent**: Reads `system_prompt_rules.md`, `saas_video_guidelines.md`.
4.  **Agent**: Selects scenes from `scene_library.md`.
5.  **Agent**: Generates code using components from `component_library.md`.
