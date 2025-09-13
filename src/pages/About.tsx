import { useEffect, useState } from "react";
import Loading from "../components/Loading";
import logo from '../assets/logoHD.png'

const About = () => {
    const [userData, setUserData] = useState<any>();
    const [reposData, setReposData] = useState<any>();
    const [userTechStack, setUserTechStack] = useState<any>();
    const [isLoadingUser, setIsLoadingUser] = useState<boolean>(true);
    const [isLoadingRepos, setIsLoadingRepos] = useState<boolean>(true);
    const [isLoadingTechStack, setIsLoadingTechStack] = useState<boolean>(true);

    const GITHUB_TOKEN = import.meta.env.VITE_GITHUB_TOKEN

    const fetchUserData = async () => {
        try {
            const res = await fetch("https://api.github.com/users/Cassio-de-Paula");
            if (!res.ok) throw new Error("Failed to fetch user data");

            const data = await res.json();
            setUserData(data);
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoadingUser(false);
        }
    };

    const fetchReposData = async () => {
        try {
            const res = await fetch("https://api.github.com/users/Cassio-de-Paula/repos");
            if (!res.ok) throw new Error("Failed to fetch repositories");

            const data = await res.json();
            setFeaturedRepos(data);
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoadingRepos(false);
        }
    };

    const setFeaturedRepos = (data: any) => {
        const featuredRepos = data.sort(() => Math.random() - 0.5).slice(0, 4);
        setReposData(featuredRepos);
    };

    const setTechStack = async () => {
        try {
            const res = await fetch(
                `https://api.github.com/repos/Cassio-de-Paula/Cassio-de-Paula/contents/README.md`,
                {
                    headers: {
                        Authorization: `token ${GITHUB_TOKEN}`,
                    },
                    method: "GET",
                }
            );

            if (!res.ok) throw new Error("Failed to fetch README");

            const data = await res.json();
            const readmeContent = atob(data.content);

            const regex = /!\[([^\]]+)]\(([^)]+)\)/g;
            let match;
            const techStack = [];

            while ((match = regex.exec(readmeContent)) !== null) {
                const techName = match[1];
                const techImageUrl = match[2];
                techStack.push({ name: techName, imageUrl: techImageUrl });
            }
            setUserTechStack(techStack);
        } catch (error) {
            console.error("Erro ao obter o conteúdo do README:", error);
        } finally {
            setIsLoadingTechStack(false);
        }
    };

    const getColor = (language: any) => {
        switch (language) {
            case 'JavaScript':
                return 'yellow'
            case 'Java':
                return 'orange'
            case 'Python':
                return 'blue'
            case 'TypeScript':
                return 'blue'
            default:
                break;
        }
    }

    useEffect(() => {
        fetchUserData();
        fetchReposData();
        setTechStack();
    }, []);

    return (
        <main className="w-full min-h-screen bg-center bg-no-repeat bg-cover bg-[url(https://www.imd.org/ibyimd/wp-content/uploads/2023/12/AdobeStock_615448958-1440x810.jpeg)]">
            {(isLoadingUser || isLoadingRepos || isLoadingTechStack) && (
                <Loading />
            )}

            {!isLoadingUser && !isLoadingRepos && !isLoadingTechStack && userData && (
                <section className="py-14 flex flex-col justify-center items-center">
                    <div className="flex justify-center items-center h-fit perspective-[1000px] m-auto custom-hover">
                        <div className='w-[300px] h-[300px] relative transform-3d hover:animate-infinite-flip-animation'>
                            <div className='w-[300px] h-[300px] relative transform-3d transition-transform duration-1000'>
                                <div className='bg-neutral-w-100 flex justify-center rounded-full items-center absolute w-[300px] h-[300px] backface-hidden rotate-y-0'>
                                    <img src={userData.avatar_url} alt="" className="rounded-full border-4 border-neutral-w-900" />
                                </div>
                                <div className='bg-neutral-w-100 flex justify-center rounded-full items-center absolute w-[300px] h-[300px] backface-hidden rotate-y-180'>
                                    <img src={logo} className="rounded-full w-[300px] h-[300px] border-4 border-neutral-w-900" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <h2 className="font-inter font-semibold text-neutral-w-100 text-4xl text-center mt-4">
                        Hi there!
                        <p className="text-2xl mt-4"> I'm {userData.name}</p>
                        <p className="text-sm font-normal mt-4 max-w-[500px] text-wrap p-2.5">
                            I started studying and applying web development in 2023.<br />
                            Since this year, I have worked with different languages and
                            frameworks as a fullstack web developer, always looking to deliver
                            great value products with excellence in every single project.
                        </p>
                    </h2>
                    <div>
                        <h3 className="mt-6 font-inter text-lg text-neutral-w-100 font-semibold text-center">Check out some of my worktools!</h3>
                        {userTechStack && (
                            <div className="flex flex-wrap justify-center mt-6 max-w-2xl">
                                {userTechStack.map((tech: any, index: number) => (
                                    <a key={index} className="m-2 custom-hover">
                                        <img
                                            src={tech.imageUrl}
                                            alt={tech.name}
                                            className="rounded-sm"
                                        />
                                    </a>
                                ))}
                            </div>
                        )}
                    </div>

                    <div>
                        <h3 className="mt-6 font-inter text-lg text-neutral-w-100 font-semibold text-center">Some of my projects/algorithms</h3>
                        <ul className="flex flex-wrap justify-center gap-4 text-neutral-w-100">
                            {reposData &&
                                reposData.map((repo: any) => (
                                    <li key={repo.id} className="border-[1px] text-neutral-w-100 border-neutral-b-200 rounded-sm py-2 px-2 h-[60px] flex flex-col justify-center items-center custom-hover hover:bg-neutral-200 hover:text-neutral-b-600 gap-2 mt-6">
                                        <a href={repo.html_url} target="_blank" rel="noopener noreferrer" className="font-manrope text-wrap">
                                            {repo.name}
                                        </a>
                                        {
                                            repo.language ? (
                                                <img
                                                    src={`https://img.shields.io/badge/${repo.language}-informational?style=for-the-badge&logo=${repo.language}&logoColor=white&color=${getColor(repo.language)}`}
                                                    alt={`${repo.language} badge`}
                                                    className="h-4 m-auto"
                                                />
                                            ) : (<></>)
                                        }
                                    </li>
                                ))}
                        </ul>
                    </div>
                </section>
            )}
        </main>
    );
};

export default About;
