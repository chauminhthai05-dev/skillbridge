import React, { useState, useEffect } from 'react';
import { Search, Star, Clock, CheckCircle, TrendingUp, MessageSquare, Calendar, Video, Filter, ArrowRight, Users, Award, Briefcase, MapPin, DollarSign, Heart, Share2, MessageCircle, ChevronDown, X, User } from 'lucide-react';

// Profile Icon Component
function ProfileIcon({ gender, size = 16 }) {
    const colorClass = gender === 'female' ? 'from-pink-500 to-pink-600' : 'from-blue-600 to-blue-700';
    const iconSize = size;

    return (
        <div
            className={`bg-gradient-to-br ${colorClass} rounded flex items-center justify-center`}
            style={{ width: `${size * 4}px`, height: `${size * 4}px` }}
        >
            <User className="text-white" size={iconSize * 2} />
        </div>
    );
}

// Mock data
const INDUSTRIES = [
    'Nursing/Healthcare',
    'Finance',
    'Sales',
    'Education',
    'Marketing',
    'Engineering',
    'Accounting',
    'Human Resources',
    'Legal',
    'Consulting',
    'Real Estate',
    'Hospitality',
    'Retail',
    'Manufacturing',
    'Construction',
    'Architecture',
    'Design',
    'Media/Journalism',
    'Public Relations',
    'Operations',
    'Supply Chain',
    'Project Management',
    'Data Science',
    'Cybersecurity',
    'Social Work',
    'Psychology',
    'Pharmacy',
    'Dentistry',
    'Veterinary',
    'Aviation',
    'Government',
    'Non-Profit',
    'Insurance',
    'Banking',
    'Investment Management',
    'Customer Success',
    'Product Management',
    'UX/UI Design',
    'Quality Assurance',
    'Research & Development'
];
const JOB_LEVELS = ['Entry Level', 'Mid-Level', 'Senior', 'New Grad', 'Career Change'];
const INTERVIEW_TYPES = ['Behavioral', 'Technical', 'Panel', 'MMI', 'Case Study'];

