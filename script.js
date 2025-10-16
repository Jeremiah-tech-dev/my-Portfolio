// Mobile menu toggle functionality
const mobileToggle = document.querySelector('.mobile-menu-toggle');
const navLinks = document.querySelector('.nav-links');

if (mobileToggle && navLinks) {
    mobileToggle.addEventListener('click', function() {
        navLinks.classList.toggle('active');
    });
    
    // Close menu when clicking on a link
    const navLinkItems = document.querySelectorAll('.nav-links a');
    navLinkItems.forEach(link => {
        link.addEventListener('click', function() {
            navLinks.classList.remove('active');
        });
    });
}

// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Contact form handling
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const formData = new FormData(this);
            const name = formData.get('name');
            const email = formData.get('email');
            const subject = formData.get('subject');
            const message = formData.get('message');
            
            // Show success message
            this.innerHTML = `
                <div style="text-align: center; padding: 40px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; border-radius: 10px;">
                    <h3>✅ Message Received!</h3>
                    <p>Thank you for reaching out. I'll get back to you soon!</p>
                    <p style="margin-top: 20px; font-size: 14px; opacity: 0.8;">
                        <a href="https://wa.me/254757076273?text=Hello Jeremiah, I sent you a message through your website!" target="_blank" style="color: white; text-decoration: none;">
                            📱 Chat on WhatsApp
                        </a>
                    </p>
                </div>
            `;
        });
    }
});