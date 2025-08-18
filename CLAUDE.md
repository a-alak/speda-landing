# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a static landing page project for SPEDA, a MedTech startup that automates data extraction from electronic health records (EHR). The project contains assets and specifications for recreating their single-page marketing website originally built on Wix.

## Project Structure

- `images/` - Contains all visual assets (AVIF format) including logos, photos, illustrations, and icons
- `specs.md` - Comprehensive technical specification document detailing the complete website structure, content, layout, and implementation requirements

## Key Implementation Details

### Site Architecture
- Single-page application with anchor-based navigation
- Fixed header with smooth scrolling to sections
- Modal contact form overlay ("Let's Meet")
- Responsive design that stacks sections vertically on mobile

### Main Sections (in order)
1. Hero section with anatomical model background
2. "The Issue" - problem statement with heart illustration
3. "Our Solution" - SPEDA's approach with stethoscope image  
4. "Supported By" - logos of supporting organizations
5. "Why you should work with us" - three feature columns (Automatic, Fast, Secure)
6. "Our Story & Our Vision" - company background with team photos
7. "Our Team" - grid of team member cards with LinkedIn links
8. Testimonials slider with Region Hovedstaden endorsement
9. FAQ accordion with 9 expandable questions
10. Final CTA with contact form modal

### Technical Requirements
- Smooth scrolling navigation between sections
- Modal overlay for contact form with form validation
- Testimonials carousel/slider functionality
- FAQ accordion with expand/collapse behavior
- Responsive image handling for all AVIF assets
- Purple color scheme (#8B4DEF primary) with off-white backgrounds

### Contact Form Modal
- Fields: First name, Last name, Email, Message
- reCAPTCHA integration required
- Alternative contact: hi@speda.io
- Focus trapping and accessible close functionality

### Team Section Note
Original team photos are protected by Wix and cannot be directly extracted. The current images/ folder contains placeholder patterns (4.avif, 4 (1).avif). Proper headshots need to be obtained separately.

## Content Source
All copy, structure details, FAQ content, and asset specifications are documented in `specs.md`. This file serves as the single source of truth for content and layout requirements.