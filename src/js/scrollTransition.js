document.addEventListener("DOMContentLoaded", function () {
    const generalObserver = new IntersectionObserver((entries) => { 
        entries.forEach((entry) => { // entry contém informações sobre o elemento observado
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
            }else if (!entry.isIntersecting) {
                entry.target.classList.remove("visible");    
            }
        });
    },{
        threshold: 0.3
    });
    
    const projectsObserver = new IntersectionObserver((entries) => { //específico para a section de projetos.
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
            }else if (!entry.isIntersecting) {
                entry.target.classList.remove("visible");    
            }
        });
    },{
        threshold: 0.1 
    });

    const generalContents = document.querySelectorAll(".scrollAnimate");
    generalContents.forEach((content) => { // aplicara a lógica de visibilidade da callback.
        generalObserver.observe(content);
    });

    const projectsContent = document.querySelector(".scrollAnimateProjects");
    
    if (projectsContent) { 
        projectsObserver.observe(projectsContent); // aplica as regras de visibilidade específicas para a section de projetos.
    }
});