const MOCK_MENTORS = [
    // Nursing/Healthcare
    {
        id: 1,
        name: 'Sarah Chen',
        title: 'Senior RN, Interview Panel Lead',
        company: 'Vancouver General Hospital',
        industry: 'Nursing/Healthcare',
        rating: 4.9,
        reviews: 127,
        sessions: 450,
        price: 40,
        gender: 'female',
        specialties: ['MMI Specialist', 'Behavioral Focus', 'New Grad Support'],
        competencyScore: 98,
        availability: 'Available Today'
    },
    {
        id: 2,
        name: 'Michael Torres',
        title: 'Registered Nurse, Hiring Manager',
        company: 'BC Children\'s Hospital',
        industry: 'Nursing/Healthcare',
        rating: 4.8,
        reviews: 89,
        sessions: 320,
        price: 35,
        gender: 'male',
        specialties: ['Panel Interview Expert', 'Clinical Scenarios', 'Resume Review'],
        competencyScore: 96,
        availability: 'Available Tomorrow'
    },
    {
        id: 3,
        name: 'Jennifer Lee',
        title: 'Nurse Educator & Interviewer',
        company: 'St. Paul\'s Hospital',
        industry: 'Nursing/Healthcare',
        rating: 5.0,
        reviews: 203,
        sessions: 680,
        price: 50,
        gender: 'female',
        specialties: ['MMI Master', 'Ethics Questions', 'Communication Skills'],
        competencyScore: 99,
        availability: 'Available This Week'
    },
    {
        id: 4,
        name: 'Rachel Martinez',
        title: 'Critical Care RN & Recruiter',
        company: 'Toronto General Hospital',
        industry: 'Nursing/Healthcare',
        rating: 4.9,
        reviews: 178,
        sessions: 590,
        price: 100,
        gender: 'female',
        specialties: ['Critical Care Focus', 'Situational Questions', 'Career Transitions'],
        competencyScore: 97,
        availability: 'Available Today'
    },
    {
        id: 5,
        name: 'Amanda Rodriguez',
        title: 'Pediatric Nurse Practitioner',
        company: 'SickKids Hospital',
        industry: 'Nursing/Healthcare',
        rating: 4.9,
        reviews: 198,
        sessions: 640,
        price: 60,
        gender: 'female',
        specialties: ['Advanced Practice', 'Pediatric Focus', 'Clinical Competencies'],
        competencyScore: 98,
        availability: 'Available Tomorrow'
    },
    // Finance
    {
        id: 6,
        name: 'David Kim',
        title: 'Senior Financial Analyst',
        company: 'RBC Capital Markets',
        industry: 'Finance',
        rating: 4.9,
        reviews: 156,
        sessions: 520,
        price: 55,
        gender: 'male',
        specialties: ['Technical Interview', 'Case Study', 'Market Knowledge'],
        competencyScore: 97,
        availability: 'Available Today'
    },
    {
        id: 7,
        name: 'James Wilson',
        title: 'Investment Banking VP',
        company: 'Goldman Sachs',
        industry: 'Finance',
        rating: 5.0,
        reviews: 234,
        sessions: 780,
        price: 30,
        gender: 'male',
        specialties: ['IB Interviews', 'Case Studies', 'Fit Questions'],
        competencyScore: 99,
        availability: 'Available This Week'
    },
    {
        id: 8,
        name: 'Robert Chang',
        title: 'Corporate Finance Manager',
        company: 'TD Bank',
        industry: 'Finance',
        rating: 4.8,
        reviews: 134,
        sessions: 460,
        price: 70,
        gender: 'male',
        specialties: ['Financial Modeling', 'FP&A Interviews', 'Excel Tests'],
        competencyScore: 96,
        availability: 'Available Today'
    },
    // Sales
    {
        id: 9,
        name: 'Emily Thompson',
        title: 'Sales Director, Enterprise Software',
        company: 'Salesforce',
        industry: 'Sales',
        rating: 4.8,
        reviews: 145,
        sessions: 490,
        price: 20,
        gender: 'female',
        specialties: ['Sales Role Play', 'Negotiation Skills', 'Enterprise Sales'],
        competencyScore: 96,
        availability: 'Available Tomorrow'
    },
    {
        id: 10,
        name: 'Lisa Anderson',
        title: 'Regional Sales Manager',
        company: 'Oracle',
        industry: 'Sales',
        rating: 4.9,
        reviews: 176,
        sessions: 580,
        price: 25,
        gender: 'female',
        specialties: ['B2B Sales', 'Quota Achievement', 'Sales Presentations'],
        competencyScore: 97,
        availability: 'Available This Week'
    },
    // Education
    {
        id: 11,
        name: 'Marcus Johnson',
        title: 'High School Principal & Hiring Lead',
        company: 'Toronto District School Board',
        industry: 'Education',
        rating: 4.9,
        reviews: 167,
        sessions: 550,
        price: 35,
        gender: 'male',
        specialties: ['Teaching Interviews', 'Demo Lessons', 'Classroom Management'],
        competencyScore: 98,
        availability: 'Available Today'
    },
    {
        id: 12,
        name: 'Dr. Thomas Green',
        title: 'University Professor & Department Head',
        company: 'University of British Columbia',
        industry: 'Education',
        rating: 5.0,
        reviews: 145,
        sessions: 520,
        price: 45,
        gender: 'male',
        specialties: ['Academic Interviews', 'Research Presentations', 'Teaching Philosophy'],
        competencyScore: 99,
        availability: 'Available Tomorrow'
    },
    // Marketing
    {
        id: 13,
        name: 'Priya Patel',
        title: 'Marketing Manager, Tech Startups',
        company: 'Shopify',
        industry: 'Marketing',
        rating: 4.7,
        reviews: 112,
        sessions: 380,
        price: 50,
        gender: 'female',
        specialties: ['Digital Marketing', 'Portfolio Review', 'Growth Strategy'],
        competencyScore: 95,
        availability: 'Available This Week'
    },
    {
        id: 14,
        name: 'Sophia Martinez',
        title: 'Brand Strategy Director',
        company: 'Coca-Cola',
        industry: 'Marketing',
        rating: 4.8,
        reviews: 156,
        sessions: 510,
        price: 40,
        gender: 'female',
        specialties: ['Brand Strategy', 'Creative Briefs', 'Campaign Planning'],
        competencyScore: 97,
        availability: 'Available Today'
    },
    // Engineering
    {
        id: 15,
        name: 'Kevin Zhang',
        title: 'Senior Software Engineer & Tech Lead',
        company: 'Microsoft',
        industry: 'Engineering',
        rating: 5.0,
        reviews: 289,
        sessions: 890,
        price: 30,
        gender: 'male',
        specialties: ['System Design', 'Coding Interviews', 'Technical Leadership'],
        competencyScore: 99,
        availability: 'Available Today'
    },
    {
        id: 16,
        name: 'Alex Kumar',
        title: 'Full Stack Developer & Hiring Manager',
        company: 'Amazon',
        industry: 'Engineering',
        rating: 4.9,
        reviews: 267,
        sessions: 820,
        price: 60,
        gender: 'male',
        specialties: ['Algorithms', 'Behavioral Questions', 'System Architecture'],
        competencyScore: 98,
        availability: 'Available Today'
    },
    // Accounting
    {
        id: 17,
        name: 'Catherine Wong',
        title: 'Senior Auditor & CPA',
        company: 'Deloitte',
        industry: 'Accounting',
        rating: 4.8,
        reviews: 143,
        sessions: 470,
        price: 100,
        gender: 'female',
        specialties: ['Audit Interviews', 'Technical Questions', 'Big 4 Prep'],
        competencyScore: 97,
        availability: 'Available Today'
    },
    {
        id: 18,
        name: 'Richard Brown',
        title: 'Tax Manager',
        company: 'KPMG',
        industry: 'Accounting',
        rating: 4.9,
        reviews: 128,
        sessions: 430,
        price: 95,
        gender: 'male',
        specialties: ['Tax Interviews', 'Case Studies', 'Regulatory Knowledge'],
        competencyScore: 96,
        availability: 'Available Tomorrow'
    },
    // Human Resources
    {
        id: 19,
        name: 'Michelle Taylor',
        title: 'HR Director & Talent Acquisition',
        company: 'Google',
        industry: 'Human Resources',
        rating: 5.0,
        reviews: 201,
        sessions: 650,
        price: 55,
        gender: 'female',
        specialties: ['HR Interviews', 'Behavioral Focus', 'Compensation Discussions'],
        competencyScore: 98,
        availability: 'Available Today'
    },
    {
        id: 20,
        name: 'Daniel Foster',
        title: 'Recruitment Manager',
        company: 'LinkedIn',
        industry: 'Human Resources',
        rating: 4.8,
        reviews: 167,
        sessions: 540,
        price: 35,
        gender: 'male',
        specialties: ['Sourcing Strategies', 'Interview Techniques', 'Candidate Experience'],
        competencyScore: 96,
        availability: 'Available This Week'
    },
    // Legal
    {
        id: 21,
        name: 'Victoria Harrison',
        title: 'Corporate Lawyer & Legal Recruiter',
        company: 'Blake Cassels & Graydon',
        industry: 'Legal',
        rating: 4.9,
        reviews: 178,
        sessions: 590,
        price: 40,
        gender: 'female',
        specialties: ['Law Firm Interviews', 'Case Analysis', 'Client Communication'],
        competencyScore: 98,
        availability: 'Available Tomorrow'
    },
    {
        id: 22,
        name: 'Jonathan Miller',
        title: 'Senior Associate, Litigation',
        company: 'McCarthy Tétrault',
        industry: 'Legal',
        rating: 4.7,
        reviews: 134,
        sessions: 450,
        price: 30,
        gender: 'male',
        specialties: ['Legal Writing', 'Oral Advocacy', 'Research Skills'],
        competencyScore: 95,
        availability: 'Available Today'
    },
    // Consulting
    {
        id: 23,
        name: 'Olivia Bennett',
        title: 'Management Consultant',
        company: 'McKinsey & Company',
        industry: 'Consulting',
        rating: 5.0,
        reviews: 245,
        sessions: 780,
        price: 50,
        gender: 'female',
        specialties: ['Case Interviews', 'Market Sizing', 'Frameworks'],
        competencyScore: 99,
        availability: 'Available This Week'
    },
    {
        id: 24,
        name: 'Christopher Adams',
        title: 'Strategy Consultant',
        company: 'Boston Consulting Group',
        industry: 'Consulting',
        rating: 4.9,
        reviews: 212,
        sessions: 720,
        price: 55,
        gender: 'male',
        specialties: ['Business Cases', 'Problem Solving', 'Client Interactions'],
        competencyScore: 98,
        availability: 'Available Today'
    },
    // Real Estate
    {
        id: 25,
        name: 'Monica Sullivan',
        title: 'Commercial Real Estate Broker',
        company: 'CBRE',
        industry: 'Real Estate',
        rating: 4.8,
        reviews: 156,
        sessions: 510,
        price: 20,
        gender: 'female',
        specialties: ['Sales Interviews', 'Market Knowledge', 'Negotiation'],
        competencyScore: 96,
        availability: 'Available Today'
    },
    {
        id: 26,
        name: 'Patrick O\'Brien',
        title: 'Real Estate Development Manager',
        company: 'Brookfield Properties',
        industry: 'Real Estate',
        rating: 4.7,
        reviews: 123,
        sessions: 420,
        price: 80,
        gender: 'male',
        specialties: ['Project Interviews', 'Financial Analysis', 'Development Process'],
        competencyScore: 95,
        availability: 'Available Tomorrow'
    },
    // Data Science
    {
        id: 27,
        name: 'Dr. Maya Sharma',
        title: 'Lead Data Scientist',
        company: 'Meta',
        industry: 'Data Science',
        rating: 5.0,
        reviews: 234,
        sessions: 760,
        price: 45,
        gender: 'female',
        specialties: ['ML Interviews', 'SQL Tests', 'A/B Testing'],
        competencyScore: 99,
        availability: 'Available Today'
    },
    {
        id: 28,
        name: 'Benjamin Clark',
        title: 'Senior Data Analyst',
        company: 'Netflix',
        industry: 'Data Science',
        rating: 4.9,
        reviews: 189,
        sessions: 620,
        price: 25,
        gender: 'male',
        specialties: ['Data Analysis', 'Python/R Coding', 'Visualization'],
        competencyScore: 97,
        availability: 'Available This Week'
    },
    // Product Management
    {
        id: 29,
        name: 'Jessica Wu',
        title: 'Senior Product Manager',
        company: 'Apple',
        industry: 'Product Management',
        rating: 5.0,
        reviews: 267,
        sessions: 840,
        price: 50,
        gender: 'female',
        specialties: ['Product Sense', 'Execution', 'Technical PM'],
        competencyScore: 99,
        availability: 'Available Today'
    },
    {
        id: 30,
        name: 'Ryan Mitchell',
        title: 'Product Lead',
        company: 'Uber',
        industry: 'Product Management',
        rating: 4.8,
        reviews: 198,
        sessions: 650,
        price: 35,
        gender: 'male',
        specialties: ['Product Strategy', 'Metrics', 'Stakeholder Management'],
        competencyScore: 97,
        availability: 'Available Tomorrow'
    },
    // UX/UI Design
    {
        id: 31,
        name: 'Emma Richardson',
        title: 'Lead UX Designer',
        company: 'Adobe',
        industry: 'UX/UI Design',
        rating: 4.9,
        reviews: 176,
        sessions: 580,
        price: 20,
        gender: 'female',
        specialties: ['Portfolio Review', 'Design Challenges', 'User Research'],
        competencyScore: 98,
        availability: 'Available Today'
    },
    {
        id: 32,
        name: 'Tyler Ross',
        title: 'Senior UI Designer',
        company: 'Airbnb',
        industry: 'UX/UI Design',
        rating: 4.7,
        reviews: 145,
        sessions: 490,
        price: 70,
        gender: 'male',
        specialties: ['Visual Design', 'Design Systems', 'Prototyping'],
        competencyScore: 96,
        availability: 'Available This Week'
    },
    // Cybersecurity
    {
        id: 33,
        name: 'Nicole Harper',
        title: 'Security Engineer',
        company: 'Cisco',
        industry: 'Cybersecurity',
        rating: 4.9,
        reviews: 167,
        sessions: 550,
        price: 30,
        gender: 'female',
        specialties: ['Security Interviews', 'Threat Analysis', 'Compliance'],
        competencyScore: 97,
        availability: 'Available Today'
    },
    {
        id: 34,
        name: 'Andrew Patterson',
        title: 'Cybersecurity Analyst',
        company: 'IBM',
        industry: 'Cybersecurity',
        rating: 4.8,
        reviews: 134,
        sessions: 470,
        price: 60,
        gender: 'male',
        specialties: ['Technical Questions', 'Incident Response', 'Risk Assessment'],
        competencyScore: 96,
        availability: 'Available Tomorrow'
    },
    // Operations
    {
        id: 35,
        name: 'Laura Bennett',
        title: 'Operations Manager',
        company: 'FedEx',
        industry: 'Operations',
        rating: 4.8,
        reviews: 156,
        sessions: 520,
        price: 90,
        gender: 'female',
        specialties: ['Process Improvement', 'Logistics', 'Team Leadership'],
        competencyScore: 96,
        availability: 'Available Today'
    },
    {
        id: 36,
        name: 'Steven Cooper',
        title: 'Director of Operations',
        company: 'Walmart',
        industry: 'Operations',
        rating: 4.9,
        reviews: 178,
        sessions: 590,
        price: 85,
        gender: 'male',
        specialties: ['Operations Strategy', 'Supply Chain', 'Cost Management'],
        competencyScore: 97,
        availability: 'Available This Week'
    },
    // Additional Nursing/Healthcare
    {
        id: 37,
        name: 'Brandon Williams',
        title: 'Emergency Department Charge Nurse',
        company: 'Mount Sinai Hospital',
        industry: 'Nursing/Healthcare',
        rating: 4.8,
        reviews: 165,
        sessions: 520,
        price: 60,
        gender: 'male',
        specialties: ['Emergency Nursing', 'High-Pressure Scenarios', 'Leadership Questions'],
        competencyScore: 96,
        availability: 'Available Today'
    },
    {
        id: 38,
        name: 'Christina Park',
        title: 'Nurse Manager & Clinical Instructor',
        company: 'Ottawa Hospital',
        industry: 'Nursing/Healthcare',
        rating: 4.9,
        reviews: 187,
        sessions: 610,
        price: 45,
        gender: 'female',
        specialties: ['Management Interviews', 'Clinical Teaching', 'Policy Questions'],
        competencyScore: 97,
        availability: 'Available This Week'
    },
    {
        id: 39,
        name: 'Dr. James Patterson',
        title: 'Physician & Medical Hiring Committee',
        company: 'Calgary Health Services',
        industry: 'Nursing/Healthcare',
        rating: 5.0,
        reviews: 143,
        sessions: 480,
        price: 30,
        gender: 'male',
        specialties: ['Physician Interviews', 'Residency Applications', 'Medical Ethics'],
        competencyScore: 99,
        availability: 'Available Tomorrow'
    },
    // Additional Finance
    {
        id: 40,
        name: 'Alexandra Thompson',
        title: 'Portfolio Manager',
        company: 'BlackRock',
        industry: 'Finance',
        rating: 4.9,
        reviews: 189,
        sessions: 630,
        price: 25,
        gender: 'female',
        specialties: ['Asset Management', 'Investment Strategy', 'Client Presentations'],
        competencyScore: 98,
        availability: 'Available Tomorrow'
    },
    {
        id: 41,
        name: 'Samantha Lee',
        title: 'Risk Analyst & Compliance Lead',
        company: 'JP Morgan',
        industry: 'Finance',
        rating: 4.8,
        reviews: 145,
        sessions: 490,
        price: 30,
        gender: 'female',
        specialties: ['Risk Assessment', 'Regulatory Knowledge', 'Analytical Tests'],
        competencyScore: 96,
        availability: 'Available This Week'
    },
    {
        id: 42,
        name: 'Marcus Thompson',
        title: 'Private Equity Associate',
        company: 'Bain Capital',
        industry: 'Finance',
        rating: 5.0,
        reviews: 167,
        sessions: 560,
        price: 45,
        gender: 'male',
        specialties: ['PE Interviews', 'Deal Analysis', 'LBO Modeling'],
        competencyScore: 99,
        availability: 'Available Today'
    },
    // Additional Sales
    {
        id: 43,
        name: 'Derek Mitchell',
        title: 'VP of Sales',
        company: 'HubSpot',
        industry: 'Sales',
        rating: 5.0,
        reviews: 201,
        sessions: 670,
        price: 30,
        gender: 'male',
        specialties: ['Sales Leadership', 'Team Building', 'Strategic Selling'],
        competencyScore: 98,
        availability: 'Available Today'
    },
    {
        id: 44,
        name: 'Nicole Chang',
        title: 'Account Executive',
        company: 'Zoom',
        industry: 'Sales',
        rating: 4.7,
        reviews: 134,
        sessions: 450,
        price: 100,
        gender: 'female',
        specialties: ['Cold Calling', 'Discovery Calls', 'Product Demos'],
        competencyScore: 95,
        availability: 'Available Tomorrow'
    },
    {
        id: 45,
        name: 'Brian Foster',
        title: 'Business Development Manager',
        company: 'Adobe',
        industry: 'Sales',
        rating: 4.8,
        reviews: 158,
        sessions: 530,
        price: 70,
        gender: 'male',
        specialties: ['Partnership Development', 'Contract Negotiation', 'Relationship Building'],
        competencyScore: 96,
        availability: 'Available This Week'
    },
    // Additional Education
    {
        id: 46,
        name: 'Dr. Angela Martinez',
        title: 'Elementary School Principal',
        company: 'Vancouver School Board',
        industry: 'Education',
        rating: 4.8,
        reviews: 178,
        sessions: 590,
        price: 45,
        gender: 'female',
        specialties: ['Elementary Ed', 'Behavioral Strategies', 'Parent Communication'],
        competencyScore: 97,
        availability: 'Available Today'
    },
    {
        id: 47,
        name: 'Rebecca Collins',
        title: 'Curriculum Coordinator',
        company: 'Calgary Board of Education',
        industry: 'Education',
        rating: 4.7,
        reviews: 123,
        sessions: 420,
        price: 30,
        gender: 'female',
        specialties: ['Curriculum Development', 'Assessment Design', 'Educational Leadership'],
        competencyScore: 95,
        availability: 'Available This Week'
    },
    {
        id: 48,
        name: 'Dr. Kenneth Wright',
        title: 'College Dean',
        company: 'Seneca College',
        industry: 'Education',
        rating: 4.9,
        reviews: 156,
        sessions: 540,
        price: 30,
        gender: 'male',
        specialties: ['Higher Education', 'Administrative Roles', 'Program Development'],
        competencyScore: 98,
        availability: 'Available Tomorrow'
    },
    // Additional Marketing
    {
        id: 49,
        name: 'Justin Chen',
        title: 'Content Marketing Lead',
        company: 'HubSpot',
        industry: 'Marketing',
        rating: 4.8,
        reviews: 143,
        sessions: 480,
        price: 30,
        gender: 'male',
        specialties: ['Content Strategy', 'SEO', 'Storytelling'],
        competencyScore: 96,
        availability: 'Available Tomorrow'
    },
    {
        id: 50,
        name: 'Maria Rodriguez',
        title: 'Social Media Director',
        company: 'Nike',
        industry: 'Marketing',
        rating: 4.9,
        reviews: 167,
        sessions: 550,
        price: 35,
        gender: 'female',
        specialties: ['Social Media Strategy', 'Influencer Marketing', 'Community Management'],
        competencyScore: 97,
        availability: 'Available Today'
    },
    {
        id: 51,
        name: 'Andrew Park',
        title: 'Growth Marketing Manager',
        company: 'Dropbox',
        industry: 'Marketing',
        rating: 4.7,
        reviews: 134,
        sessions: 460,
        price: 25,
        gender: 'male',
        specialties: ['Growth Hacking', 'A/B Testing', 'Analytics'],
        competencyScore: 95,
        availability: 'Available This Week'
    },
    // Additional Engineering
    {
        id: 52,
        name: 'Diana Foster',
        title: 'Engineering Manager',
        company: 'Google',
        industry: 'Engineering',
        rating: 5.0,
        reviews: 234,
        sessions: 760,
        price: 40,
        gender: 'female',
        specialties: ['Leadership Interviews', 'Technical Management', 'Team Dynamics'],
        competencyScore: 99,
        availability: 'Available Tomorrow'
    },
    {
        id: 53,
        name: 'Carlos Mendez',
        title: 'Backend Engineer',
        company: 'Netflix',
        industry: 'Engineering',
        rating: 4.8,
        reviews: 198,
        sessions: 640,
        price: 40,
        gender: 'male',
        specialties: ['Backend Systems', 'Scalability', 'Database Design'],
        competencyScore: 97,
        availability: 'Available This Week'
    },
    {
        id: 54,
        name: 'Rachel Kim',
        title: 'Mobile Engineering Lead',
        company: 'Spotify',
        industry: 'Engineering',
        rating: 4.9,
        reviews: 176,
        sessions: 590,
        price: 35,
        gender: 'female',
        specialties: ['iOS/Android', 'Mobile Architecture', 'Performance Optimization'],
        competencyScore: 98,
        availability: 'Available Today'
    },
    // Additional Accounting
    {
        id: 55,
        name: 'Jennifer Davis',
        title: 'Controller',
        company: 'EY',
        industry: 'Accounting',
        rating: 4.9,
        reviews: 167,
        sessions: 550,
        price: 25,
        gender: 'female',
        specialties: ['Financial Reporting', 'Internal Controls', 'Management Accounting'],
        competencyScore: 98,
        availability: 'Available Today'
    },
    {
        id: 56,
        name: 'Michael Stevens',
        title: 'Forensic Accountant',
        company: 'PwC',
        industry: 'Accounting',
        rating: 4.8,
        reviews: 145,
        sessions: 490,
        price: 30,
        gender: 'male',
        specialties: ['Forensic Accounting', 'Fraud Detection', 'Investigative Skills'],
        competencyScore: 96,
        availability: 'Available This Week'
    },
    // Additional Human Resources
    {
        id: 57,
        name: 'Stephanie Harrison',
        title: 'HR Business Partner',
        company: 'IBM',
        industry: 'Human Resources',
        rating: 4.8,
        reviews: 156,
        sessions: 520,
        price: 35,
        gender: 'female',
        specialties: ['Employee Relations', 'Performance Management', 'Conflict Resolution'],
        competencyScore: 97,
        availability: 'Available Tomorrow'
    },
    {
        id: 58,
        name: 'Robert Chen',
        title: 'Talent Development Manager',
        company: 'Facebook',
        industry: 'Human Resources',
        rating: 4.9,
        reviews: 178,
        sessions: 590,
        price: 40,
        gender: 'male',
        specialties: ['Learning & Development', 'Career Coaching', 'Succession Planning'],
        competencyScore: 97,
        availability: 'Available Today'
    },
    // Additional Legal
    {
        id: 59,
        name: 'Amanda Wright',
        title: 'In-House Counsel',
        company: 'Rogers Communications',
        industry: 'Legal',
        rating: 4.8,
        reviews: 145,
        sessions: 480,
        price: 25,
        gender: 'female',
        specialties: ['Corporate Law', 'Contract Negotiation', 'Risk Management'],
        competencyScore: 96,
        availability: 'Available This Week'
    },
    {
        id: 60,
        name: 'Thomas Anderson',
        title: 'Partner, Intellectual Property',
        company: 'Osler',
        industry: 'Legal',
        rating: 5.0,
        reviews: 167,
        sessions: 560,
        price: 55,
        gender: 'male',
        specialties: ['IP Law', 'Patent Litigation', 'Partnership Track'],
        competencyScore: 99,
        availability: 'Available Tomorrow'
    },
    // Additional Consulting
    {
        id: 61,
        name: 'Sarah Johnson',
        title: 'Senior Consultant',
        company: 'Bain & Company',
        industry: 'Consulting',
        rating: 4.9,
        reviews: 189,
        sessions: 640,
        price: 50,
        gender: 'female',
        specialties: ['Fit Interviews', 'Data Analysis', 'Presentation Skills'],
        competencyScore: 98,
        availability: 'Available Tomorrow'
    },
    {
        id: 62,
        name: 'David Mitchell',
        title: 'Technology Consultant',
        company: 'Accenture',
        industry: 'Consulting',
        rating: 4.7,
        reviews: 156,
        sessions: 530,
        price: 35,
        gender: 'male',
        specialties: ['Digital Transformation', 'Tech Implementation', 'Change Management'],
        competencyScore: 96,
        availability: 'Available Today'
    },
    // Additional Real Estate
    {
        id: 63,
        name: 'Laura Bennett',
        title: 'Residential Real Estate Agent',
        company: 'RE/MAX',
        industry: 'Real Estate',
        rating: 4.6,
        reviews: 134,
        sessions: 450,
        price: 95,
        gender: 'female',
        specialties: ['Client Relations', 'Property Marketing', 'Closing Deals'],
        competencyScore: 94,
        availability: 'Available This Week'
    },
    {
        id: 64,
        name: 'Gregory Taylor',
        title: 'Real Estate Investment Analyst',
        company: 'Cadillac Fairview',
        industry: 'Real Estate',
        rating: 4.8,
        reviews: 145,
        sessions: 480,
        price: 60,
        gender: 'male',
        specialties: ['Investment Analysis', 'Market Research', 'Portfolio Management'],
        competencyScore: 96,
        availability: 'Available Today'
    },
    // Additional Data Science
    {
        id: 65,
        name: 'Sophie Anderson',
        title: 'Machine Learning Engineer',
        company: 'Tesla',
        industry: 'Data Science',
        rating: 4.9,
        reviews: 201,
        sessions: 670,
        price: 30,
        gender: 'female',
        specialties: ['Deep Learning', 'Model Deployment', 'Computer Vision'],
        competencyScore: 98,
        availability: 'Available Tomorrow'
    },
    {
        id: 66,
        name: 'Derek Patterson',
        title: 'Data Engineering Manager',
        company: 'Uber',
        industry: 'Data Science',
        rating: 4.8,
        reviews: 178,
        sessions: 590,
        price: 30,
        gender: 'male',
        specialties: ['Data Pipelines', 'ETL Processes', 'Big Data Systems'],
        competencyScore: 97,
        availability: 'Available Today'
    },
    // Additional Product Management
    {
        id: 67,
        name: 'Natalie Roberts',
        title: 'Group Product Manager',
        company: 'Slack',
        industry: 'Product Management',
        rating: 4.9,
        reviews: 189,
        sessions: 630,
        price: 40,
        gender: 'female',
        specialties: ['Team Leadership', 'Roadmap Planning', 'Cross-functional Collaboration'],
        competencyScore: 98,
        availability: 'Available This Week'
    },
    {
        id: 68,
        name: 'Kevin Harris',
        title: 'Product Manager',
        company: 'LinkedIn',
        industry: 'Product Management',
        rating: 4.7,
        reviews: 167,
        sessions: 560,
        price: 20,
        gender: 'male',
        specialties: ['B2B Products', 'User Research', 'Product Analytics'],
        competencyScore: 96,
        availability: 'Available Today'
    },
    // Additional UX/UI Design
    {
        id: 69,
        name: 'Melissa Turner',
        title: 'Product Designer',
        company: 'Stripe',
        industry: 'UX/UI Design',
        rating: 4.8,
        reviews: 167,
        sessions: 550,
        price: 45,
        gender: 'female',
        specialties: ['End-to-End Design', 'Wireframing', 'Usability Testing'],
        competencyScore: 97,
        availability: 'Available Tomorrow'
    },
    {
        id: 70,
        name: 'Christopher Lee',
        title: 'UX Research Lead',
        company: 'Twitter',
        industry: 'UX/UI Design',
        rating: 4.9,
        reviews: 156,
        sessions: 530,
        price: 80,
        gender: 'male',
        specialties: ['User Research', 'Qualitative Methods', 'Research Presentations'],
        competencyScore: 97,
        availability: 'Available Today'
    },
    // Additional Cybersecurity
    {
        id: 71,
        name: 'Christina Moore',
        title: 'Information Security Manager',
        company: 'Microsoft',
        industry: 'Cybersecurity',
        rating: 4.9,
        reviews: 178,
        sessions: 590,
        price: 35,
        gender: 'female',
        specialties: ['Security Management', 'Policy Development', 'Team Leadership'],
        competencyScore: 98,
        availability: 'Available This Week'
    },
    {
        id: 72,
        name: 'Jason Williams',
        title: 'Penetration Tester',
        company: 'Mandiant',
        industry: 'Cybersecurity',
        rating: 4.7,
        reviews: 145,
        sessions: 490,
        price: 25,
        gender: 'male',
        specialties: ['Penetration Testing', 'Vulnerability Assessment', 'Ethical Hacking'],
        competencyScore: 95,
        availability: 'Available Today'
    },
    // Additional Operations
    {
        id: 73,
        name: 'Kimberly Davis',
        title: 'Operations Analyst',
        company: 'Amazon',
        industry: 'Operations',
        rating: 4.7,
        reviews: 134,
        sessions: 460,
        price: 60,
        gender: 'female',
        specialties: ['Data-Driven Operations', 'KPI Tracking', 'Optimization'],
        competencyScore: 95,
        availability: 'Available Tomorrow'
    },
    {
        id: 74,
        name: 'Matthew Thompson',
        title: 'Supply Chain Manager',
        company: 'Procter & Gamble',
        industry: 'Operations',
        rating: 4.8,
        reviews: 167,
        sessions: 550,
        price: 100,
        gender: 'male',
        specialties: ['Supply Chain Management', 'Vendor Relations', 'Inventory Control'],
        competencyScore: 96,
        availability: 'Available Today'
    }
];

