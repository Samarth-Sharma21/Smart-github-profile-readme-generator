'use client';

import { useEffect, useState } from 'react';
import { StarIcon, GitForkIcon } from 'lucide-react';

export function GitHubStats() {
  const [stats, setStats] = useState({ stars: '---', forks: '---' });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Replace with your actual GitHub repository
        const repoOwner = 'username'; // Replace with actual username
        const repoName = 'github-profile-readme-generator'; // Replace with actual repo name
        
        // Try to get from localStorage first (to avoid rate limits)
        const cachedStats = localStorage.getItem('github_stats');
        const cachedTime = localStorage.getItem('github_stats_time');
        
        // Use cached data if it's less than 1 hour old
        if (cachedStats && cachedTime && (Date.now() - parseInt(cachedTime)) < 3600000) {
          setStats(JSON.parse(cachedStats));
          setLoading(false);
          return;
        }
        
        // Fetch fresh data
        const response = await fetch(`https://api.github.com/repos/${repoOwner}/${repoName}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch GitHub stats');
        }
        
        const data = await response.json();
        const newStats = {
          stars: data.stargazers_count.toLocaleString(),
          forks: data.forks_count.toLocaleString()
        };
        
        // Update state
        setStats(newStats);
        
        // Cache the results
        localStorage.setItem('github_stats', JSON.stringify(newStats));
        localStorage.setItem('github_stats_time', Date.now().toString());
      } catch (err) {
        console.error('Error fetching GitHub stats:', err);
        setError(true);
        
        // Try to use cached data even if it's old
        const cachedStats = localStorage.getItem('github_stats');
        if (cachedStats) {
          setStats(JSON.parse(cachedStats));
        }
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (error && stats.stars === '---') {
    return null; // Don't show anything if there's an error and no cached data
  }

  return (
    <div className="flex items-center space-x-4 text-sm text-gray-600">
      <a 
        href="https://github.com/username/github-profile-readme-generator/stargazers" 
        target="_blank" 
        rel="noopener noreferrer"
        className="flex items-center space-x-1 hover:text-gray-900 transition-colors"
      >
        <StarIcon size={16} />
        <span>{stats.stars} stars</span>
      </a>
      <a 
        href="https://github.com/username/github-profile-readme-generator/network/members" 
        target="_blank" 
        rel="noopener noreferrer"
        className="flex items-center space-x-1 hover:text-gray-900 transition-colors"
      >
        <GitForkIcon size={16} />
        <span>{stats.forks} forks</span>
      </a>
    </div>
  );
}