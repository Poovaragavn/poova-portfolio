import os
from reportlab.lib.pagesizes import letter
from reportlab.lib import colors
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, HRFlowable, Table, TableStyle

def create_resume():
    pdf_path = os.path.join("e:\\Poova Protfolio", "assets", "Poovaragavan_C_Resume.pdf")
    os.makedirs(os.path.dirname(pdf_path), exist_ok=True)
    
    doc = SimpleDocTemplate(
        pdf_path,
        pagesize=letter,
        leftMargin=36,
        rightMargin=36,
        topMargin=36,
        bottomMargin=36
    )
    
    styles = getSampleStyleSheet()
    
    # Custom styles
    title_style = ParagraphStyle(
        'DocTitle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=22,
        leading=26,
        alignment=1, # Center
        textColor=colors.HexColor('#000000')
    )
    
    contact_style = ParagraphStyle(
        'ContactInfo',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=9.5,
        leading=13,
        alignment=1,
        textColor=colors.HexColor('#222222')
    )
    
    section_heading = ParagraphStyle(
        'SectionHeading',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=12,
        leading=15,
        textColor=colors.HexColor('#000000'),
        spaceBefore=8,
        spaceAfter=4
    )
    
    body_style = ParagraphStyle(
        'BodyTextCustom',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=9.5,
        leading=13,
        textColor=colors.HexColor('#111111')
    )
    
    bold_body = ParagraphStyle(
        'BoldBody',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=9.5,
        leading=13,
        textColor=colors.HexColor('#000000')
    )

    bullet_style = ParagraphStyle(
        'BulletCustom',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=9,
        leading=12.5,
        leftIndent=12,
        firstLineIndent=-8,
        textColor=colors.HexColor('#222222'),
        spaceAfter=2
    )

    item_title = ParagraphStyle(
        'ItemTitle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=9.5,
        leading=13,
        textColor=colors.HexColor('#000000')
    )

    item_right = ParagraphStyle(
        'ItemRight',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=9.5,
        leading=13,
        alignment=2, # Right
        textColor=colors.HexColor('#000000')
    )
    
    story = []
    
    # Header
    story.append(Paragraph("POOVARAGAVAN C", title_style))
    story.append(Spacer(1, 4))
    
    contact_text = "📞 9080777010 &nbsp;&nbsp;|&nbsp;&nbsp; ✉ poovaragavan450@gmail.com &nbsp;&nbsp;|&nbsp;&nbsp; 🔗 Poovaragavan C &nbsp;&nbsp;|&nbsp;&nbsp; 📍 COIMBATORE, TAMIL NADU"
    story.append(Paragraph(contact_text, contact_style))
    story.append(Spacer(1, 8))
    
    def add_section_header(title):
        story.append(Paragraph(title, section_heading))
        story.append(HRFlowable(width="100%", thickness=1, color=colors.HexColor('#000000'), spaceBefore=2, spaceAfter=6))

    # Objective
    add_section_header("OBJECTIVE")
    obj_text = "An enthusiastic and professionally capable person with solid skills in Python, SQL, and experience performing data analysis with Pandas and NumPy. Able to use machine learning techniques to pull insights and information and create data-driven solutions. Can also show intermediate knowledge of IoT systems and a basic understanding of cloud computing. Enthusiastic to use analytical thinking and technical knowledge to contribute to cutting-edge projects!"
    story.append(Paragraph(obj_text, body_style))
    story.append(Spacer(1, 6))

    # Education
    add_section_header("EDUCATION")
    edu_data = [
        [
            Paragraph("• <b>Bachelor of Engineering in Computer Science and Engineering, CGPA 8.15</b> (Till Semester 6)<br/>&nbsp;&nbsp;Adithya Institute of Technology, Coimbatore, Tamil Nadu.", body_style),
            Paragraph("2022 - 2026", item_right)
        ],
        [
            Paragraph("• <b>HSC 75%</b> Sri Vidhya Mandir Matric Higher Secondary School", body_style),
            Paragraph("2020 - 2022", item_right)
        ],
        [
            Paragraph("• <b>SSLC 88%</b> Sri Vidhya Mandir Matric Higher Secondary School", body_style),
            Paragraph("2019 - 2020", item_right)
        ]
    ]
    edu_table = Table(edu_data, colWidths=[420, 120])
    edu_table.setStyle(TableStyle([
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
        ('BOTTOMPADDING', (0,0), (-1,-1), 4),
        ('TOPPADDING', (0,0), (-1,-1), 0),
        ('LEFTPADDING', (0,0), (-1,-1), 0),
        ('RIGHTPADDING', (0,0), (-1,-1), 0),
    ]))
    story.append(edu_table)
    story.append(Spacer(1, 6))

    # Technical Skills
    add_section_header("TECHNICAL SKILLS")
    skills_data = [
        [Paragraph("• <b>Python</b>", body_style), Paragraph("• <b>Machine Learning</b>", body_style), Paragraph("• <b>GitHub</b>", body_style)],
        [Paragraph("• <b>Pandas</b>", body_style), Paragraph("• <b>N8N AI Agents</b>", body_style), Paragraph("• <b>IoT</b>", body_style)],
        [Paragraph("• <b>Numpy</b>", body_style), Paragraph("• <b>MySQL</b>", body_style), Paragraph("• <b>Canva</b>", body_style)],
        [Paragraph("• <b>Exploratory Data Analysis</b>", body_style), Paragraph("", body_style), Paragraph("", body_style)]
    ]
    skills_table = Table(skills_data, colWidths=[180, 180, 180])
    skills_table.setStyle(TableStyle([
        ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
        ('BOTTOMPADDING', (0,0), (-1,-1), 2),
        ('TOPPADDING', (0,0), (-1,-1), 2),
        ('LEFTPADDING', (0,0), (-1,-1), 0),
        ('RIGHTPADDING', (0,0), (-1,-1), 0),
    ]))
    story.append(skills_table)
    story.append(Spacer(1, 6))

    # Soft Skills
    add_section_header("SOFT SKILLS")
    soft_data = [
        [Paragraph("• Communication", body_style), Paragraph("• Adaptability", body_style), Paragraph("• Leadership", body_style)],
        [Paragraph("• Problem-Solving", body_style), Paragraph("• Time Management", body_style), Paragraph("• Teamwork", body_style)]
    ]
    soft_table = Table(soft_data, colWidths=[180, 180, 180])
    soft_table.setStyle(TableStyle([
        ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
        ('BOTTOMPADDING', (0,0), (-1,-1), 2),
        ('TOPPADDING', (0,0), (-1,-1), 2),
        ('LEFTPADDING', (0,0), (-1,-1), 0),
        ('RIGHTPADDING', (0,0), (-1,-1), 0),
    ]))
    story.append(soft_table)
    story.append(Spacer(1, 6))

    # Projects
    add_section_header("PROJECTS")
    
    projects = [
        {
            "title": "AI BASED APPROACHES FOR FRAUD DETECTION TO ENHANCE SECURITY IN FINANCIAL SYSTEMS",
            "date": "Nov 2025 - April 2026",
            "tech": "Python, Scikit-learn, Decision Tree, Random Forest, XGBoost, SVM, SMOTE",
            "bullets": [
                "Developed an AI-based fraud detection system to identify suspicious financial transactions and enhance system security.",
                "Implemented multiple machine learning algorithms including Decision Tree, Random Forest, XGBoost, and SVM for accurate fraud prediction.",
                "Applied data preprocessing techniques such as cleaning, feature engineering, and class imbalance handling (SMOTE) to improve model performance.",
                "Evaluated models using performance metrics like Accuracy, Precision, Recall, F1-Score, and ROC-AUC, achieving improved fraud detection efficiency."
            ]
        },
        {
            "title": "CUSTOMER SEGMENTATION USING K-MEANS CLUSTERING ALGORITHM",
            "date": "Jun 2025 - July 2025",
            "tech": "Python, Scikit-learn, Pandas, NumPy, Matplotlib, Seaborn",
            "bullets": [
                "Developed a customer segmentation model using the K-Means clustering algorithm to group customers based on purchasing behaviour and demographic attributes.",
                "Utilized Pandas and NumPy for data pre-processing, and Scikit-learn for model training and clustering.",
                "Created visualizations with Matplotlib and Seaborn to interpret clusters, enabling targeted marketing strategies and improved customer engagement."
            ]
        },
        {
            "title": "HUMAN RESOURCE ANALYTIC DASHBOARD USING SQL WITH POWER BI",
            "date": "Jun 2025 - July 2025",
            "tech": "SQL, Power BI, DAX, Data Modelling",
            "bullets": [
                "Designed and developed an interactive Human Resource dashboard to track employee headcount, attrition, recruitment trends, and performance KPIs.",
                "Utilized SQL for backend data extraction and transformation, and Power BI for data modelling, KPI visualization, and interactive reporting.",
                "Implemented slicers, drill-throughs, and automated data refresh to enhance HR decision-making and operational efficiency."
            ]
        },
        {
            "title": "IOT - BASED PEOPLE COUNTER USING IR SENSOR",
            "date": "Jan 2025 - Now @ Final Stage",
            "tech": "Arduino, C/C++, IR Sensors, IoT Modules, LCD Display",
            "bullets": [
                "Designed and implemented an IoT-based people counting system using IR sensors to detect entry and exit movements.",
                "Programmed Arduino in C/C++ to process sensor data and update real-time counts.",
                "Integrated an LCD display for local monitoring and IoT modules for remote data access, enabling effective crowd management and occupancy control."
            ]
        },
        {
            "title": "AI-POWERED IDEA GENERATION",
            "date": "Aug 2024 - Sep 2024",
            "tech": "Python, Open AI API, NLP, Streamlit, Pandas",
            "bullets": [
                "Developed an AI-powered idea generation tool leveraging NLP models to produce creative and context-specific suggestions for various domains.",
                "Utilized Python and Open AI API for idea synthesis, Pandas for data handling, and Streamlit for building an interactive user interface.",
                "Enabled users to input themes or keywords and receive diverse, high-quality ideas in real time."
            ]
        }
    ]

    for p in projects:
        p_table = Table([[Paragraph(f"<b>{p['title']}</b>", item_title), Paragraph(p['date'], item_right)]], colWidths=[400, 140])
        p_table.setStyle(TableStyle([
            ('VALIGN', (0,0), (-1,-1), 'TOP'),
            ('BOTTOMPADDING', (0,0), (-1,-1), 1),
            ('TOPPADDING', (0,0), (-1,-1), 1),
            ('LEFTPADDING', (0,0), (-1,-1), 0),
            ('RIGHTPADDING', (0,0), (-1,-1), 0),
        ]))
        story.append(p_table)
        story.append(Paragraph(f"<i>Technologies: {p['tech']}</i>", body_style))
        for b in p['bullets']:
            story.append(Paragraph(f"• {b}", bullet_style))
        story.append(Spacer(1, 4))

    # Internship
    add_section_header("INTERNSHIP")
    
    internships = [
        {
            "title": "Pantech eLearning Pvt. Ltd – Machine Learning",
            "date": "01/06/2025 to 30/06/2025",
            "bullets": [
                "Successfully completed a certified one-month internship in Machine Learning.",
                "Gained hands-on experience in supervised and unsupervised learning algorithms, model development, and evaluation using Python and real-world datasets.",
                "<b>Credential:</b> Certified Professional in Machine Learning – Pantech eLearning Pvt. Ltd."
            ]
        },
        {
            "title": "OXI.AI - DATA ANALYST",
            "date": "09/06/2025 to 12/07/2025",
            "bullets": [
                "Successfully completed a certified one-month internship in Data Analysis.",
                "Gained hands-on experience in data cleaning, pre-processing, visualization, and statistical analysis using Python, SQL, and real-world datasets.",
                "<b>Credential:</b> Certified Data Analyst – OXI.AI"
            ]
        },
        {
            "title": "Prodigy InfoTech as a Machine Learning Intern (Virtual)",
            "date": "15/08/2024 to 15/09/2024",
            "bullets": []
        },
        {
            "title": "Skill Upgrade as an Artificial Intelligence Intern (Virtual)",
            "date": "01/08/2024 to 30/08/2024",
            "bullets": []
        }
    ]

    for i in internships:
        i_table = Table([[Paragraph(f"<b>{i['title']}</b>", item_title), Paragraph(i['date'], item_right)]], colWidths=[400, 140])
        i_table.setStyle(TableStyle([
            ('VALIGN', (0,0), (-1,-1), 'TOP'),
            ('BOTTOMPADDING', (0,0), (-1,-1), 1),
            ('TOPPADDING', (0,0), (-1,-1), 1),
            ('LEFTPADDING', (0,0), (-1,-1), 0),
            ('RIGHTPADDING', (0,0), (-1,-1), 0),
        ]))
        story.append(i_table)
        for b in i['bullets']:
            story.append(Paragraph(f"• {b}", bullet_style))
        story.append(Spacer(1, 3))

    # Certifications
    add_section_header("CERTIFICATIONS")
    certs = [
        "• <b>Oracle Cloud Infrastructure 2023 AI Certified Foundations Associate</b> | Issued by Oracle | Valid until May 22, 2026",
        "• <b>Data Analysis - 4 Credit Course (NPTEL)</b> | SWAYAM Conducted by Punjabi University, Patiala | Issued Jan 2025",
        "• <b>Python for Beginners</b> in Udemy",
        "• <b>Python Course</b> in Udemy (On Progress)",
        "• <b>Database Management System</b> – in Infosys Springboard (On Progress)",
        "• <b>Introduction to Machine Learning</b> | SWAYAM (On Progress)",
        "• <b>Great Learning</b> | Completed on Mar 16, 2024 Online Certification | Skills: Graphic Design",
        "• <b>Learning Canva</b> | Completed on Feb 16, 2024 | Skills: Canva, Graphic Design"
    ]
    for c in certs:
        story.append(Paragraph(c, body_style))
        story.append(Spacer(1, 2))
    story.append(Spacer(1, 4))

    # Co-curricular & Extra Curricular Activities
    add_section_header("CO-CURRICULAR & EXTRA CURRICULAR ACTIVITIES")
    activities = [
        "• Attended one week hands-on training in 'INDUSTRIAL IoT' (03-02-2025 to 08-02-2025).",
        "• Attended Cybersecurity Workshop at Amrita University Coimbatore.",
        "• Participated in Python Fundamentals in 90 Minutes masterclass, building a strong foundation in AI and data concepts.",
        "• Attended a Web Application Development workshop at HREY'S TECH-HUB, gaining exposure to practical front-end and back-end integration.",
        "• Earned certification for active participation in technical events, enhancing problem-solving and coding skills.",
        "• Completed training on Data Visualization with Power BI, learning interactive dashboard creation and data modelling techniques.",
        "• Participated in hackathon events, collaborating with peers to design and implement innovative tech solutions.",
        "• Served as Campus Ambassador from Apr 2025 to May 2025, leading outreach activities and engaging with the student community.",
        "• Designed posters and promotional materials for department and college-level events at Adithya Institute of Technology using Canva and Adobe Photoshop."
    ]
    for act in activities:
        story.append(Paragraph(act, body_style))
        story.append(Spacer(1, 2))
    story.append(Spacer(1, 4))

    # Language Known
    add_section_header("LANGUAGE KNOWN")
    story.append(Paragraph("• <b>English</b> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; • <b>Tamil</b>", body_style))
    story.append(Spacer(1, 6))

    # Leadership
    add_section_header("LEADERSHIP")
    leaderships = [
        "• <b>Association Function Office Bearer:</b> Served as an active office bearer, coordinating student participation and ensuring smooth event execution.",
        "• <b>Onam Function Coordinator:</b> Led as Student Coordinator for Onam celebrations, managing teams and overseeing all cultural and logistics arrangements.",
        "• <b>Association Function Coordinator & Treasurer:</b> Managed finances as Treasurer and acted as Overall Coordinator, handling planning, budgeting, and execution of association functions.",
        "• <b>Class Representative:</b> Represented the class for three consecutive years, bridging communication between faculty and students while resolving concerns effectively.",
        "• <b>Farewell Function Coordinator:</b> Organized and coordinated farewell functions for seniors twice, supervising event planning, resource allocation, and team management.",
        "• <b>Department Event Coordinator:</b> Took the lead in organizing and coordinating various departmental events, ensuring active student participation and successful outcomes.",
        "• <b>Placement Coordinator:</b> Coordinated placement activities between students and recruiters, assisting in scheduling, communication, and preparation support for peers."
    ]
    for l in leaderships:
        story.append(Paragraph(l, body_style))
        story.append(Spacer(1, 3))
    story.append(Spacer(1, 6))

    # Declaration
    add_section_header("DECLARATION")
    story.append(Paragraph("I affirm that the information provided is accurate and reflects my skills, experiences, and achievements to the best of my knowledge.", body_style))
    story.append(Spacer(1, 15))
    story.append(Paragraph("<b>POOVARAGAVAN C</b><br/><i>Signature</i>", item_right))

    doc.build(story)
    print(f"Successfully generated PDF resume at: {pdf_path}")

if __name__ == "__main__":
    create_resume()
