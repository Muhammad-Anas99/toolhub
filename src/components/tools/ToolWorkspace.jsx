import React from 'react'
import PropTypes from 'prop-types'
import { AnimatePresence } from 'framer-motion'
import DropZone from './DropZone.jsx'
import FileInfoCard from './FileInfoCard.jsx'
import ErrorMessage from './ErrorMessage.jsx'

/**
 * Shared shell around every tool's working area: the dismissible error
 * banner, the drop zone shown before a file is selected, and the file-info
 * card shown after. Tool-specific controls/preview/download UI render as
 * `children`, which only appears once a file has been uploaded.
 */
export default function ToolWorkspace({ upload, acceptedTypes, maxSizeMB, onRemove, children }) {
  return (
    <div className="space-y-6">
      <AnimatePresence>
        {upload.error && (
          <ErrorMessage message={upload.error} onDismiss={() => upload.setError(null)} />
        )}
      </AnimatePresence>

      {!upload.file ? (
        <DropZone
          dropZoneProps={upload.dropZoneProps}
          inputProps={upload.inputProps}
          acceptedTypes={acceptedTypes}
          maxSizeMB={maxSizeMB}
          isDragActive={upload.isDragActive}
        />
      ) : (
        <div className="space-y-5">
          <FileInfoCard file={upload.file} dimensions={upload.dimensions} onRemove={onRemove} />
          {children}
        </div>
      )}
    </div>
  )
}

ToolWorkspace.propTypes = {
  upload: PropTypes.shape({
    file: PropTypes.object,
    error: PropTypes.string,
    setError: PropTypes.func.isRequired,
    dimensions: PropTypes.object,
    isDragActive: PropTypes.bool,
    dropZoneProps: PropTypes.object.isRequired,
    inputProps: PropTypes.object.isRequired,
  }).isRequired,
  acceptedTypes: PropTypes.arrayOf(PropTypes.string).isRequired,
  maxSizeMB: PropTypes.number.isRequired,
  onRemove: PropTypes.func.isRequired,
  children: PropTypes.node,
}
