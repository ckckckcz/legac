export interface GitHubRepo {
    id: number;
    name: string;
    fullName: string;
    description: string | null;
    url: string;
    stars: number;
    language: string;
    updatedAt: string;
}

export const mockRepos: GitHubRepo[] = [
    {
        id: 1,
        name: 'legac-web',
        fullName: 'user/legac-web',
        description: 'The core web application for Legac platform.',
        url: 'https://github.com/user/legac-web',
        stars: 124,
        language: 'TypeScript',
        updatedAt: '2024-02-20',
    },
    {
        id: 2,
        name: 'documentation-assets',
        fullName: 'user/documentation-assets',
        description: 'Centralized repository for all product documentation and assets.',
        url: 'https://github.com/user/documentation-assets',
        stars: 45,
        language: 'Markdown',
        updatedAt: '2024-02-18',
    },
    {
        id: 3,
        name: 'api-service-v2',
        fullName: 'user/api-service-v2',
        description: 'Next-gen backend services for document processing.',
        url: 'https://github.com/user/api-service-v2',
        stars: 89,
        language: 'Go',
        updatedAt: '2024-02-15',
    },
    {
        id: 4,
        name: 'legac-cli',
        fullName: 'user/legac-cli',
        description: 'Zero-config CLI for modernizing legacy codebases.',
        url: 'https://github.com/user/legac-cli',
        stars: 210,
        language: 'TypeScript',
        updatedAt: '2024-02-21',
    },
];