const MOCK_POSTS = [
    {
        id: 1,
        company: 'BC Children\'s Hospital',
        role: 'New Grad RN',
        interviewType: 'Panel Interview + MMI',
        industry: 'Nursing/Healthcare',
        postedBy: 'Anonymous User',
        postedDate: '2 hours ago',
        likes: 42,
        comments: 8,
        topQuestions: [
            'Tell me about a time you advocated for a patient',
            'How would you handle a disagreement with a physician?',
            'Describe your approach to managing multiple critical patients'
        ],
        tips: 'Very structured. 3 interviewers. Bring examples of teamwork and patient advocacy.'
    },
    {
        id: 2,
        company: 'Vancouver General Hospital',
        role: 'ICU Registered Nurse',
        interviewType: 'Behavioral + Clinical Scenarios',
        industry: 'Nursing/Healthcare',
        postedBy: 'Anonymous User',
        postedDate: '1 day ago',
        likes: 67,
        comments: 15,
        topQuestions: [
            'Walk me through your clinical decision-making process',
            'How do you prioritize care in high-pressure situations?',
            'Tell me about a mistake you made and how you handled it'
        ],
        tips: 'They really focus on critical thinking. Be ready to explain your rationale step-by-step.'
    },
    {
        id: 3,
        company: 'St. Paul\'s Hospital',
        role: 'Emergency Department RN',
        interviewType: 'MMI Station Format',
        industry: 'Nursing/Healthcare',
        postedBy: 'Anonymous User',
        postedDate: '3 days ago',
        likes: 89,
        comments: 21,
        topQuestions: [
            'Ethical scenario: Family wants to continue treatment, patient wants to stop',
            'You witness a colleague making an error - what do you do?',
            'How do you maintain professionalism during high-stress emergencies?'
        ],
        tips: 'Multiple stations, 7 minutes each. Practice ethical frameworks and stay calm!'
    }
];

