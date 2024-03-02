document.addEventListener("DOMContentLoaded", function() {
    // Smooth scrolling for anchor links
    const scrollDuration = 800; // Duration of the scroll animation in milliseconds
    
    const links = document.querySelectorAll('a[href^="#"]');
    
    for (const link of links) {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const target = document.getElementById(targetId);
            
            if (target) {
                const startPosition = window.pageYOffset;
                const targetPosition = target.getBoundingClientRect().top + startPosition;
                const distance = targetPosition - startPosition;
                const startTime = performance.now();
                
                function ease(t) {
                    return t<.5 ? 4*t*t*t : (t-1)*(2*t-2)*(2*t-2)+1;
                }
                
                function scroll(timestamp) {
                    const currentTime = timestamp - startTime;
                    
                    window.scrollTo(0, startPosition + distance * ease(currentTime / scrollDuration));
                    
                    if (currentTime < scrollDuration) {
                        requestAnimationFrame(scroll);
                    } else {
                        window.scrollTo(0, targetPosition);
                    }
                }
                
                requestAnimationFrame(scroll);
            }
        });
    }
});
