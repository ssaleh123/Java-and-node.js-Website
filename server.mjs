import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { parse } from 'node:url';
import path from 'node:path';

const movieInfo = {
    1: {
        "title": "The Shawshank Redemption",
        "year": 1994,
        "summary": "The Shawshank Redemption is a gripping drama film directed by Frank Darabont, released in 1994. Set in the Shawshank State Penitentiary, the story follows the experiences of Andy Dufresne, a banker who is wrongfully convicted of murder and sentenced to life imprisonment. Despite facing harsh conditions and enduring years of injustice, Andy forms an unlikely friendship with fellow inmate Red and finds solace in his determination to maintain hope and dignity amidst the confines of the prison walls.",
        "review": "The Shawshank Redemption is an exceptional masterpiece that transcends the boundaries of the prison drama genre, With its poignant storytelling, rich character development, and powerful performances by Tim Robbins as Andy Dufresne and Morgan Freeman as Red, the film captivates audiences from start to finish."
    },
    2: {
        "title": "The Breakfast Club",
        "year": 1985,
        "summary": "The Breakfast Club is a classic coming-of-age film directed by John Hughes, released in 1985. Set entirely within the confines of a high school library on a Saturday detention, the movie follows five seemingly different students: the brainy Brian Johnson, the rebellious John Bender, the popular Claire Standish, the jock Andrew Clark, and the quirky Allison Reynolds. As the day progresses, the students initially clash due to their contrasting social cliques and personalities. However, as they open up to each other and share their personal struggles, they discover common ground and form unexpected connections.",
        "review": "The Breakfast Club is a timeless gem that beautifully captures the essence of teenage angst and the search for identity. With its honest portrayal of the challenges faced by high school students, the film resonates with audiences of all ages. Each character is impeccably portrayed, with nuanced performances by the ensemble cast bringing depth and authenticity to the story. As the narrative unfolds, viewers are drawn into the emotional journey of the characters, empathizing with their struggles and celebrating their moments of growth and self-discovery."
    },
    
    3: {
            "title": "The Godfather",
            "year": 1972,
            "summary": "The Godfather is an iconic crime drama film directed by Francis Ford Coppola, released in 1972. Set in the tumultuous orld of organized crime, the movie chronicles the Corleone family's rise to power in the mafia underworld. At the heart of the story is Don VIto Corleone, the patriarch of the family, who navigates the treacherous landscape of betrayal, loyalty, and revenge, As rival mafia families vie for control of New York City, the Corleones face interal trife and external threats, leading to a series of violent congrontations and power struggles.",
            "review": "The Godfather is a cinematic masterpiece that transcends the crime genre, captivating audiences with its epic storytelling and unforgettable characters. Marlon Brando's iconic portrayal of Don Vito Corleone is mesmerizing, capturing the essence of power and authority with a subtle intensity. The film's meticulous attention to detail, from the lavish costumes to the atmosphereic cinematography, immerses viewers in the rich tapestry of the mafia underworld."
    },   
    4: {
            "title": "The Dark Knight",
            "year": 2008,
            "summary": "The Dark Knight is a thrilling superhero film directed by Christopher Nolan, released in 2008. Set in the gritty and realistic world of Gotham City, the movie follows Batman as he faces his greatest challenge yet in the form of the Joker, a chaotic and anarchic criminal mastermind. As the Joker unleashed a wave of terror upon the city, Batman must confront his own moral boundaries and wrestle with the cimplexities of justice and vigilantism.",
            "review": "The Dark Knight is a cinematic triumph that transcend the confines of its genre, delivering a gripping and thought-provoking experience from start to finish. Heath Ledger's mesmerizing performance as the Joker is nothing short of iconic, imbuing the character with a terrifying blend of chaos, charism, and nihilism. The fil,'s intricate plot, complex characters, and themes of morality a chaos elevate it to the realm of high art, prompting audiences to comtemplate the nature of heroism and the thin line between good and evil. "
    },
5: {
            "title": "Pulp Fiction",
            "year": 1994,
            "summary": "Pulp Fiction is a groundbreaking crime film directed by Quentin Tarantino, released in 1994. Set in a non-linear narrative structure, the movie weaves together multiple interconnected storylines involving various characters in the criminal underworld of Los Angeles. From hitmen Vincent Vega and Jules Winnfield to boxer Butch Coolidge and mob boss Marsellus Wallace, each character's journey intersects in unexpected and often violent ways.",
            "review": "Pulp Fiction is a cinematic tour de force that continues to captivate audiences with its audacious storytelling an unforgettable characters. Quentin Tarantino's razor-sharp dialogue and innovative narrative structure breath new life into the crime genre, creating a film that is as entertaining as it is thought-provoking."
        },
6: {
            "title": "Forrest Gump",
            "year": 1994,
            "summary": "Forrest Gump is a heartwarming drama film directed by Robert Zemeckis, released in 1994. The movie follows the life journey of Forrest Gump, a simple-minded yet kind-hearted man from Alabama, as he inadvertently becomes a witness to and participant in several defining moments of 20th-century American history. Through it all, FOrrest's unwavering innocence, honesty, and love for his childhood fridn Jenny guide him on a remarkable journey of self-discovery and resilience.",
            "review": "Forrest Gump is a cinematic masterpiece that resonates with audiences of all ages, offering a poignant and uplifting exploration of love, loss, and the human spirit. Tom Hanks selivers a great performance as the itular character, imbuing Forrest with a blend of innocence. vulnerability, and wisdom that is both endearing and unforgettable. The film's sweeping narrative spans decades of American history, seamlessly blending real-world events with fictional storytelling to create a rich tapestry of life's triumphs and tribulations."
        }, 
7: {
            "title": "Jaws",
            "year": 1975,
            "summary": "Jaws is a classic thriller film directed by Steven Spielberg, released in 1975. Set in the fictional New England beach town of Amity Island, the movie follows Police Chief Martin Brody, marine biologist Matt Hooper, and grizzzled shark hunter Quint as they hunty down a massive great white shark terrorixing the locasl community. Jaws captivates audiences with its visceral thrills and endurin sense of terror.",
            "review": "Jaws redefined the summer blockbuster genre and solidified Steven Spielberg's reputation as a master filmmaker. From the film's spine-tingling opening scene to its heart-pounding climax, Jaws delivers an adrenaline-fueled rollercoaster ride that keeps viewers on the edge of their seats. ROy Scheider's portrayal of Chief Brody anchors the film with a sense of humanity and vulnerability, while Robert Shaw's performance as Quint brings a rugged intensity to the role of the seasoned shark hunter. Jaws is a timeless classic that continues to thrill and terrify audiences."
        },
8: {
            "title": "Goodfellas",
            "year": 1990,
            "summary": "Goodfellas is a gripping crime drama directed by Martin Scorsese, released in 1990. Based on the true story of mobster-turned-informant Henry Hill, the movie chronicles Henry's rise through the ranks of the Italian-American mafia in New York City. From his humble beginnings as a young streetwise kid to his involvement in organized crime alongside notorious figures, Henry navigates the dangerous world of frugs, violence, and portrayal.",
            "review": "Goodfellas is a cinematic triumph that captivates audiences with its raw authenticity and unflinching portrayal of mob life. Martin Scorsese's masterful direction brings the seedy underbelly of the mafia world to vivid life, immersing viewers in a world of violence, excess, and moral ambiguity. Led by standout performances from RayLiotta, Robert De Niro, and Joe Pesci, the film crackles with tension and menace, as each character navigates the precarious balance between loyalty and self-preservation."
        },
9: {
            "title": "Star Wars",
            "year": 1977,
            "summary": "Star Wars is an epic space opera film directed by George Lucas, released in 1977. Set in a distant galazxy far, far away, the movie follows the journey of Luke Skywalker, a young farm boy who discovers he is destined to become a Jedi Knight and join the Rebel Alliance in their fight against the tyrannical Galactic Empire. Alongside his allies Princess Leia, Han Solo, and the wise Jedi Master Obi-Wan Kenobi, Luke embarks on a thrilling adventure to rescue Leia, confront the evil Sith Lord Darth Vader, and restore peace to the galazxy.",
            "review": "Star Wars is a cinematic masterpiece that revolutionized the science fiction genre and captured the imagination of audiences around the world. George Lucas' visionary storytelling, coupled with groundbreaking visual effects and a sweeping orchestral score by John Williams, creates an immersive and unforgettable cinematic experience. The film's iconic characters have become cultural icons, inspiring generations of fans ans spawning a vast universe of sequels, preguels and spin-offs. Star Wars is a timeless tale of good verses evil, with themes of courage, friendship, and hope resonating with audiences across generations."
        },
10: {
            "title": "Back to the Future",
            "year": 1985,
            "summary": "Back to the Future is a beloved science fiction adventure film directed by Robert Zemeckis, released in 1985. The movie follows the adventures of teenager Marty McFly, who accidentally travels back in time to 1955 in a DeLorean time machine invented by his eccentric friend, Doc Brown. Upon arriving in the past, Marty inadvertently disrupts his parents' budding romance, threatening his own existence. With the help of the younger Doc Brown, Marty must find a way to ensure his parents fall in love while also navigating the complexities of time travel and avoiding altering the course of history.",
            "review": "Back to the Future is a delightful romp through time that combines thrilling adventure with heartfelt emotion and a healthy dose of nostalgia. Michael J. Fox shines as Marty McFly, bringing charm, wit, and a relatability to the role of a teenager out of his depth in the past. Christopher Lloyd is equally brilliant as the eccentric inventor Doc Brown, whose madcap schemes and infectious enthusiasm propetl the story forward."
        },



   
};

