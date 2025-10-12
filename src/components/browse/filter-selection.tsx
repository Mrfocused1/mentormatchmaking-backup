'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Search, X } from 'lucide-react'

interface FilterSelectionProps {
  industries: string[]
  expertiseAreas: string[]
  availabilityOptions: string[]
  experienceLevels: string[]
  selectedIndustries: string[]
  selectedExpertise: string[]
  selectedAvailability: string[]
  selectedExperience: string[]
  searchQuery: string
  onSearchChange: (value: string) => void
  onIndustryToggle: (industry: string) => void
  onExpertiseToggle: (expertise: string) => void
  onAvailabilityToggle: (availability: string) => void
  onExperienceToggle: (experience: string) => void
  onClearAll: () => void
  onShowResults: () => void
  resultsCount: number
}

export function FilterSelection({
  industries,
  expertiseAreas,
  availabilityOptions,
  experienceLevels,
  selectedIndustries,
  selectedExpertise,
  selectedAvailability,
  selectedExperience,
  searchQuery,
  onSearchChange,
  onIndustryToggle,
  onExpertiseToggle,
  onAvailabilityToggle,
  onExperienceToggle,
  onClearAll,
  onShowResults,
  resultsCount,
}: FilterSelectionProps) {
  const [industrySearch, setIndustrySearch] = useState('')
  const [expertiseSearch, setExpertiseSearch] = useState('')

  const totalFilters =
    selectedIndustries.length +
    selectedExpertise.length +
    selectedAvailability.length +
    selectedExperience.length

  // Filter industries based on search
  const filteredIndustries = industries.filter(industry =>
    industry.toLowerCase().includes(industrySearch.toLowerCase())
  )

  // Filter expertise based on search
  const filteredExpertise = expertiseAreas.filter(expertise =>
    expertise.toLowerCase().includes(expertiseSearch.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-dark via-primary-dark to-secondary-accent/30 pt-24 pb-12">
      <div className="mx-auto max-w-4xl px-6">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl sm:text-5xl font-black font-montserrat text-white mb-4">
            Find Your Perfect Mentor
          </h1>
          <p className="text-lg text-white/90 font-montserrat">
            Tell us what you're looking for and we'll show you the best matches
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-neutral-400" />
            <input
              type="text"
              placeholder="Search by name, skills, or company..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full pl-12 pr-4 py-4 rounded-xl border-0 font-montserrat text-primary-dark placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary-accent shadow-2xl text-lg"
            />
          </div>
        </div>

        {/* Filter Cards */}
        <div className="space-y-6">
          {/* Industries */}
          <Card className="shadow-2xl border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold font-montserrat text-primary-dark">
                  Industry
                </h3>
                {selectedIndustries.length > 0 && (
                  <Badge className="bg-primary-accent text-primary-dark">
                    {selectedIndustries.length}
                  </Badge>
                )}
              </div>

              {/* Industry Search */}
              <div className="relative mb-4">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-neutral-400" />
                <input
                  type="text"
                  placeholder="Search industries..."
                  value={industrySearch}
                  onChange={(e) => setIndustrySearch(e.target.value)}
                  className="w-full pl-10 pr-10 py-2 rounded-lg border border-neutral-300 font-montserrat text-sm focus:outline-none focus:ring-2 focus:ring-primary-accent"
                />
                {industrySearch && (
                  <button
                    onClick={() => setIndustrySearch('')}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-neutral-400 hover:text-neutral-600"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>

              <div className="flex flex-wrap gap-2 max-h-60 overflow-y-auto">
                {filteredIndustries.length > 0 ? (
                  filteredIndustries.map((industry) => (
                    <button
                      key={industry}
                      onClick={() => onIndustryToggle(industry)}
                      className={`px-4 py-2 rounded-full font-semibold font-montserrat text-sm transition-all ${
                        selectedIndustries.includes(industry)
                          ? 'bg-primary-accent text-primary-dark shadow-md scale-105'
                          : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                      }`}
                    >
                      {industry}
                    </button>
                  ))
                ) : (
                  <p className="text-sm text-neutral-500 font-montserrat py-4">
                    No industries found matching "{industrySearch}"
                  </p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Expertise */}
          <Card className="shadow-2xl border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold font-montserrat text-primary-dark">
                  Expertise
                </h3>
                {selectedExpertise.length > 0 && (
                  <Badge className="bg-secondary-accent text-white">
                    {selectedExpertise.length}
                  </Badge>
                )}
              </div>

              {/* Expertise Search */}
              <div className="relative mb-4">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-neutral-400" />
                <input
                  type="text"
                  placeholder="Search expertise areas..."
                  value={expertiseSearch}
                  onChange={(e) => setExpertiseSearch(e.target.value)}
                  className="w-full pl-10 pr-10 py-2 rounded-lg border border-neutral-300 font-montserrat text-sm focus:outline-none focus:ring-2 focus:ring-secondary-accent"
                />
                {expertiseSearch && (
                  <button
                    onClick={() => setExpertiseSearch('')}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-neutral-400 hover:text-neutral-600"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>

              <div className="flex flex-wrap gap-2 max-h-60 overflow-y-auto">
                {filteredExpertise.length > 0 ? (
                  filteredExpertise.map((expertise) => (
                    <button
                      key={expertise}
                      onClick={() => onExpertiseToggle(expertise)}
                      className={`px-4 py-2 rounded-full font-semibold font-montserrat text-sm transition-all ${
                        selectedExpertise.includes(expertise)
                          ? 'bg-secondary-accent text-white shadow-md scale-105'
                          : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                      }`}
                    >
                      {expertise}
                    </button>
                  ))
                ) : (
                  <p className="text-sm text-neutral-500 font-montserrat py-4">
                    No expertise areas found matching "{expertiseSearch}"
                  </p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Experience Level */}
          <Card className="shadow-2xl border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold font-montserrat text-primary-dark">
                  Experience Level
                </h3>
                {selectedExperience.length > 0 && (
                  <Badge className="bg-vibrant-accent text-white">
                    {selectedExperience.length}
                  </Badge>
                )}
              </div>
              <div className="flex flex-wrap gap-2">
                {experienceLevels.map((level) => (
                  <button
                    key={level}
                    onClick={() => onExperienceToggle(level)}
                    className={`px-4 py-2 rounded-full font-semibold font-montserrat text-sm transition-all ${
                      selectedExperience.includes(level)
                        ? 'bg-vibrant-accent text-white shadow-md scale-105'
                        : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                    }`}
                  >
                    {level}
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Availability */}
          <Card className="shadow-2xl border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold font-montserrat text-primary-dark">
                  Availability & Activity
                </h3>
                {selectedAvailability.length > 0 && (
                  <Badge className="bg-success text-white">
                    {selectedAvailability.length}
                  </Badge>
                )}
              </div>
              <div className="flex flex-wrap gap-2">
                {availabilityOptions.map((availability) => (
                  <button
                    key={availability}
                    onClick={() => onAvailabilityToggle(availability)}
                    className={`px-4 py-2 rounded-full font-semibold font-montserrat text-sm transition-all ${
                      selectedAvailability.includes(availability)
                        ? 'bg-success text-white shadow-md scale-105'
                        : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                    }`}
                  >
                    {availability}
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row gap-4">
          {totalFilters > 0 && (
            <Button
              variant="outline"
              size="lg"
              onClick={onClearAll}
              className="border-2 border-white text-white hover:bg-white/10"
            >
              <X className="mr-2 h-5 w-5" />
              Clear All Filters
            </Button>
          )}
          <Button
            variant="primary"
            size="lg"
            onClick={onShowResults}
            className="flex-1 bg-primary-accent hover:bg-primary-accent/90 text-primary-dark text-lg py-6 shadow-2xl"
          >
            Show {resultsCount} Mentor{resultsCount !== 1 ? 's' : ''}
          </Button>
        </div>

        {/* Selected Filters Summary */}
        {totalFilters > 0 && (
          <div className="mt-6 bg-white/10 backdrop-blur-sm rounded-xl p-4">
            <p className="text-sm font-semibold font-montserrat text-white/90 mb-2">
              Active Filters ({totalFilters}):
            </p>
            <div className="flex flex-wrap gap-2">
              {selectedIndustries.map((item) => (
                <Badge key={item} className="bg-primary-accent text-primary-dark">
                  {item}
                </Badge>
              ))}
              {selectedExpertise.map((item) => (
                <Badge key={item} className="bg-secondary-accent text-white">
                  {item}
                </Badge>
              ))}
              {selectedExperience.map((item) => (
                <Badge key={item} className="bg-vibrant-accent text-white">
                  {item}
                </Badge>
              ))}
              {selectedAvailability.map((item) => (
                <Badge key={item} className="bg-success text-white">
                  {item}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
