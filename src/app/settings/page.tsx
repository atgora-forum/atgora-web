/**
 * User settings page.
 * URL: /settings
 * Content safety, cross-posting defaults, notification preferences.
 * Client component (form state).
 * @see specs/prd-web.md Section M8 (Settings page)
 */

'use client'

import { useState } from 'react'
import { ForumLayout } from '@/components/layout/forum-layout'
import { Breadcrumbs } from '@/components/breadcrumbs'
import { cn } from '@/lib/utils'

type MaturityLevel = 'sfw' | 'sfw-mature'

interface SettingsValues {
  maturityLevel: MaturityLevel
  mutedWords: string
  crossPostBluesky: boolean
  crossPostFrontpage: boolean
  notifyReplies: boolean
  notifyMentions: boolean
  notifyReactions: boolean
}

export default function SettingsPage() {
  const [values, setValues] = useState<SettingsValues>({
    maturityLevel: 'sfw',
    mutedWords: '',
    crossPostBluesky: true,
    crossPostFrontpage: false,
    notifyReplies: true,
    notifyMentions: true,
    notifyReactions: false,
  })
  const [saving, setSaving] = useState(false)

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    // TODO: Save settings via API
    setTimeout(() => setSaving(false), 500)
  }

  return (
    <ForumLayout>
      <div className="space-y-6">
        <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Settings' }]} />

        <h1 className="text-2xl font-bold text-foreground">Settings</h1>

        <form onSubmit={handleSave} className="max-w-2xl space-y-8" noValidate>
          {/* Content Safety */}
          <fieldset className="space-y-4 rounded-lg border border-border p-4">
            <legend className="px-2 text-sm font-semibold text-foreground">Content Safety</legend>

            <div className="space-y-1">
              <label htmlFor="maturity-level" className="block text-sm font-medium text-foreground">
                Maturity level
              </label>
              <select
                id="maturity-level"
                value={values.maturityLevel}
                onChange={(e) =>
                  setValues({ ...values, maturityLevel: e.target.value as MaturityLevel })
                }
                className={cn(
                  'block w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring'
                )}
              >
                <option value="sfw">SFW only</option>
                <option value="sfw-mature">SFW + Mature</option>
              </select>
              <p className="text-xs text-muted-foreground">
                Controls which content you can see. Mature content requires age confirmation.
              </p>
            </div>

            <div className="space-y-1">
              <label htmlFor="muted-words" className="block text-sm font-medium text-foreground">
                Muted words
              </label>
              <textarea
                id="muted-words"
                value={values.mutedWords}
                onChange={(e) => setValues({ ...values, mutedWords: e.target.value })}
                placeholder="Enter words separated by commas"
                rows={3}
                className={cn(
                  'block w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring'
                )}
              />
              <p className="text-xs text-muted-foreground">
                Posts containing these words will be collapsed. Comma-separated.
              </p>
            </div>
          </fieldset>

          {/* Cross-Posting */}
          <fieldset className="space-y-4 rounded-lg border border-border p-4">
            <legend className="px-2 text-sm font-semibold text-foreground">Cross-Posting</legend>
            <div className="space-y-3">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={values.crossPostBluesky}
                  onChange={(e) => setValues({ ...values, crossPostBluesky: e.target.checked })}
                  className="h-4 w-4 rounded border-border text-primary focus-visible:ring-2 focus-visible:ring-ring"
                />
                <span className="text-sm text-foreground">
                  Share new topics on Bluesky by default
                </span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={values.crossPostFrontpage}
                  onChange={(e) => setValues({ ...values, crossPostFrontpage: e.target.checked })}
                  className="h-4 w-4 rounded border-border text-primary focus-visible:ring-2 focus-visible:ring-ring"
                />
                <span className="text-sm text-foreground">
                  Share new topics on Frontpage by default
                </span>
              </label>
            </div>
          </fieldset>

          {/* Notifications */}
          <fieldset className="space-y-4 rounded-lg border border-border p-4">
            <legend className="px-2 text-sm font-semibold text-foreground">Notifications</legend>
            <div className="space-y-3">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={values.notifyReplies}
                  onChange={(e) => setValues({ ...values, notifyReplies: e.target.checked })}
                  className="h-4 w-4 rounded border-border text-primary focus-visible:ring-2 focus-visible:ring-ring"
                />
                <span className="text-sm text-foreground">Replies to my posts</span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={values.notifyMentions}
                  onChange={(e) => setValues({ ...values, notifyMentions: e.target.checked })}
                  className="h-4 w-4 rounded border-border text-primary focus-visible:ring-2 focus-visible:ring-ring"
                />
                <span className="text-sm text-foreground">Mentions of my handle</span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={values.notifyReactions}
                  onChange={(e) => setValues({ ...values, notifyReactions: e.target.checked })}
                  className="h-4 w-4 rounded border-border text-primary focus-visible:ring-2 focus-visible:ring-ring"
                />
                <span className="text-sm text-foreground">Reactions on my posts</span>
              </label>
            </div>
          </fieldset>

          {/* Save */}
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={saving}
              className={cn(
                'rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors',
                'hover:bg-primary-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
                'disabled:cursor-not-allowed disabled:opacity-50'
              )}
            >
              {saving ? 'Saving...' : 'Save Settings'}
            </button>
          </div>
        </form>
      </div>
    </ForumLayout>
  )
}