const server = createServer(async (req, res) => {
    const parsedUrl = parse(req.url, true);
    const pathname = parsedUrl.pathname;

    if (pathname === '/') {
        try {
            const homeHtml = await readFile('./public/home.html', 'utf-8');
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(homeHtml);
        } catch (err) {
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            res.end('Internal Server Error');
        }
    } else if (pathname === '/movie') {
        const movieId = parseInt(parsedUrl.query.movie, 10);
        if (!movieId || !movieInfo[movieId]) {
            res.writeHead(400, { 'Content-Type': 'text/html' });
            res.end(`
                <html>
                <head><title>Bad Request</title></head>
                <body><h1>Bad Request</h1><a href="/home.html">Back to Home</a></body>
                </html>
            `);
        } else {
            const movie = movieInfo[movieId];
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(`
                <!DOCTYPE html>
                <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <title>${movie.title}</title>
                </head>
                <body>
                    <h1>${movie.title} (${movie.year})</h1>
                    <h2>Summary</h2>
                    <p>${movie.summary}</p>
                    <h2>My Review</h2>
                    <p>${movie.review}</p>
                    <a href="/home.html">Back to Home</a>
                </body>
                </html>
            `);
        }
    } else {
        try {
            const filePath = path.join(process.cwd(), 'public', pathname);
            const fileContent = await readFile(filePath);
            const ext = path.extname(filePath);
            const mimeType = ext === '.css' ? 'text/css' : 'text/html';
            res.writeHead(200, { 'Content-Type': mimeType });
            res.end(fileContent);
        } catch (err) {
            res.writeHead(404, { 'Content-Type': 'text/html' });
            res.end('<html><head><title>Not Found</title></head><body><h1>Not Found</h1></body></html>');
        }
    }
});

server.listen(3000, '127.0.0.1', () => {
    console.log('Listening on 127.0.0.1:3000');
});