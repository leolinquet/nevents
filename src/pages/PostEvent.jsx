/*
 * Author: Patrick Gurney
 * Date: October 14, 2026
 * Description: Allows students to create and submit events for review.
 * TODOs:
 *      - Update description in author header to be more detailed.
 *      - Discover will have to be updated so that events spanning multiple days will only display the soonest upcoming time & day, with the rest being shown on their event details page.
 *      - Implement support for event days to have varying locations based on the day the event is taking place.
 *      - Implement data storage or email routing for event postings.
 *      - Update pages to support desktop sizings for those using computers or prefer desktop view on mobile (if neccessary)
 *      - Prototype V1 Currently assumes the user is Leo, and a verified officer in the Nebraska Coding Club. 
 *          Future builds will likely include features to create and sign into specific organization accounts.
 *      - Address cause of static text elements behaving like text inputs (the blinking text cursor is annoying)
 */

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Screen from '../components/Screen.jsx'
import { useApp } from '../state/AppContext.jsx'

const newDay = () => ({
    date: '',
    startTime: '',
    endTime: '',
})

const campusNames = {
    city: 'City Campus',
    east: 'East Campus',
    other: 'Other',
}

export default function PostEvent() {
    const navigate = useNavigate()
    const { submitPost } = useApp()
    const [form, setForm] = useState({
        title: '',
        campus: '',
        location: '',
        category: '',
        moreInfo: '',
        audience: 'all',
        freeFood: false,
        days: [newDay()],
    })

    const [error, setError] = useState('')

    const updateField = (field, value) => {
        setForm((current) => ({ ...current, [field]: value }))
        setError('')
    }

    const updateDay = (index, field, value) => {
        setForm((current) => ({
            ...current,
            days: current.days.map((day, i) =>
                i === index ? { ...day, [field]: value } : day
            ),
        }))
        setError('')
    }

    const addDay = () => {
        setForm((current) => ({
            ...current,
            days: [...current.days, newDay()],
        }))
    }

    const removeDay = (index) => {
        setForm((current) => ({
            ...current,
            days: current.days.filter((_, i) => i !== index),
        }))
        setError('')
    }

    const handleSubmit = (event) => {
        event.preventDefault()

        if (
            !form.title.trim() ||
            !form.campus ||
            !form.location.trim() ||
            !form.category ||
            form.days.some(
                (day) => !day.date || !day.startTime || !day.endTime
            )
        ) {
            setError('Complete all required fields before submitting event.')
            return
        }

        if (form.days.some((day) => day.startTime === day.endTime)) {
            setError('Start and end times cannot be identical.')
            return
        }

        for (let i = 1; i < form.days.length; i++) {
            if (form.days[i].date < form.days[i - 1].date) {
                setError('Schedule days must be in chronological order.')
                return
            }
        }

        const id = submitPost({
            ...form,
            title: form.title.trim(),
            campus: campusNames[form.campus],
            location: form.location.trim(),
            moreInfo: form.moreInfo.trim(),
            visibility: form.audience,
            free: form.freeFood,
            approved: false,
        })

        navigate(`/post/sent/${id}`)
    }

    return (
        <Screen
            activeTab="post"
            footer={
                <>
                    <button
                        type="submit"
                        form="post-event-form"
                        className="btn-primary"
                    >
                        Submit for review
                    </button>
                    <p className="muted tiny center">
                        Student Involvement approves posts before they go live.
                    </p>
                </>
            }
        >
            <header className="page-header">
                <h1 className="display">Post an event</h1>
                <p className="muted">
                    Posting as Husker Coding Club
                    <span className="badge badge-ok">Verified officer</span>
                </p>
            </header>

            <form
                id="post-event-form"
                className="form post-event-form"
                onSubmit={handleSubmit}
                noValidate
            >
                <label className="field">
                    <span>Event name</span>
                    <input
                        type="text"
                        value={form.title}
                        onChange={(e) => updateField('title', e.target.value)}
                        placeholder="Enter an event name"
                        required
                    />
                </label>

                <label className="field">
                    <span>Category</span>
                    <select
                        value={form.category}
                        onChange={(e) => updateField('category', e.target.value)}
                        required
                    >
                        <option value="">Select a category</option>
                        <option value="Academic">Academic</option>
                        <option value="Social">Social</option>
                        <option value="Professional">Professional</option>
                        <option value="Service">Service</option>
                        <option value="Wellness">Wellness</option>
                        <option value="Arts & Culture">Arts &amp; Culture</option>
                        <option value="Other">Other</option>
                    </select>
                </label>

                <fieldset className="audience-field">
                    <legend>Location</legend>

                    <div className="form">
                        {[
                            { value: 'city', label: 'City Campus' },
                            { value: 'east', label: 'East Campus' },
                            { value: 'other', label: 'Other' },
                        ].map((option) => (
                            <label
                                key={option.value}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 10,
                                    cursor: 'pointer',
                                }}
                            >
                                <input
                                    type="radio"
                                    name="campus"
                                    value={option.value}
                                    checked={form.campus === option.value}
                                    onClick={(e) => {
                                        if (form.campus === option.value) {
                                            e.preventDefault()
                                            setForm((current) => ({
                                                ...current,
                                                campus: '',
                                                location: '',
                                            }))
                                            setError('')
                                        }
                                    }}
                                    onChange={() => {
                                        setForm((current) => ({
                                            ...current,
                                            campus: option.value,
                                            location: '',
                                        }))
                                        setError('')
                                    }}
                                />
                                <span>{option.label}</span>
                            </label>
                        ))}
                    </div>
                </fieldset>

                {form.campus && (
                    <label className="field">
                        <span>
                            {form.campus === 'other'
                                ? 'Event address'
                                : 'Building or location'}
                        </span>
                        <input
                            type="text"
                            value={form.location}
                            onChange={(e) => updateField('location', e.target.value)}
                            placeholder={
                                form.campus === 'other'
                                    ? 'Enter your event address'
                                    : 'Enter a building or location'
                            }
                            required
                        />
                    </label>
                )}

                <label className="field">
                    <span>More info (optional)</span>
                    <textarea
                        value={form.moreInfo}
                        onChange={(e) => updateField('moreInfo', e.target.value)}
                        placeholder="Add any other event details"
                        rows={3}
                    />
                </label>

                <h2 className="section-label">Event schedule</h2>

                {form.days.map((day, index) => (
                    <section
                        className="card"
                        key={index}
                        style={{ padding: 14 }}
                    >
                        <div
                            style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                marginBottom: 12,
                            }}
                        >
                            <strong>Day {index + 1}</strong>

                            {form.days.length > 1 && (
                                <button
                                    type="button"
                                    className="link-btn"
                                    onClick={() => removeDay(index)}
                                >
                                    Remove
                                </button>
                            )}
                        </div>

                        <div className="form">
                            <label className="field">
                                <span>Date</span>
                                <input
                                    type="date"
                                    value={day.date}
                                    onChange={(e) =>
                                        updateDay(index, 'date', e.target.value)
                                    }
                                    required
                                />
                            </label>

                            <div className="field-row">
                                <label className="field">
                                    <span>Start time</span>
                                    <input
                                        type="time"
                                        value={day.startTime}
                                        onChange={(e) =>
                                            updateDay(index, 'startTime', e.target.value)
                                        }
                                        required
                                    />
                                </label>

                                <label className="field">
                                    <span>End time</span>
                                    <input
                                        type="time"
                                        value={day.endTime}
                                        onChange={(e) =>
                                            updateDay(index, 'endTime', e.target.value)
                                        }
                                        required
                                    />
                                </label>
                            </div>

                            {day.startTime &&
                                day.endTime &&
                                day.endTime < day.startTime && (
                                    <p className="muted small">
                                        Ends the following day.
                                    </p>
                                )}
                        </div>
                    </section>
                ))}

                <button
                    type="button"
                    className="btn-outline"
                    style={{ justifyContent: 'center', width: '100%' }}
                    onClick={addDay}
                >
                    + Add another day
                </button>

                <fieldset className="audience-field">
                    <legend>Who can see this?</legend>

                    <div className="segmented">
                        <button
                            type="button"
                            className={form.audience === 'all' ? 'on' : ''}
                            aria-pressed={form.audience === 'all'}
                            onClick={() => updateField('audience', 'all')}
                        >
                            All students
                        </button>

                        <button
                            type="button"
                            className={form.audience === 'club' ? 'on' : ''}
                            aria-pressed={form.audience === 'club'}
                            onClick={() => updateField('audience', 'club')}
                        >
                            Club members only
                        </button>
                    </div>

                    <p className="muted small audience-help">
                        {form.audience === 'all'
                            ? 'Shows up for students browsing events.'
                            : 'Only members of Husker Coding Club can see this event.'}
                    </p>
                </fieldset>

                <label className="card check-row">
                    <input
                        type="checkbox"
                        checked={form.freeFood}
                        onChange={(e) =>
                            updateField('freeFood', e.target.checked)
                        }
                    />
                    <span>Free food provided</span>
                </label>

                {error && (
                    <p className="error" role="alert">
                        {error}
                    </p>
                )}
            </form>
        </Screen>
    )
}