const MENTOR_AMAS = [
    {
        id: 1,
        mentor: 'Sarah Chen',
        mentorTitle: 'Senior RN, Interview Panel Lead',
        mentorGender: 'female',
        title: 'AMA: I\'ve interviewed 200+ nurses - Ask me anything!',
        responses: 34,
        likes: 128,
        postedDate: '5 days ago',
        preview: 'Hey SkillBridge community! I\'ve been on hiring panels for VGH for 3 years. Happy to answer questions about what we look for...'
    }
];

export default function SkillBridge() {
    const [currentView, setCurrentView] = useState('home'); // home, p2p, marketplace, community
    const [user, setUser] = useState(null);
    const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false);
    const [signUpData, setSignUpData] = useState({ name: '', email: '', industry: '', level: '' });

    // P2P State
    const [p2pIndustry, setP2pIndustry] = useState('');
    const [p2pLevel, setP2pLevel] = useState('');
    const [isMatching, setIsMatching] = useState(false);
    const [matchFound, setMatchFound] = useState(false);
    const [currentQuestion, setCurrentQuestion] = useState('');
    const [sessionActive, setSessionActive] = useState(false);
    const [sessionComplete, setSessionComplete] = useState(false);
    const [feedbackRating, setFeedbackRating] = useState(0);

    // Marketplace State
    const [selectedIndustryFilter, setSelectedIndustryFilter] = useState('All');
    const [selectedMentor, setSelectedMentor] = useState(null);
    const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

    // Community State
    const [isPostDigestModalOpen, setIsPostDigestModalOpen] = useState(false);
    const [digestData, setDigestData] = useState({
        company: '',
        role: '',
        interviewType: '',
        question1: '',
        question2: '',
        question3: '',
        tips: ''
    });
    const [selectedPost, setSelectedPost] = useState(null);

    const handleSignUp = () => {
        if (signUpData.name && signUpData.email && signUpData.industry && signUpData.level) {
            setUser(signUpData);
            setIsSignUpModalOpen(false);
            setCurrentView('home');
        }
    };

    const startP2PMatching = () => {
        if (!user) {
            setIsSignUpModalOpen(true);
            return;
        }
        if (!p2pIndustry || !p2pLevel) return;

        setIsMatching(true);
        setTimeout(() => {
            setIsMatching(false);
            setMatchFound(true);
            setCurrentQuestion('Tell me about a time you had to handle a difficult situation with a colleague. How did you approach it?');
        }, 3000);
    };

    const startSession = () => {
        setMatchFound(false);
        setSessionActive(true);
        setTimeout(() => {
            setSessionActive(false);
            setSessionComplete(true);
        }, 5000); // Simulated 5-second session for demo
    };

    const submitFeedback = () => {
        if (feedbackRating > 0) {
            setSessionComplete(false);
            setFeedbackRating(0);
            setP2pIndustry('');
            setP2pLevel('');
        }
    };

    const openBookingModal = (mentor) => {
        if (!user) {
            setIsSignUpModalOpen(true);
            return;
        }
        setSelectedMentor(mentor);
        setIsBookingModalOpen(true);
    };

    const [bookingConfirmed, setBookingConfirmed] = useState(false);
    const [confirmedBooking, setConfirmedBooking] = useState(null);

    const confirmBooking = () => {
        setConfirmedBooking({
            mentor: selectedMentor,
            bookingId: 'SB-' + Math.random().toString(36).substr(2, 9).toUpperCase(),
            date: new Date().toLocaleDateString(),
            time: '2:00 PM'
        });
        setIsBookingModalOpen(false);
        setBookingConfirmed(true);
        setSelectedMentor(null);
    };

    const submitInterviewDigest = () => {
        if (digestData.company && digestData.role && digestData.interviewType &&
            digestData.question1 && digestData.question2 && digestData.question3) {
            alert('Interview Digest posted successfully! Thank you for contributing to the community.');
            setIsPostDigestModalOpen(false);
            setDigestData({
                company: '',
                role: '',
                interviewType: '',
                question1: '',
                question2: '',
                question3: '',
                tips: ''
            });
        }
    };

    const filteredMentors = selectedIndustryFilter === 'All'
        ? MOCK_MENTORS
        : MOCK_MENTORS.filter(m => m.industry === selectedIndustryFilter);

    return (
        <div className="min-h-screen w-[100vw] bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
            {/* Header */}
            <header className="bg-white/80 backdrop-blur-xl shadow-xl sticky top-0 z-50 border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex justify-between items-center">
                        <div className="flex items-center space-x-3 cursor-pointer group" onClick={() => setCurrentView('home')}>
                            <div className="bg-gradient-to-br from-blue-600 to-blue-800 p-3 rounded-xl shadow-lg group-hover:shadow-xl transition-all duration-300">
                                <Briefcase className="text-white" size={28} />
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-700 to-indigo-700 bg-clip-text text-transparent">
                                    SkillBridge
                                </h1>
                                <p className="text-xs text-gray-600 font-medium">Professional Interview Coaching</p>
                            </div>
                        </div>

                        <nav className="hidden md:flex space-x-3">
                            <button
                                onClick={() => setCurrentView('p2p')}
                                className={`px-6 py-2.5 rounded-xl font-semibold transition-all duration-300 ${currentView === 'p2p'
                                    ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg shadow-blue-500/30'
                                    : 'text-gray-700 hover:bg-gray-100'
                                    }`}
                            >
                                Free Practice
                            </button>
                            <button
                                onClick={() => setCurrentView('marketplace')}
                                className={`px-6 py-2.5 rounded-xl font-semibold transition-all duration-300 ${currentView === 'marketplace'
                                    ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg shadow-blue-500/30'
                                    : 'text-gray-700 hover:bg-gray-100'
                                    }`}
                            >
                                Find Mentors
                            </button>
                            <button
                                onClick={() => setCurrentView('community')}
                                className={`px-6 py-2.5 rounded-xl font-semibold transition-all duration-300 ${currentView === 'community'
                                    ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg shadow-blue-500/30'
                                    : 'text-gray-700 hover:bg-gray-100'
                                    }`}
                            >
                                Community
                            </button>
                        </nav>

                        {user ? (
                            <div className="flex items-center space-x-3">
                                <div className="text-right hidden sm:block">
                                    <p className="text-sm font-bold text-gray-900">{user.name}</p>
                                    <p className="text-xs text-gray-600">{user.industry}</p>
                                </div>
                                <div className="w-11 h-11 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold shadow-lg ring-2 ring-blue-100">
                                    {user.name.charAt(0)}
                                </div>
                            </div>
                        ) : (
                            <button
                                onClick={() => setIsSignUpModalOpen(true)}
                                className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-2.5 rounded-xl font-bold hover:from-blue-700 hover:to-blue-800 shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 transition-all duration-300"
                            >
                                Sign Up Free
                            </button>
                        )}
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {bookingConfirmed && (
                    <div className="mb-8 bg-green-50 border-2 border-green-500 rounded-xl p-8 shadow-lg">
                        <div className="text-center">
                            <div className="bg-green-500 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                                <CheckCircle className="text-white" size={40} />
                            </div>
                            <h2 className="text-3xl font-bold text-green-900 mb-2">Booking Confirmed! 🎉</h2>
                            <p className="text-green-800 mb-6">
                                Your session with {confirmedBooking.mentor.name} has been confirmed.
                            </p>

                            <div className="bg-white rounded-lg p-6 max-w-2xl mx-auto mb-6">
                                <div className="grid md:grid-cols-2 gap-4 text-left">
                                    <div>
                                        <p className="text-sm text-gray-600">Booking ID</p>
                                        <p className="font-semibold text-gray-900">{confirmedBooking.bookingId}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-600">Mentor</p>
                                        <p className="font-semibold text-gray-900">{confirmedBooking.mentor.name}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-600">Session Type</p>
                                        <p className="font-semibold text-gray-900">1-on-1 Mock Interview</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-600">Duration</p>
                                        <p className="font-semibold text-gray-900">60 minutes</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-600">Price</p>
                                        <p className="font-semibold text-green-600">${confirmedBooking.mentor.price} CAD</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-600">Payment Status</p>
                                        <p className="font-semibold text-green-600">✓ Confirmed</p>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-blue-50 rounded-lg p-4 max-w-2xl mx-auto mb-6">
                                <p className="text-sm text-blue-900">
                                    📧 <strong>Confirmation email sent!</strong> Check your inbox for session details and video meeting link.
                                </p>
                            </div>

                            <div className="flex justify-center space-x-4">
                                <button
                                    onClick={() => {
                                        setBookingConfirmed(false);
                                        setConfirmedBooking(null);
                                    }}
                                    className="bg-white border-2 border-green-500 text-green-700 px-6 py-3 rounded-lg font-medium hover:bg-green-50 transition-all"
                                >
                                    Book Another Session
                                </button>
                                <button
                                    onClick={() => {
                                        setBookingConfirmed(false);
                                        setConfirmedBooking(null);
                                        setCurrentView('home');
                                    }}
                                    className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg font-medium hover:shadow-lg transition-all"
                                >
                                    Return to Home
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {currentView === 'home' && <HomePage setCurrentView={setCurrentView} user={user} setIsSignUpModalOpen={setIsSignUpModalOpen} />}
                {currentView === 'p2p' && (
                    <P2PView
                        p2pIndustry={p2pIndustry}
                        setP2pIndustry={setP2pIndustry}
                        p2pLevel={p2pLevel}
                        setP2pLevel={setP2pLevel}
                        isMatching={isMatching}
                        matchFound={matchFound}
                        sessionActive={sessionActive}
                        sessionComplete={sessionComplete}
                        currentQuestion={currentQuestion}
                        feedbackRating={feedbackRating}
                        setFeedbackRating={setFeedbackRating}
                        startP2PMatching={startP2PMatching}
                        startSession={startSession}
                        submitFeedback={submitFeedback}
                        setCurrentView={setCurrentView}
                    />
                )}
                {currentView === 'marketplace' && (
                    <MarketplaceView
                        selectedIndustryFilter={selectedIndustryFilter}
                        setSelectedIndustryFilter={setSelectedIndustryFilter}
                        filteredMentors={filteredMentors}
                        openBookingModal={openBookingModal}
                    />
                )}
                {currentView === 'community' && (
                    <CommunityView
                        setIsPostDigestModalOpen={setIsPostDigestModalOpen}
                        selectedPost={selectedPost}
                        setSelectedPost={setSelectedPost}
                        openBookingModal={openBookingModal}
                    />
                )}
            </main>

            {/* Sign Up Modal */}
            {isSignUpModalOpen && (
                <Modal onClose={() => setIsSignUpModalOpen(false)} title="Join SkillBridge">
                    <div className="space-y-4">
                        <input
                            type="text"
                            placeholder="Full Name"
                            value={signUpData.name}
                            onChange={(e) => setSignUpData({ ...signUpData, name: e.target.value })}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                        <input
                            type="email"
                            placeholder="Email Address"
                            value={signUpData.email}
                            onChange={(e) => setSignUpData({ ...signUpData, email: e.target.value })}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                        <select
                            value={signUpData.industry}
                            onChange={(e) => setSignUpData({ ...signUpData, industry: e.target.value })}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                            <option value="">Select Your Industry</option>
                            {INDUSTRIES.map(ind => <option key={ind} value={ind}>{ind}</option>)}
                        </select>
                        <select
                            value={signUpData.level}
                            onChange={(e) => setSignUpData({ ...signUpData, level: e.target.value })}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                            <option value="">Select Your Level</option>
                            {JOB_LEVELS.map(level => <option key={level} value={level}>{level}</option>)}
                        </select>
                        <button
                            onClick={handleSignUp}
                            className="w-full bg-blue-700 text-white py-3 rounded-full font-semibold hover:bg-blue-800 transition-all"
                        >
                            Create Account
                        </button>
                    </div>
                </Modal>
            )}

            {/* Booking Modal */}
            {isBookingModalOpen && selectedMentor && (
                <Modal onClose={() => setIsBookingModalOpen(false)} title="Book Session">
                    <div className="space-y-4">
                        <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                            <ProfileIcon gender={selectedMentor.gender} size={16} />
                            <div>
                                <h3 className="font-semibold text-lg">{selectedMentor.name}</h3>
                                <p className="text-sm text-gray-600">{selectedMentor.title}</p>
                                <p className="text-sm text-gray-500">{selectedMentor.company}</p>
                            </div>
                        </div>

                        <div className="border-t border-b border-gray-200 py-4">
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-gray-600">Session Duration</span>
                                <span className="font-semibold">60 minutes</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-gray-600">Price</span>
                                <span className="font-semibold text-xl text-blue-600">${selectedMentor.price} CAD</span>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Select Date & Time</label>
                            <input
                                type="datetime-local"
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">What would you like to focus on?</label>
                            <textarea
                                rows="3"
                                placeholder="e.g., Behavioral questions, MMI practice, resume review..."
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        <button
                            onClick={confirmBooking}
                            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-medium hover:shadow-lg transition-all"
                        >
                            Confirm Booking - ${selectedMentor.price}
                        </button>
                    </div>
                </Modal>
            )}

            {/* Post Digest Modal */}
            {isPostDigestModalOpen && (
                <Modal onClose={() => setIsPostDigestModalOpen(false)} title="Post Interview Digest">
                    <div className="space-y-4">
                        <p className="text-sm text-gray-600">Help the community by sharing your recent interview experience!</p>

                        <input
                            type="text"
                            placeholder="Company Name (e.g., BC Children's Hospital)"
                            value={digestData.company}
                            onChange={(e) => setDigestData({ ...digestData, company: e.target.value })}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        />

                        <input
                            type="text"
                            placeholder="Role/Level (e.g., New Grad RN)"
                            value={digestData.role}
                            onChange={(e) => setDigestData({ ...digestData, role: e.target.value })}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        />

                        <select
                            value={digestData.interviewType}
                            onChange={(e) => setDigestData({ ...digestData, interviewType: e.target.value })}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="">Select Interview Type</option>
                            {INTERVIEW_TYPES.map(type => <option key={type} value={type}>{type}</option>)}
                        </select>

                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">Top 3 Questions Asked:</label>
                            <input
                                type="text"
                                placeholder="Question 1"
                                value={digestData.question1}
                                onChange={(e) => setDigestData({ ...digestData, question1: e.target.value })}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                            />
                            <input
                                type="text"
                                placeholder="Question 2"
                                value={digestData.question2}
                                onChange={(e) => setDigestData({ ...digestData, question2: e.target.value })}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                            />
                            <input
                                type="text"
                                placeholder="Question 3"
                                value={digestData.question3}
                                onChange={(e) => setDigestData({ ...digestData, question3: e.target.value })}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        <textarea
                            rows="3"
                            placeholder="Any tips or additional insights? (Optional)"
                            value={digestData.tips}
                            onChange={(e) => setDigestData({ ...digestData, tips: e.target.value })}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        />

                        <button
                            onClick={submitInterviewDigest}
                            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-medium hover:shadow-lg transition-all"
                        >
                            Post Digest
                        </button>
                    </div>
                </Modal>
            )}
        </div>
    );
}

// Home Page Component
function HomePage({ setCurrentView, user, setIsSignUpModalOpen }) {
    return (
        <div className="space-y-8">
            {/* Hero Section */}
            <div className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 rounded-2xl shadow-2xl p-12 text-white">
                {/* Decorative elements */}
                <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>

                <div className="relative z-10">
                    <h2 className="text-6xl font-extrabold mb-6 leading-tight">
                        Master Your Next<br />
                        <span className="bg-gradient-to-r from-yellow-300 to-orange-400 bg-clip-text text-transparent">
                            Interview
                        </span>
                    </h2>
                    <p className="text-xl mb-8 max-w-2xl opacity-95 leading-relaxed">
                        Practice for free with peers instantly, or book verified industry experts.
                        From Nursing to Finance, we've got your interview prep covered.
                    </p>
                    {!user && (
                        <button
                            onClick={() => setIsSignUpModalOpen(true)}
                            className="group bg-white text-blue-700 px-10 py-4 rounded-xl font-bold text-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 flex items-center space-x-2"
                        >
                            <span>Get Started Free</span>
                            <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
                        </button>
                    )}
                </div>
            </div>

            {/* Three Pillars */}
            <div className="grid md:grid-cols-3 gap-8">
                {/* Free P2P */}
                <div className="group relative bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-all duration-300 border border-gray-100 overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-green-400/20 to-emerald-500/20 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500"></div>

                    <div className="relative z-10">
                        <div className="bg-gradient-to-br from-green-400 to-emerald-600 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                            <Users className="text-white" size={32} />
                        </div>
                        <h3 className="text-2xl font-bold mb-4 text-gray-900">Free Peer Practice</h3>
                        <p className="text-gray-600 mb-6 leading-relaxed">
                            Get matched instantly with candidates from any industry for live 15-minute mock interviews.
                            Practice answering questions and giving feedback.
                        </p>
                        <ul className="space-y-3 mb-6">
                            <li className="flex items-center text-sm text-gray-700">
                                <div className="bg-green-100 rounded-full p-1 mr-3">
                                    <CheckCircle className="text-green-600" size={18} />
                                </div>
                                <span className="font-medium">Instant matching</span>
                            </li>
                            <li className="flex items-center text-sm text-gray-700">
                                <div className="bg-green-100 rounded-full p-1 mr-3">
                                    <CheckCircle className="text-green-600" size={18} />
                                </div>
                                <span className="font-medium">Industry-specific prompts</span>
                            </li>
                            <li className="flex items-center text-sm text-gray-700">
                                <div className="bg-green-100 rounded-full p-1 mr-3">
                                    <CheckCircle className="text-green-600" size={18} />
                                </div>
                                <span className="font-medium">100% free forever</span>
                            </li>
                        </ul>
                        <button
                            onClick={() => setCurrentView('p2p')}
                            className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white py-3.5 rounded-xl font-bold hover:from-green-600 hover:to-emerald-700 shadow-lg shadow-green-500/30 hover:shadow-xl hover:shadow-green-500/40 transition-all duration-300"
                        >
                            Start Practicing Now
                        </button>
                    </div>
                </div>

                {/* Expert Marketplace */}
                <div className="group relative bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-all duration-300 border-2 border-blue-200 overflow-hidden">
                    <div className="absolute top-4 right-4 bg-gradient-to-r from-amber-400 to-orange-500 text-white text-xs px-4 py-1.5 rounded-full font-bold shadow-md z-20 flex items-center space-x-1">
                        <TrendingUp size={14} />
                        <span>POPULAR</span>
                    </div>

                    <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-blue-400/20 to-indigo-500/20 rounded-full -ml-16 -mt-16 group-hover:scale-150 transition-transform duration-500"></div>

                    <div className="relative z-10">
                        <div className="bg-gradient-to-br from-blue-500 to-indigo-700 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                            <Award className="text-white" size={32} />
                        </div>
                        <h3 className="text-2xl font-bold mb-4 text-gray-900">Verified Experts</h3>
                        <p className="text-gray-700 mb-6 leading-relaxed">
                            Book 1-on-1 sessions with industry professionals who actually conduct interviews.
                            Get expert feedback and insider tips.
                        </p>
                        <ul className="space-y-3 mb-6">
                            <li className="flex items-center text-sm text-gray-700">
                                <div className="bg-blue-100 rounded-full p-1 mr-3">
                                    <CheckCircle className="text-blue-700" size={18} />
                                </div>
                                <span className="font-medium">Manually vetted mentors</span>
                            </li>
                            <li className="flex items-center text-sm text-gray-700">
                                <div className="bg-blue-100 rounded-full p-1 mr-3">
                                    <CheckCircle className="text-blue-700" size={18} />
                                </div>
                                <span className="font-medium">Industry-specific expertise</span>
                            </li>
                            <li className="flex items-center text-sm text-gray-700">
                                <div className="bg-blue-100 rounded-full p-1 mr-3">
                                    <CheckCircle className="text-blue-700" size={18} />
                                </div>
                                <span className="font-medium">Flexible scheduling</span>
                            </li>
                        </ul>
                        <button
                            onClick={() => setCurrentView('marketplace')}
                            className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-3.5 rounded-xl font-bold hover:from-blue-700 hover:to-indigo-800 shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 transition-all duration-300"
                        >
                            Browse Mentors
                        </button>
                    </div>
                </div>

                {/* Community Hub */}
                <div className="group relative bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-all duration-300 border border-gray-100 overflow-hidden">
                    <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-br from-violet-400/20 to-purple-500/20 rounded-full -ml-16 -mb-16 group-hover:scale-150 transition-transform duration-500"></div>

                    <div className="relative z-10">
                        <div className="bg-gradient-to-br from-violet-500 to-purple-700 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                            <MessageSquare className="text-white" size={32} />
                        </div>
                        <h3 className="text-2xl font-bold mb-4 text-gray-900">Community Intel</h3>
                        <p className="text-gray-600 mb-6 leading-relaxed">
                            Access real interview questions from recent candidates. Learn what companies actually ask
                            and connect with mentors through Q&As.
                        </p>
                        <ul className="space-y-3 mb-6">
                            <li className="flex items-center text-sm text-gray-700">
                                <div className="bg-violet-100 rounded-full p-1 mr-3">
                                    <CheckCircle className="text-violet-600" size={18} />
                                </div>
                                <span className="font-medium">Real interview questions</span>
                            </li>
                            <li className="flex items-center text-sm text-gray-700">
                                <div className="bg-violet-100 rounded-full p-1 mr-3">
                                    <CheckCircle className="text-violet-600" size={18} />
                                </div>
                                <span className="font-medium">Mentor Q&A sessions</span>
                            </li>
                            <li className="flex items-center text-sm text-gray-700">
                                <div className="bg-violet-100 rounded-full p-1 mr-3">
                                    <CheckCircle className="text-violet-600" size={18} />
                                </div>
                                <span className="font-medium">Searchable database</span>
                            </li>
                        </ul>
                        <button
                            onClick={() => setCurrentView('community')}
                            className="w-full bg-gradient-to-r from-violet-500 to-purple-700 text-white py-3.5 rounded-xl font-bold hover:from-violet-600 hover:to-purple-800 shadow-lg shadow-violet-500/30 hover:shadow-xl hover:shadow-violet-500/40 transition-all duration-300"
                        >
                            Explore Community
                        </button>
                    </div>
                </div>
            </div>

            {/* Stats Section */}
            <div className="relative overflow-hidden bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 rounded-2xl shadow-2xl p-12 text-white">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10"></div>
                <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500 rounded-full mix-blend-overlay filter blur-3xl opacity-20"></div>

                <div className="relative z-10 grid md:grid-cols-4 gap-8 text-center">
                    <div className="group">
                        <div className="text-6xl font-extrabold mb-3 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300">10K+</div>
                        <div className="text-blue-200 text-sm font-semibold uppercase tracking-wider">Practice Sessions</div>
                    </div>
                    <div className="group">
                        <div className="text-6xl font-extrabold mb-3 bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300">500+</div>
                        <div className="text-blue-200 text-sm font-semibold uppercase tracking-wider">Verified Mentors</div>
                    </div>
                    <div className="group">
                        <div className="text-6xl font-extrabold mb-3 bg-gradient-to-r from-violet-400 to-purple-400 bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300">50+</div>
                        <div className="text-blue-200 text-sm font-semibold uppercase tracking-wider">Industries</div>
                    </div>
                    <div className="group">
                        <div className="text-6xl font-extrabold mb-3 bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300">4.9★</div>
                        <div className="text-blue-200 text-sm font-semibold uppercase tracking-wider">Average Rating</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

// P2P View Component
function P2PView({
    p2pIndustry, setP2pIndustry, p2pLevel, setP2pLevel,
    isMatching, matchFound, sessionActive, sessionComplete,
    currentQuestion, feedbackRating, setFeedbackRating,
    startP2PMatching, startSession, submitFeedback, setCurrentView
}) {
    return (
        <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
                <h2 className="text-4xl font-bold mb-4">Free Peer Practice</h2>
                <p className="text-xl text-gray-600">Get matched instantly for a live mock interview</p>
            </div>

            {!isMatching && !matchFound && !sessionActive && !sessionComplete && (
                <div className="bg-white rounded-xl shadow-lg p-8">
                    <div className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Your Industry</label>
                            <select
                                value={p2pIndustry}
                                onChange={(e) => setP2pIndustry(e.target.value)}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="">Select your industry</option>
                                {INDUSTRIES.map(ind => <option key={ind} value={ind}>{ind}</option>)}
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Your Level</label>
                            <select
                                value={p2pLevel}
                                onChange={(e) => setP2pLevel(e.target.value)}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="">Select your level</option>
                                {JOB_LEVELS.map(level => <option key={level} value={level}>{level}</option>)}
                            </select>
                        </div>

                        <button
                            onClick={startP2PMatching}
                            disabled={!p2pIndustry || !p2pLevel}
                            className="w-full bg-gradient-to-r from-green-600 to-green-700 text-white py-4 rounded-lg font-medium text-lg hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Find a Practice Partner
                        </button>

                        <div className="bg-blue-50 p-4 rounded-lg">
                            <h4 className="font-semibold text-blue-900 mb-2">How it works:</h4>
                            <ul className="space-y-1 text-sm text-blue-800">
                                <li>• You'll be matched with another candidate in ~10 seconds</li>
                                <li>• One person interviews, one person asks questions (you'll alternate)</li>
                                <li>• Each session is 15 minutes with structured prompts</li>
                                <li>• Provide feedback at the end to help each other improve</li>
                            </ul>
                        </div>
                    </div>
                </div>
            )}

            {isMatching && (
                <div className="bg-white rounded-xl shadow-lg p-12 text-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mx-auto mb-6"></div>
                    <h3 className="text-2xl font-bold mb-2">Finding your practice partner...</h3>
                    <p className="text-gray-600">This usually takes less than 10 seconds</p>
                </div>
            )}

            {matchFound && (
                <div className="bg-white rounded-xl shadow-lg p-8">
                    <div className="text-center mb-8">
                        <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                            <CheckCircle className="text-green-600" size={40} />
                        </div>
                        <h3 className="text-2xl font-bold mb-2">Match Found!</h3>
                        <p className="text-gray-600">You've been paired with Alex Chen (Finance, Mid-Level)</p>
                    </div>

                    <div className="bg-blue-50 p-6 rounded-lg mb-6">
                        <h4 className="font-semibold text-blue-900 mb-3">Your Interview Question:</h4>
                        <p className="text-blue-800 text-lg">{currentQuestion}</p>
                    </div>

                    <div className="bg-yellow-50 p-4 rounded-lg mb-6">
                        <p className="text-sm text-yellow-800">
                            <strong>Remember:</strong> You'll be the interviewer first. Listen actively and ask follow-up questions!
                        </p>
                    </div>

                    <button
                        onClick={startSession}
                        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-lg font-medium text-lg hover:shadow-lg transition-all flex items-center justify-center space-x-2"
                    >
                        <Video size={24} />
                        <span>Start Video Session</span>
                    </button>
                </div>
            )}

            {sessionActive && (
                <div className="bg-white rounded-xl shadow-lg p-8">
                    <div className="text-center">
                        <div className="bg-red-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
                            <Video className="text-red-600" size={40} />
                        </div>
                        <h3 className="text-2xl font-bold mb-2">Session in Progress</h3>
                        <p className="text-gray-600 mb-8">Time remaining: 14:32</p>

                        <div className="bg-gray-100 p-6 rounded-lg mb-6">
                            <p className="text-gray-700 italic">
                                "This is a simulated session. In the real app, you'd see a live video interface here."
                            </p>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-blue-50 p-4 rounded-lg">
                                <p className="text-sm font-medium text-blue-900">Current Question</p>
                                <p className="text-xs text-blue-700 mt-1">{currentQuestion}</p>
                            </div>
                            <div className="bg-purple-50 p-4 rounded-lg">
                                <p className="text-sm font-medium text-purple-900">Your Role</p>
                                <p className="text-xs text-purple-700 mt-1">Interviewer (asking questions)</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {sessionComplete && (
                <div className="bg-white rounded-xl shadow-lg p-8">
                    <h3 className="text-2xl font-bold mb-6 text-center">Session Complete! 🎉</h3>

                    <div className="bg-gray-50 p-6 rounded-lg mb-6">
                        <h4 className="font-semibold mb-3">Rate your partner's performance:</h4>
                        <div className="flex justify-center space-x-4 mb-4">
                            {[1, 2, 3, 4, 5].map(star => (
                                <button
                                    key={star}
                                    onClick={() => setFeedbackRating(star)}
                                    className="transition-all"
                                >
                                    <Star
                                        size={40}
                                        className={feedbackRating >= star ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}
                                    />
                                </button>
                            ))}
                        </div>
                        <button
                            onClick={submitFeedback}
                            disabled={feedbackRating === 0}
                            className="w-full bg-green-600 text-white py-3 rounded-lg font-medium hover:bg-green-700 transition-all disabled:opacity-50"
                        >
                            Submit Feedback
                        </button>
                    </div>

                    <div className="bg-blue-50 p-6 rounded-lg border-2 border-blue-200">
                        <h4 className="font-semibold text-blue-900 mb-2">Want Expert Feedback?</h4>
                        <p className="text-blue-800 text-sm mb-4">
                            You just practiced for free! Now take it to the next level with a verified industry expert
                            who can provide professional insights and targeted coaching.
                        </p>
                        <button
                            onClick={() => setCurrentView('marketplace')}
                            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-medium hover:shadow-lg transition-all"
                        >
                            Browse Expert Mentors →
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

// Marketplace View Component
function MarketplaceView({ selectedIndustryFilter, setSelectedIndustryFilter, filteredMentors, openBookingModal }) {
    const [searchQuery, setSearchQuery] = useState('');
    const [showIndustryDropdown, setShowIndustryDropdown] = useState(false);

    // Filter mentors by search query and industry
    const displayedMentors = filteredMentors.filter(mentor => {
        const matchesSearch = searchQuery === '' ||
            mentor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            mentor.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            mentor.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
            mentor.specialties.some(spec => spec.toLowerCase().includes(searchQuery.toLowerCase()));

        return matchesSearch;
    });

    return (
        <div>
            <div className="text-center mb-8">
                <h2 className="text-4xl font-bold mb-4">Verified Expert Mentors</h2>
                <p className="text-xl text-gray-600">Book 1-on-1 sessions with industry professionals</p>
            </div>

            {/* Search and Filter Bar */}
            <div className="bg-white rounded-xl shadow-lg p-6 mb-8 border border-gray-200">
                <div className="flex flex-col md:flex-row gap-4">
                    {/* Search Bar */}
                    <div className="flex-1 relative">
                        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={22} />
                        <input
                            type="text"
                            placeholder="Search by name, company, or specialty..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-12 pr-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                        />
                    </div>

                    {/* Industry Filter Dropdown */}
                    <div className="relative">
                        <button
                            onClick={() => setShowIndustryDropdown(!showIndustryDropdown)}
                            className="flex items-center space-x-2 px-5 py-3 border-2 border-gray-300 rounded-lg hover:border-blue-500 transition-all whitespace-nowrap bg-white font-semibold"
                        >
                            <Filter size={20} />
                            <span className="text-sm">
                                {selectedIndustryFilter === 'All' ? 'All Industries' : selectedIndustryFilter}
                            </span>
                            <ChevronDown size={18} className={`transition-transform ${showIndustryDropdown ? 'rotate-180' : ''}`} />
                        </button>

                        {showIndustryDropdown && (
                            <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-2xl border-2 border-gray-200 z-50 max-h-96 overflow-y-auto">
                                <div className="p-2">
                                    <button
                                        onClick={() => {
                                            setSelectedIndustryFilter('All');
                                            setShowIndustryDropdown(false);
                                        }}
                                        className={`w-full text-left px-4 py-3 rounded-lg transition-all text-sm font-semibold ${selectedIndustryFilter === 'All'
                                            ? 'bg-blue-700 text-white'
                                            : 'hover:bg-gray-100'
                                            }`}
                                    >
                                        All Industries
                                    </button>
                                    {INDUSTRIES.map(ind => (
                                        <button
                                            key={ind}
                                            onClick={() => {
                                                setSelectedIndustryFilter(ind);
                                                setShowIndustryDropdown(false);
                                            }}
                                            className={`w-full text-left px-4 py-3 rounded-lg transition-all text-sm font-semibold ${selectedIndustryFilter === ind
                                                ? 'bg-blue-700 text-white'
                                                : 'hover:bg-gray-100'
                                                }`}
                                        >
                                            {ind}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Active Filter Tags */}
                <div className="mt-4 flex flex-wrap gap-2">
                    {selectedIndustryFilter !== 'All' && (
                        <div className="flex items-center space-x-2 bg-blue-100 text-blue-900 px-4 py-2 rounded-lg text-sm font-bold shadow-sm">
                            <span>{selectedIndustryFilter}</span>
                            <button
                                onClick={() => setSelectedIndustryFilter('All')}
                                className="hover:bg-blue-200 rounded-full p-1"
                            >
                                <X size={14} />
                            </button>
                        </div>
                    )}
                    {searchQuery && (
                        <div className="flex items-center space-x-2 bg-gray-200 text-gray-900 px-4 py-2 rounded-lg text-sm font-bold shadow-sm">
                            <span>Search: "{searchQuery}"</span>
                            <button
                                onClick={() => setSearchQuery('')}
                                className="hover:bg-gray-300 rounded-full p-1"
                            >
                                <X size={14} />
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* Results Count */}
            <div className="mb-6 text-gray-700 text-sm font-bold">
                {displayedMentors.length} result{displayedMentors.length !== 1 ? 's' : ''}
            </div>

            {/* Mentor Grid */}
            {displayedMentors.length > 0 ? (
                <div className="grid md:grid-cols-2 gap-6">
                    {displayedMentors.map(mentor => (
                        <div key={mentor.id} className="group bg-white rounded-2xl shadow-lg p-6 hover:shadow-2xl transition-all duration-300 border border-gray-200 hover:border-blue-300 relative overflow-hidden">
                            {/* Decorative gradient */}
                            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500/10 to-indigo-500/10 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500"></div>

                            <div className="relative z-10">
                                <div className="flex items-start space-x-4 mb-4">
                                    <ProfileIcon gender={mentor.gender} size={16} />
                                    <div className="flex-1">
                                        <div className="flex items-start justify-between">
                                            <div>
                                                <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-700 transition-colors">{mentor.name}</h3>
                                                <p className="text-sm text-gray-600 font-medium">{mentor.title}</p>
                                                <p className="text-sm text-blue-700 font-bold">{mentor.company}</p>
                                            </div>
                                            <div className="bg-gradient-to-r from-green-400 to-emerald-500 text-white text-xs px-3 py-1.5 rounded-full font-bold shadow-md">
                                                {mentor.availability}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center space-x-4 mb-4 pb-4 border-b border-gray-200">
                                    <div className="flex items-center bg-amber-50 px-3 py-1.5 rounded-lg">
                                        <Star className="text-amber-500 fill-amber-500 mr-1" size={18} />
                                        <span className="font-bold text-gray-900">{mentor.rating}</span>
                                        <span className="text-gray-500 ml-1 text-sm">({mentor.reviews})</span>
                                    </div>
                                    <div className="flex items-center text-gray-600 bg-gray-50 px-3 py-1.5 rounded-lg">
                                        <Clock className="mr-1.5" size={18} />
                                        <span className="font-semibold text-sm">{mentor.sessions} sessions</span>
                                    </div>
                                </div>

                                <div className="mb-4">
                                    <div className="flex items-center mb-3">
                                        <span className="text-xs font-bold text-gray-600 uppercase tracking-wider">Specialties</span>
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        {mentor.specialties.map((spec, idx) => (
                                            <span key={idx} className="bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 text-xs px-3 py-2 rounded-lg font-bold border border-blue-200 hover:border-blue-300 transition-colors">
                                                {spec}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                                    <div>
                                        <span className="text-gray-500 text-xs font-bold uppercase tracking-wide">From</span>
                                        <div className="text-3xl font-extrabold bg-gradient-to-r from-blue-700 to-indigo-700 bg-clip-text text-transparent">
                                            ${mentor.price}
                                            <span className="text-base text-gray-500 font-normal">/hr</span>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => openBookingModal(mentor)}
                                        className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white px-6 py-3 rounded-xl font-bold hover:from-blue-700 hover:to-indigo-800 shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 transition-all duration-300 group-hover:scale-105"
                                    >
                                        Book Session
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-center py-16 bg-white rounded-xl shadow-sm">
                    <div className="text-gray-400 mb-4">
                        <Search size={64} className="mx-auto" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">No mentors found</h3>
                    <p className="text-gray-600 mb-6">
                        Try adjusting your search or filters to find more mentors
                    </p>
                    <button
                        onClick={() => {
                            setSearchQuery('');
                            setSelectedIndustryFilter('All');
                        }}
                        className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-all"
                    >
                        Clear All Filters
                    </button>
                </div>
            )}
        </div>
    );
}

// Community View Component
function CommunityView({ setIsPostDigestModalOpen, selectedPost, setSelectedPost, openBookingModal }) {
    return (
        <div>
            <div className="text-center mb-8">
                <h2 className="text-4xl font-bold mb-4">Community Interview Hub</h2>
                <p className="text-xl text-gray-600">Real questions from recent interviews</p>
            </div>

            <div className="mb-6 flex justify-between items-center">
                <div className="flex space-x-2">
                    <button className="bg-white text-gray-900 border-b-2 border-gray-900 px-4 py-2 font-semibold">
                        Interview Digests
                    </button>
                    <button className="bg-white text-gray-600 px-4 py-2 font-medium hover:text-gray-900">
                        Mentor AMAs
                    </button>
                </div>
                <button
                    onClick={() => setIsPostDigestModalOpen(true)}
                    className="bg-blue-700 text-white px-6 py-2 rounded-full font-semibold hover:bg-blue-800 transition-all"
                >
                    + Post Digest
                </button>
            </div>

            {/* Mentor AMA Section */}
            <div className="mb-8">
                {MENTOR_AMAS.map(ama => (
                    <div key={ama.id} className="bg-blue-50 rounded-lg p-6 mb-4 border-2 border-blue-200">
                        <div className="flex items-start space-x-4">
                            <ProfileIcon gender={ama.mentorGender} size={14} />
                            <div className="flex-1">
                                <div className="flex items-center space-x-2 mb-2">
                                    <span className="bg-blue-700 text-white text-xs px-3 py-1 rounded-full font-semibold">
                                        MENTOR AMA
                                    </span>
                                    <span className="text-sm text-gray-500">{ama.postedDate}</span>
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2">{ama.title}</h3>
                                <p className="text-sm text-gray-700 mb-3">{ama.preview}</p>
                                <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                                    <span className="flex items-center">
                                        <MessageCircle size={16} className="mr-1" />
                                        {ama.responses} responses
                                    </span>
                                    <span className="flex items-center">
                                        <Heart size={16} className="mr-1" />
                                        {ama.likes} likes
                                    </span>
                                </div>
                                <button
                                    onClick={() => openBookingModal(MOCK_MENTORS[0])}
                                    className="bg-blue-700 text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-blue-800 transition-all"
                                >
                                    Book Session with {ama.mentor} →
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Interview Digests */}
            <div className="space-y-4">
                {MOCK_POSTS.map(post => (
                    <div key={post.id} className="bg-white rounded-lg shadow p-6 hover:shadow-md transition-all border border-gray-300">
                        <div className="flex items-start justify-between mb-4">
                            <div>
                                <div className="flex items-center space-x-2 mb-2">
                                    <span className="bg-blue-100 text-blue-900 text-xs px-3 py-1 rounded-full font-semibold">
                                        {post.industry}
                                    </span>
                                    <span className="text-sm text-gray-500">{post.postedDate}</span>
                                </div>
                                <h3 className="text-lg font-bold text-gray-900 mb-1">{post.company}</h3>
                                <p className="text-sm text-gray-600">{post.role} • {post.interviewType}</p>
                            </div>
                            <button className="text-gray-400 hover:text-gray-600">
                                <Share2 size={20} />
                            </button>
                        </div>

                        <div className="bg-gray-50 p-4 rounded-lg mb-4 border border-gray-200">
                            <h4 className="font-semibold text-gray-900 mb-3 flex items-center text-sm">
                                <MessageSquare className="mr-2 text-blue-700" size={18} />
                                Top Questions Asked:
                            </h4>
                            <ol className="space-y-2">
                                {post.topQuestions.map((q, idx) => (
                                    <li key={idx} className="text-sm text-gray-700">
                                        <span className="font-semibold text-blue-700">{idx + 1}.</span> {q}
                                    </li>
                                ))}
                            </ol>
                        </div>

                        {post.tips && (
                            <div className="bg-yellow-50 p-4 rounded-lg mb-4 border border-yellow-200">
                                <p className="text-sm text-gray-700">
                                    <span className="font-semibold">💡 Tip: </span>
                                    {post.tips}
                                </p>
                            </div>
                        )}

                        <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                            <div className="flex items-center space-x-4">
                                <button className="flex items-center space-x-1 text-gray-600 hover:text-blue-700 transition-all">
                                    <Heart size={18} />
                                    <span className="text-sm font-medium">{post.likes}</span>
                                </button>
                                <button className="flex items-center space-x-1 text-gray-600 hover:text-blue-700 transition-all">
                                    <MessageCircle size={18} />
                                    <span className="text-sm font-medium">{post.comments}</span>
                                </button>
                            </div>
                            <button className="text-sm text-blue-700 font-semibold hover:text-blue-800">
                                View Full Discussion →
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

// Modal Component
function Modal({ children, onClose, title }) {
    return (
        <div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
            onClick={onClose}
        >
            <div
                className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
                    <h3 className="text-2xl font-bold">{title}</h3>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
                        <X size={24} />
                    </button>
                </div>
                <div className="p-6">
                    {children}
                </div>
            </div>
        </div>
    );
}