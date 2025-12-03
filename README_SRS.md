# FYP Management System - SRS Documentation

## Overview

This directory contains the comprehensive **Software Requirements Specification (SRS)** documentation for the FYP Management System. The SRS document provides a complete technical and functional specification based on the existing UI implementation.

## Document Structure

The SRS documentation is split into two parts for better organization:

### 📄 [SRS_Document.md](SRS_Document.md) - Part 1
**Sections Covered:**
1. **Introduction**
   - Purpose, Scope, Definitions, References, Overview
2. **Overall Description**
   - Product Perspective
   - Product Functions
   - User Classes and Characteristics (5 roles detailed)
   - Operating Environment
   - Design and Implementation Constraints
   - Assumptions and Dependencies
3. **System Features and Requirements** (Partial)
   - Authentication and Authorization Requirements
   - Student Functional Requirements (8 requirements)
   - Supervisor Functional Requirements (6 requirements)

### 📄 [SRS_Document_Part2.md](SRS_Document_Part2.md) - Part 2
**Sections Covered:**
3. **System Features and Requirements** (Continued)
   - Coordinator Functional Requirements (8 requirements)
   - HOD Functional Requirements (7 requirements)
   - Evaluator Functional Requirements (5 requirements)
   - Non-Functional Requirements (Performance, Security, Usability, Reliability, Maintainability)
4. **Use Cases** (5 comprehensive use cases)
   - UC-001: Submit and Review Project Proposal
   - UC-002: Schedule Defense Using Excel Grid
   - UC-003: Evaluate Defense Using Rubric
   - UC-004: Submit and Resolve Student Appeal
   - UC-005: Compile and Publish Results
5. **User Stories** (40+ stories organized by role)
   - Student User Stories (9 stories)
   - Supervisor User Stories (7 stories)
   - Coordinator User Stories (8 stories)
   - HOD User Stories (7 stories)
   - Evaluator User Stories (5 stories)
6. **System Architecture**
   - High-Level Architecture Diagram
   - Component Architecture
   - Frontend and Backend Services
7. **Data Models**
   - Core Entity Definitions
   - Database Schema Recommendations
   - TypeScript Interfaces
8. **Interface Requirements**
   - User Interface Standards
   - API Interface Specifications
   - File Upload Interface

## Key Statistics

- **Total Pages**: 31 UI pages across 5 user roles
- **Functional Requirements**: 34 detailed requirements
- **Use Cases**: 5 comprehensive scenarios with alternative flows
- **User Stories**: 40+ stories with acceptance criteria
- **User Roles**: 5 distinct roles (Student, Supervisor, Coordinator, HOD, Evaluator)
- **Data Entities**: 15+ core entities defined

## How to Use This Documentation

### For Development Teams
1. Read Part 1 for system overview and initial requirements
2. Read Part 2 for complete functional requirements and use cases
3. Use User Stories for sprint planning and feature implementation
4. Reference Data Models for database schema design
5. Use Interface Requirements for API endpoint design

### For Stakeholders
1. Review Introduction (Part 1) for scope and benefits
2. Review User Classes (Part 1) to understand user roles
3. Review Use Cases (Part 2) to see workflows
4. Review User Stories (Part 2) to understand user needs

### For QA Teams
1. Use Functional Requirements as test specification
2. Use Use Cases for scenario-based testing
3. Use User Stories for acceptance testing
4. Reference Non-Functional Requirements for performance testing

### For Project Managers
1. Use User Stories for backlog creation
2. Prioritize based on "Must Have", "Should Have", "Could Have" labels
3. Use statistics for project planning
4. Reference constraints for risk assessment

## Technical Stack

**Current Implementation (Frontend Only):**
- React 18 + TypeScript
- Vite (Build tool)
- Tailwind CSS
- React Router DOM
- Lucide React (Icons)
- Recharts (Charts)
- date-fns (Date utilities)

**Backend (To Be Implemented):**
- RESTful API recommended
- Node.js / Express or similar
- PostgreSQL / MySQL database
- JWT Authentication
- File storage service
- Email notification service

## Related Documentation

- [FEATURES.md](FEATURES.md) - Complete implemented feature list
- [FYP_README.md](FYP_README.md) - System overview and quick start
- [COORDINATOR_GUIDE.md](COORDINATOR_GUIDE.md) - Coordinator-specific features
- [QUICK_START.md](QUICK_START.md) - User guide for all roles
- [OPTIMIZATION_SUMMARY.md](OPTIMIZATION_SUMMARY.md) - System optimization details

## Version Information

- **SRS Version**: 1.0
- **Date**: November 28, 2025
- **Status**: Complete - Ready for Backend Implementation
- **Based On**: Existing UI implementation (31 pages, 5 roles)

## Next Steps

1. **Backend Development**
   - Implement RESTful API based on Interface Requirements
   - Design and create database schema using Data Models
   - Implement authentication and authorization
   - Set up file storage service

2. **Integration**
   - Connect frontend to backend API
   - Replace mock data with real API calls
   - Implement loading and error states
   - Add form validation

3. **Testing**
   - Unit testing for all components
   - Integration testing for workflows
   - End-to-end testing for use cases
   - Performance testing per NFR specifications

4. **Deployment**
   - Set up production environment
   - Configure HTTPS and security
   - Set up email notifications
   - Configure file storage

## Contact

For questions or clarifications about this SRS documentation, please contact:
- Project Coordinator
- Development Team Lead
- System Analyst

---

**Document Generated**: November 28, 2025  
**Based On**: FYP Management System UI Implementation
